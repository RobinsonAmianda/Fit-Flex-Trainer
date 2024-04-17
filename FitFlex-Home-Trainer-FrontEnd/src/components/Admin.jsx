// src/components/AdminLogin.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5500/login', {
        email,
        password,
      });


      // Assuming you have a way to verify admin status in your backend
      if (email === 'admin@gmail.com') {
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);
        navigate('/admin/home');
      } else {
        alert('Invalid credentials for admin.');
      }
    } catch (error) {
      alert('Error logging in:', error);
    }
  };

  return (
    <div className='container'>
     <div className="header-container d-flex justify-content-between align-items-center mt-4">
      <h1 className="text-warning mt-4 text-center">FITFLEX HOME TRAINER 💪🏋️🏋️‍♀️ 🤼‍♂️</h1>
          <div className="header-buttons">
            <Link to="/login" className="btn btn-primary me-5">Login</Link>
            <Link to="/signup" className="btn btn-secondary me-5">Sign Up</Link>
            <Link to="/admin" className="btn btn-danger">Admin</Link>
          </div>
        </div>
        <div className="login-container">
      <form className="bg-light p-4 rounded w-50"> {/* Set form width to 50% */}
        <h1 className="text-danger fw-bold fs-20">Admin Only!</h1> {/* Make Login header yellow */}
  
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-blue">Email Address</label> {/* Make labels blue */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
  
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-blue">Password</label> {/* Make labels blue */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter your password"
          />
        </div>
  
        <button type="button" className="btn btn-danger" onClick={handleAdminLogin}>
        Admin Login
      </button>      </form>
    </div>
    </div>
  );
};

export default Admin;
