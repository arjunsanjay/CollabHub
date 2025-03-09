const mongoose = require("mongoose");

const individualTaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
  dueDate: { type: Date },
  assignedTo: { type: String },
  completed: { type: Boolean, default: false },
  comments: [{ type: String }],
  subtasks: [{ title: String, completed: Boolean }],
  files: [{ type: String }], // Store file paths
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associate with user
});

module.exports = mongoose.model("IndividualTask", individualTaskSchema);
