import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaTasks, FaUsers, FaBell } from 'react-icons/fa';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5 text-center"> 
        {/* Hero Section */}
        <div className="jumbotron p-5 rounded hero-section">
          <h1 className="display-4 fw-bold">Welcome to <span className="text-lightblue">CollabHub</span></h1>
          <p className="lead">
            Collaborate seamlessly, manage projects, and boost productivity.
          </p>
          <Link to="/dashboard" className="btn btn-primary btn-lg shadow">
            Get Started 🚀
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-5">
          <h2 className="fw-bold text-dark">Why Choose <span className="text-lightblue">CollabHub?</span></h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card feature-card shadow">
                <div className="card-body text-center">
                  <FaTasks size={40} className="text-primary mb-3" />
                  <h5 className="card-title fw-bold">Task Management</h5>
                  <p className="card-text">Create, assign, and track tasks effortlessly.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card feature-card shadow">
                <div className="card-body text-center">
                  <FaUsers size={40} className="text-success mb-3" />
                  <h5 className="card-title fw-bold">Team Collaboration</h5>
                  <p className="card-text">Work together in real-time with shared projects.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card feature-card shadow">
                <div className="card-body text-center">
                  <FaBell size={40} className="text-warning mb-3" />
                  <h5 className="card-title fw-bold">Real-time Updates</h5>
                  <p className="card-text">Get instant notifications and stay ahead.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Styling */}
        <style>
          {`
          /* Ensure page content does not overlap with navbar */
          .container {
            margin-top: 90px; /* Adjusted margin for navbar height */
          }

          /* Hero Section */
          .hero-section {
            background: linear-gradient(to right, #007bff, #0056b3);
            color: white;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            padding: 60px 20px;
            border-radius: 10px;
          }

          .text-lightblue {
            color: #99ccff; /* A lighter shade of blue */
            font-weight: bold;
          }

          /* Feature Cards */
          .feature-card {
            border-radius: 10px;
            transition: transform 0.3s, box-shadow 0.3s;
          }

          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
          }
          `}
        </style>
      </div>
    </>
  );
};

export default Home;
