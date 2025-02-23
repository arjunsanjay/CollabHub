import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Project = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', team: 'John, Alice', deadline: '2025-03-01', completed: false },
    { id: 2, name: 'Mobile App Development', team: 'Bob, Sarah', deadline: '2025-03-10', completed: false }
  ]);

  const [newProject, setNewProject] = useState({ name: '', team: '', deadline: '' });
  const [showModal, setShowModal] = useState(false);

  const addProject = () => {
    if (!newProject.name.trim() || !newProject.team.trim() || !newProject.deadline) return;
    setProjects([...projects, { ...newProject, id: projects.length + 1, completed: false }]);
    setNewProject({ name: '', team: '', deadline: '' });
    setShowModal(false);
  };

  const markCompleted = (id) => {
    setProjects(projects.map(proj => proj.id === id ? { ...proj, completed: true } : proj));
  };

  return (
    <Container className="mt-4">
      <h2>Projects</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>➕ Add New Project</Button>

      {/* Project List */}
      <Row className="mt-4">
        {projects.map((project) => (
          <Col md={4} key={project.id} className="mb-3">
            <Card className={`p-3 shadow ${project.completed ? 'border-success' : ''}`}>
              <h5>{project.name}</h5>
              <p><strong>Team:</strong> {project.team}</p>
              <p><strong>Deadline:</strong> {project.deadline}</p>
              <p><strong>Status:</strong> {project.completed ? '✅ Completed' : '🚧 In Progress'}</p>
              
              <div className="d-flex justify-content-between">
                {!project.completed && (
                  <Button variant="success" size="sm" onClick={() => markCompleted(project.id)}>Mark as Completed ✅</Button>
                )}
                <Link to={`/projects/${project.id}/tasks`}>
                  <Button variant="info" size="sm">Manage Tasks 📋</Button>
                </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Project Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="text" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Team Members</Form.Label>
              <Form.Control type="text" value={newProject.team} onChange={(e) => setNewProject({ ...newProject, team: e.target.value })} placeholder="Comma-separated names" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control type="date" value={newProject.deadline} onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={addProject}>Add Project</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Project;
