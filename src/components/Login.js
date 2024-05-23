import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/Login.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem('token', 'dummy-token');
      navigate('/dashboard');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    
    <div className="login-container" >
      <img src={logo} alt="Logo" className="logo" />
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">Login</button>
        <Link to="/forgot-password" className="link">Forgot Password?</Link>
      </form>
    </div>
  );
};

export default Login;