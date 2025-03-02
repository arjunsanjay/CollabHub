import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // For redirection

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate('/dashboard'); // Redirect to Dashboard
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow-lg p-4 rounded" style={{ width: "400px" }}>
          <h2 className="text-center mb-3">Create Account</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <input 
                  type="text" 
                  className="form-control" 
                  name="name"
                  placeholder="Enter your full name" 
                  value={user.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <div className="input-group">
                <span className="input-group-text"><FaEnvelope /></span>
                <input 
                  type="email" 
                  className="form-control" 
                  name="email"
                  placeholder="Enter your email" 
                  value={user.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text"><FaLock /></span>
                <input 
                  type="password" 
                  className="form-control" 
                  name="password"
                  placeholder="Create a password" 
                  value={user.password} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text"><FaLock /></span>
                <input 
                  type="password" 
                  className="form-control" 
                  name="confirmPassword"
                  placeholder="Confirm your password" 
                  value={user.confirmPassword} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>

          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
