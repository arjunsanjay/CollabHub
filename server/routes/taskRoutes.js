const express = require('express');
const { createTask, getTasksByProject, markTaskCompleted } = require('../controllers/taskController');

const router = express.Router();

router.post('/:projectId', createTask); // Include projectId when creating a task
router.get('/:projectId', getTasksByProject);
router.put('/:id/complete', markTaskCompleted);

module.exports = router;
