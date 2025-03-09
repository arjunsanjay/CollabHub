const IndividualTask = require("../models/IndividualTask");

// Create a new task (Only logged-in users can create)
exports.createTask = async (req, res) => {
  try {
    const { title, priority, dueDate, assignedTo, completed, comments, subtasks, files } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: "Task title is required" });
    }

    const task = new IndividualTask({
        title,
        priority,
        dueDate,
        assignedTo,
        completed,
        comments,
        subtasks,
        files,
        category: req.body.category || "todo", // Default to 'todo'
        userId: req.user.id,
      });

    await task.save();
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating task", error });
  }
};

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
    try {
      const tasks = await IndividualTask.find({ userId: req.user.id });
  
      // Group tasks by category
      const categorizedTasks = {
        todo: [],
        inProgress: [],
        done: []
      };
  
      tasks.forEach(task => {
        const category = task.category || "todo"; // Default category if missing
        if (!categorizedTasks[category]) {
          categorizedTasks[category] = [];
        }
        categorizedTasks[category].push(task);
      });
  
      res.status(200).json({ success: true, tasks: categorizedTasks });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching tasks", error });
    }
  };
  

// Update a task (User can only update their own task)
exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { category } = req.body;
  
      const task = await IndividualTask.findOne({ _id: id, userId: req.user.id });
  
      if (!task) {
        return res.status(404).json({ success: false, message: "Task not found or not authorized" });
      }
  
      task.category = category;
      await task.save(); // Make sure the update is actually saved!
  
      res.status(200).json({ success: true, task });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating task", error });
    }
  };
  
  

// Delete a task (User can only delete their own task)
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await IndividualTask.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found or not authorized" });
    }

    await IndividualTask.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting task", error });
  }
};
