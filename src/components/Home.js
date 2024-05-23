import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../assets/Dashboard.gif'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <img src={logo} alt="Logo" className="home-logo" />
        <h1 className="home-text">Open Library</h1>
        <div className="home-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signup" className="btn">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
