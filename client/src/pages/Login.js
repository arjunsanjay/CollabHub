import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle, FaGithub } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // For redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Login Response:", data); // Log the full response
      if (response.ok) {
        alert(data.message);
        console.log("Token received:", data.token); 
        localStorage.setItem("token", data.token);
        console.log("Token stored:", localStorage.getItem("token"));
 // Store token for authentication
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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4" style={{ width: '350px', borderRadius: '10px' }}>
          <h3 className="text-center mb-4">Welcome Back 👋</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <div className="input-group">
                <span className="input-group-text"><FaEnvelope /></span>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="Enter your email" 
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <div className="input-group">
                <span className="input-group-text"><FaLock /></span>
                <input 
                  type="password" 
                  className="form-control" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder="Enter your password" 
                />
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div className="form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  checked={rememberMe} 
                  onChange={() => setRememberMe(!rememberMe)} 
                />
                <label className="form-check-label">Remember Me</label>
              </div>
              <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>

          <div className="text-center mt-3">
            <p>Or continue with</p>
            <div className="d-flex justify-content-center">
              <button className="btn btn-light mx-2"><FaGoogle /> Google</button>
              <button className="btn btn-dark mx-2"><FaGithub /> GitHub</button>
            </div>
          </div>

          <p className="text-center mt-3">Don't have an account? <Link to="/register">Sign Up</Link></p>
        </div>
      </div>
    </>
  );
};

export default Login;
