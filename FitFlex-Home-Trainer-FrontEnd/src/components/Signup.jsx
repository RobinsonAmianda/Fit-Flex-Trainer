import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      // Check if username is 'admin' or 'Admin'
    if (username.toLowerCase() === 'admin') {
      alert('Invalid username. Please choose a different username.');
      return;
    }
      const response = await axios.post('http://127.0.0.1:5500/register', {
        username,
        email,
        password,
      });

      alert('User registered successfully:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className='container'>
      <div className="header-container d-flex justify-content-between align-items-center mt-4 bg-dark mt-3 mb-1 p-1">
      <h1 className="text-warning mt-4 text-center">FITFLEX HOME TRAINER 💪🏋️🏋️‍♀️ 🤼‍♂️</h1>
          <div className="header-buttons">
            <Link to="/login" className="btn btn-primary me-5">Login</Link>
            <Link to="/signup" className="btn btn-secondary me-5">Sign Up</Link>
          </div>
        </div>
    <div className="Container text-center bg-yellow">
      <h3 className="text-warning fw-bold fs-20">Sign Up Form</h3>
      <form className="form bg-light p-4 rounded mb-5" method="post">
        <div className="mb-3">
          <label htmlFor="name" className="form-label text-primary fw-bold fs-4">
            Username
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label text-primary fw-bold fs-4">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label text-primary fw-bold fs-4">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirm_password" className="form-label text-primary fw-bold fs-4">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            className="form-control"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="button" onClick={handleSignup} className="btn btn-primary">
          Sign Up
        </button>
        <label className="lbl1">
          Already have an account? <a href="#">Login</a>
        </label>
      </form>
    </div>
    </div>
  );
};

export default Signup;
