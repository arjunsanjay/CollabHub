const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true },
    completed: { type: Boolean, default: false }
  });
  
  module.exports = mongoose.model('Task', TaskSchema);