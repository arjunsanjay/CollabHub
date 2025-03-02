const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const projectController = require('../controllers/projectController');

// Since these routes are mounted as "/api/projects" in server.js, remove "/projects" from route definitions
router.post('/', authMiddleware, projectController.createProject);
router.get('/', authMiddleware, projectController.getAllProjects);
router.get('/:id', authMiddleware, projectController.getProjectById);
router.put('/:id/complete', authMiddleware, projectController.markProjectCompleted);

module.exports = router;
