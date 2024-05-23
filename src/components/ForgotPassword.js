import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert('Password reset link sent to your email');
      navigate('/login');
    } else {
      alert('Please enter your email');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;