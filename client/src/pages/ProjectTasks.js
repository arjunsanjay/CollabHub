import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Form, ListGroup } from 'react-bootstrap';

const ProjectTasks = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Design Mockups', completed: false },
    { id: 2, name: 'Backend Setup', completed: false }
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: tasks.length + 1, name: newTask, completed: false }]);
    setNewTask('');
  };

  const markTaskComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <Container className="mt-4">
      <h2>Project {projectId} - Tasks</h2>

      {/* Task Input */}
      <Form className="mb-3">
        <Form.Group>
          <Form.Control type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter new task..." />
        </Form.Group>
        <Button variant="primary" className="mt-2" onClick={addTask}>➕ Add Task</Button>
      </Form>

      {/* Task List */}
      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
            <span className={task.completed ? 'text-decoration-line-through' : ''}>{task.name}</span>
            <Button variant={task.completed ? 'secondary' : 'success'} size="sm" onClick={() => markTaskComplete(task.id)}>
              {task.completed ? 'Undo' : '✅ Complete'}
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ProjectTasks;
