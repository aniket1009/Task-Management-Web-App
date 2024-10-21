import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TaskList.css'; // Import custom CSS

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        
        // Check if the API response is structured correctly
        if (response.data.success) {
          setTasks(response.data.data); // Assuming the correct structure
        } else {
          setErrorMessage('Failed to fetch tasks.');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setErrorMessage('Error fetching tasks'); // Update error message on failure
      } finally {
        setIsLoading(false); // Update loading status
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="card task-list-card">
      <div className="card-header task-list-card-header">
        <h1>Task List</h1>
        <Link to="/new-task" className="btn btn-success">Add New Task</Link>
      </div>
      <div className="card-body">
        {isLoading ? ( // Display loading message while data is being fetched
          <p>Loading tasks...</p>
        ) : errorMessage ? ( // Display error message if an error occurs
          <div className="alert alert-danger">{errorMessage}</div>
        ) : tasks.length === 0 ? ( // Handle empty task list
          <div className="empty-state">
            <img src="https://via.placeholder.com/150" alt="Empty illustration" className="empty-icon" />
            <h2>No tasks yet!</h2>
            <p>Get started by adding your first task.</p>
            <Link to="/new-task" className="btn btn-primary">Create Task</Link>
          </div>
        ) : (
          <ul className="list-group">
            {tasks.map(task => (
              <li key={task.id} className="list-group-item task-list-item">
                <Link to={`/task/${task.id}`} className="task-title">{task.title}</Link>
                <Link to={`/edit-task/${task.id}`} className="btn btn-sm edit-btn">Edit</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
