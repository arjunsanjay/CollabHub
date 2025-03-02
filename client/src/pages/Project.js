import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Project = () => {
  const [projects, setProjects] = useState([]); // Ensure projects is an array
  const [newProject, setNewProject] = useState({ name: '', team: '', deadline: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      console.log("Token:", token);
    
      if (!token) {
        console.error('No token found! User might not be authenticated.');
        return;
      }
    
      try {
        const response = await fetch('http://localhost:5000/api/projects', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log("Fetched Data:", data); // Debugging line
    
        // ✅ Ensure the correct array is set
        setProjects(Array.isArray(data.projects) ? data.projects : []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]); // Set an empty array if fetching fails
      }
    };
    

    fetchProjects();
  }, []);

  const addProject = async () => {
    if (!newProject.name.trim() || !newProject.team.trim() || !newProject.deadline) return;
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found! User might not be authenticated.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add project');
      }
  
      const savedProject = await response.json();
      console.log("Saved Project:", savedProject); // Debugging line
  
      // ✅ Ensure the backend returns an object with the same structure
      setProjects(prevProjects => [...prevProjects, savedProject.project]); 
      setNewProject({ name: '', team: '', deadline: '' });
      setShowModal(false);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };
  

  const markCompleted = async (_id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found! User might not be authenticated.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${_id}/complete`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to mark project as completed');
      }
  
      setProjects(prevProjects => 
        prevProjects.map(proj => proj._id === _id ? { ...proj, completed: true } : proj)
      );
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };
  

  return (
    <Container className="mt-4">
      <h2>Projects</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>➕ Add New Project</Button>
      <Row className="mt-4">
        {/* Ensure projects is an array before calling .map() */}
        {Array.isArray(projects) && projects.map((project) => (
           <Col md={4} key={project._id || project._id} className="mb-3">
            <Card className={`p-3 shadow ${project.completed ? 'border-success' : ''}`}>
              <h5>{project.name}</h5>
              <p><strong>Team:</strong> {project.team}</p>
              <p><strong>Deadline:</strong> {project.deadline}</p>
              <p><strong>Status:</strong> {project.completed ? '✅ Completed' : '🚧 In Progress'}</p>
              <div className="d-flex justify-content-between">
                {!project.completed && (
                  <Button variant="success" size="sm" onClick={() => markCompleted(project._id)}>Mark as Completed ✅</Button>
                )}
                <Link to={`/projects/${project._id}/tasks`}>
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
