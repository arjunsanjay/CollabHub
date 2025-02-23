import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; // Import Register Page
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks'; 
import Project from './pages/Project';
import ProjectTasks from './pages/ProjectTasks'; // Import ProjectTasks page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Added Register Route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} /> 
        <Route path="/projects" element={<Project />} />
        <Route path="/projects/:projectId/tasks" element={<ProjectTasks />} /> {/* Dynamic Route for Project Tasks */}
      </Routes>
    </Router>
  );
};

export default App;
