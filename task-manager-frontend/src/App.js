import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import TaskForm from './components/TaskForm';
import Layout from './components/Layout';  // Import Layout

function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<TaskList />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/new-task" element={<TaskForm />} />
        <Route path="/edit-task/:id" element={<TaskForm />} />
      </Routes>
    </Layout>
  );
}

export default App;
