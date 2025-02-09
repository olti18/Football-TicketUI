// jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          🎟️ Football Tickets
        </Link>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/tickets" className="navbar-item">Tickets</Link>
        <Link to="/my-tickets" className="navbar-item">My Tickets</Link>
        <Link to="/profile" className="navbar-item">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;