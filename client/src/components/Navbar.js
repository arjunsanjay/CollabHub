import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/img.png';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <img src={logo} alt="CollabHub Logo" width="35" height="35" className="me-2" />
          CollabHub
        </Link>

        {/* Toggler Button for Mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/tasks' ? 'active' : ''}`} to="/tasks">Tasks</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link btn btn-outline-light px-3 mx-2 ${location.pathname === '/login' ? 'active-btn' : ''}`} to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link btn btn-primary px-3 ${location.pathname === '/register' ? 'active-btn' : ''}`} to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        /* Custom Navbar */
        .custom-navbar {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          padding: 8px 20px; /* Reduced padding to make it smaller */
        }

        /* Navbar Brand (Logo & Title) */
        .navbar-brand img {
          height: 32px; /* Slightly smaller logo */
          width: 32px;
        }

        /* Navbar Links */
        .nav-link {
          font-size: 0.95rem;
          font-weight: 500;
          padding: 8px 12px; /* Reduced padding for less height */
          transition: color 0.3s ease-in-out;
        }

        .nav-link:hover {
          color: #f8f9fa !important;
        }

        /* Active Link */
        .nav-link.active {
          color: #0d6efd !important;
          font-weight: bold;
          border-bottom: 2px solid #0d6efd;
        }

        /* Buttons */
        .btn-outline-light {
          border-radius: 20px;
          padding: 6px 15px; /* Adjusted button size */
          font-size: 0.9rem;
          transition: all 0.3s ease-in-out;
        }

        .btn-outline-light:hover {
          background: #f8f9fa;
          color: black !important;
        }

        .btn-primary {
          border-radius: 20px;
          padding: 6px 15px; /* Adjusted button size */
          font-size: 0.9rem;
          transition: all 0.3s ease-in-out;
        }

        .btn-primary:hover {
          background: #0056b3;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
