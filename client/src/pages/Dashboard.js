import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import Navbar from '../components/Navbar'; // Import your existing Navbar
import { FaProjectDiagram, FaTasks, FaChartBar, FaCogs } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <>
      {/* Use the existing Navbar from Homepage */}
      <Navbar />

      <Container fluid className="mt-5 pt-4">
        <Row>
          {/* Sidebar */}
          <Col md={3} className="bg-dark text-white p-4 rounded">
            <h4 className="text-center mb-4">Dashboard</h4>
            <ListGroup variant="flush">
              <ListGroup.Item action href="/projects" className="sidebar-item">
                <FaProjectDiagram className="me-2" /> Projects
              </ListGroup.Item>
              <ListGroup.Item action href="/tasks" className="sidebar-item">
                <FaTasks className="me-2" /> Tasks
              </ListGroup.Item>
              <ListGroup.Item action href="/analytics" className="sidebar-item">
                <FaChartBar className="me-2" /> Analytics
              </ListGroup.Item>
              <ListGroup.Item action href="/settings" className="sidebar-item">
                <FaCogs className="me-2" /> Settings
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Main Dashboard Content */}
          <Col md={9}>
            <h2 className="text-primary fw-bold mt-3">Welcome Back!</h2>
            <p className="text-muted">Here's an overview of your projects and tasks.</p>

            {/* Quick Stats Section */}
            <Row className="mb-4">
              <Col md={4}>
                <Card className="stat-card text-center p-3">
                  <h5 className="fw-bold">8</h5>
                  <p>Active Projects</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="stat-card text-center p-3">
                  <h5 className="fw-bold">24</h5>
                  <p>Pending Tasks</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="stat-card text-center p-3">
                  <h5 className="fw-bold">92%</h5>
                  <p>Team Productivity</p>
                </Card>
              </Col>
            </Row>

            {/* Project, Task, Analytics Section */}
            <Row className="mt-3">
              <Col md={4}>
                <Card className="feature-card text-center p-4">
                  <FaProjectDiagram size={40} className="text-primary mb-2" />
                  <h5>Projects</h5>
                  <p>Manage your ongoing projects.</p>
                  <a href="/projects" className="btn btn-outline-primary btn-sm">
                    View Projects
                  </a>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="feature-card text-center p-4">
                  <FaTasks size={40} className="text-success mb-2" />
                  <h5>Tasks</h5>
                  <p>Keep track of your tasks and deadlines.</p>
                  <a href="/tasks" className="btn btn-outline-success btn-sm">
                    View Tasks
                  </a>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="feature-card text-center p-4">
                  <FaChartBar size={40} className="text-info mb-2" />
                  <h5>Analytics</h5>
                  <p>View team productivity insights.</p>
                  <a href="/analytics" className="btn btn-outline-info btn-sm">
                    View Analytics
                  </a>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Custom Styling */}
        <style>{`
          .sidebar-item {
            padding: 10px 15px;
            transition: all 0.3s ease-in-out;
            border-radius: 5px;
          }
          .sidebar-item:hover {
            background-color: #575757;
            color: white;
          }
          .stat-card {
            background: #f8f9fa;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          }
          .feature-card {
            border-radius: 10px;
            transition: transform 0.3s;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
          }
        `}</style>
      </Container>
    </>
  );
};

export default Dashboard;
