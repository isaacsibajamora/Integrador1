// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/injacom-logo-sinfondo.png';

const Navbar = ({ rol, abrirModal }) => {
  return (
    <nav className="navbar navbar-fixed" style={{ cursor: "default" }}>
      <div className="nav-container d-flex justify-content-between align-items-center w-100 px-3">
        <img src={logo} alt="Injacom Logo" className="nav-logo img-fluid" />
        <div className="d-flex align-items-center gap-3">
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
