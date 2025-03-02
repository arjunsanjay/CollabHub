import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../images/img.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token'); // Check authentication

  const handleDashboardClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login'); // Redirect to login if not authenticated
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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
              <button className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={handleDashboardClick}>
                Dashboard
              </button>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/tasks' ? 'active' : ''}`} to="/tasks">Tasks</Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className={`nav-link btn btn-outline-light px-3 mx-2 ${location.pathname === '/login' ? 'active-btn' : ''}`} to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link btn btn-primary px-3 ${location.pathname === '/register' ? 'active-btn' : ''}`} to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link btn btn-danger px-3" onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
