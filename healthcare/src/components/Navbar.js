import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Profile from './Profile';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/" className={`nav-link ${isCurrentPage('/') ? 'active' : ''}`}>
            HOME
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/patients" className={`nav-link ${isCurrentPage('/patients') ? 'active' : ''}`}>
            PATIENTS
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/schedule" className={`nav-link ${isCurrentPage('/schedule') ? 'active' : ''}`}>
            SCHEDULE
          </Link>
        </li>
      </ul>
      <Profile />
    </nav>
  );
};

export default Navbar;