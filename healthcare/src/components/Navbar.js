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
          <Link to="/patients" className={`nav-link ${isCurrentPage('/patients') ? 'active' : ''}`}>
            HOME
          </Link>
        </li>
        <li className="nav-item" style={{marginLeft: '35px', width: '200px'}}>
          <Link to="/schedule" className={`nav-link ${isCurrentPage('/schedule') ? 'active' : ''}`}>
            NEW PATIENT
          </Link>
        </li>
      </ul>
      <Profile />
    </nav>
  );
};

export default Navbar;
