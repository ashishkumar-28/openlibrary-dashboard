import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/Sign-Up.png';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password && email) {
      alert('Signup successful');
      navigate('/login');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="signup-container">
      <img src={logo} alt="Logo" className="logo" />
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;