import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${id}`);
        if (response.data.success) {
          setTask(response.data.data);  // Ensure response structure matches your API
        } else {
          setErrorMessage('Failed to load task.');
        }
      } catch (error) {
        console.error('Error fetching task:', error);
        setErrorMessage('Error fetching task');
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting task:', error);
      setErrorMessage('Error deleting task');
    }
  };

  return task ? (
    <div className="card">
      <div className="card-header">
        <h1>{task.title}</h1>
      </div>
      <div className="card-body">
        <p>{task.description}</p>
        <button onClick={() => navigate(`/edit-task/${id}`)} className="btn btn-primary">Edit</button>
        <button onClick={handleDelete} className="btn btn-danger ms-2">Delete</button>
      </div>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default TaskDetails;
