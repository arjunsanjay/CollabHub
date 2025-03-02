import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Form, ListGroup } from 'react-bootstrap';

const ProjectTasks = () => {
  const { projectId } = useParams(); // Get project ID from URL
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    console.log("Extracted projectId from URL:", projectId);
    if (!projectId) {
      console.error("Error: Project ID is undefined. Check the route.");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found! User might not be authenticated.");
      return;
    }

    // Fetch project details
    fetch(`http://localhost:5000/api/projects/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.project?.name) {
          setProjectName(data.project.name);
        } else {
          console.error("Invalid project data:", data);
        }
      })
      .catch((err) => console.error('Error fetching project details:', err));

    // Fetch project tasks
    fetch(`http://localhost:5000/api/tasks/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          console.error("API response is not an array:", data);
          setTasks([]);
        }
      })
      .catch((err) => console.error('Error fetching tasks:', err));

  }, [projectId]);

  const addTask = () => {
    if (!newTask.trim() || !projectId) return;

    fetch(`http://localhost:5000/api/tasks/${projectId}`, {  // Fixed URL to match backend
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTask, completed: false }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setTasks((prevTasks) => [...prevTasks, data.task]);
          setNewTask('');
        } else {
          console.error('Error adding task:', data);
        }
      })
      .catch((err) => console.error('Error adding task:', err));
  };

  const markTaskComplete = (_id) => {
    fetch(`http://localhost:5000/api/tasks/${_id}/complete`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === _id ? { ...task, completed: true } : task
            )
          );
        } else {
          console.error("Failed to mark task as complete:", data);
        }
      })
      .catch((err) => console.error('Error updating task:', err));
  };

  return (
    <Container className="mt-4">
      <h2>{projectName ? `${projectName} - Tasks` : `Project ${projectId} - Tasks`}</h2>

      <Form className="mb-3">
        <Form.Group>
          <Form.Control
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task..."
          />
        </Form.Group>
        <Button variant="primary" className="mt-2" onClick={addTask}>➕ Add Task</Button>
      </Form>

      <ListGroup>
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <ListGroup.Item
              key={task._id}
              className="d-flex justify-content-between align-items-center"
            >
              <span className={task.completed ? 'text-decoration-line-through' : ''}>
                {task.name}
              </span>
              {!task.completed && (
                <Button variant="success" size="sm" onClick={() => markTaskComplete(task._id)}>
                  ✅ Complete
                </Button>
              )}
            </ListGroup.Item>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ListGroup>
    </Container>
  );
};

export default ProjectTasks;
