const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { name, team, deadline } = req.body;
    const userId = req.user.id; // Get logged-in user ID from request
    const teamMembers = team.split(',').map(member => member.trim());

    const project = new Project({ name, team: teamMembers, deadline, user: userId });
    await project.save();

    res.status(201).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating project', error });
  }
};

// Fetch projects for logged-in user only
exports.getAllProjects = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from request
    const projects = await Project.find({ user: userId }); // Fetch projects only for the logged-in user

    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching projects', error });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const userId = req.user.id;
    const project = await Project.findOne({ _id: req.params.id, user: userId });

    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching project', error });
  }
};

exports.markProjectCompleted = async (req, res) => {
  try {
    const userId = req.user.id;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: userId }, // Ensure project belongs to the user
      { completed: true },
      { new: true }
    );

    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating project', error });
  }
};
