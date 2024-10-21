import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './TaskForm.css';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false); // New state for completed status
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`http://localhost:5000/tasks/${id}`)
        .then(response => {
          const task = response.data.data;

          if (task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
            setCompleted(task.completed || false); // Populate the completed field
          }
          setLoading(false);
        })
        .catch(error => {
          setErrorMessage('Error fetching task');
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length < 3) {
      setErrorMessage('Title must be at least 3 characters long.');
      return;
    }
    
    if (description.length < 5) {
      setErrorMessage('Description must be at least 5 characters long.');
      return;
    }

    const taskData = {
      title,
      description,
      completed,  // Include the completed status in the task data
    };

    try {
      if (id) {
        // Update task
        await axios.put(`http://localhost:5000/tasks/${id}`, taskData);
        setSuccessMessage('Task updated successfully!');
      } else {
        // Create new task
        await axios.post('http://localhost:5000/tasks', taskData);
        setSuccessMessage('Task created successfully!');
      }
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Task not found');
      } else {
        setErrorMessage('Error updating task');
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h1>{id ? 'Edit Task' : 'New Task'}</h1>
      </div>
      <div className="card-body">
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {loading ? (
          <p>Loading task details...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                id="completed"
                className="form-check-input"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)} // Toggle completed state
              />
              <label htmlFor="completed" className="form-check-label">Completed</label>
            </div>
            <button type="submit" className="btn btn-success" disabled={!title || !description}>
              {id ? 'Update Task' : 'Add Task'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TaskForm;
