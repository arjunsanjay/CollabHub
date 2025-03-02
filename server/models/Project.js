const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: [String], required: true },
  deadline: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Associate project with a user
});

module.exports = mongoose.model('Project', ProjectSchema);
