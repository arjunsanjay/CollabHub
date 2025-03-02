const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Invalid token' });
  }
};

// Create a task
exports.createTask = async (req, res) => {
    try {
      const { name } = req.body;
      const { projectId } = req.params; // Extract projectId from URL params
  
      if (!projectId || !name) {
        return res.status(400).json({ success: false, message: 'Project ID and task name are required' });
      }
  
      const task = new Task({ projectId, name, completed: false });
      await task.save();
  
      res.status(201).json({ success: true, task });
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ success: false, message: 'Error creating task', error });
    }
  };
  

// Get tasks by project
exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });

    if (!tasks) {
      return res.status(404).json({ success: false, message: 'No tasks found for this project' });
    }

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching tasks', error });
  }
};

// Mark task as completed
exports.markTaskCompleted = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });

    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating task', error });
  }
};
