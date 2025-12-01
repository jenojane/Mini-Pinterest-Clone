import React from "react";
import { FaHome, FaSearch, FaPlus, FaEnvelope, FaUser } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">🎀 My Pinterest Clone</h1>
      </div>

      <div className="navbar-center">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search for ideas" />
        </div>
      </div>

      <div className="navbar-right">
        <FaHome className="nav-icon" />
        <FaPlus className="nav-icon" />
        <FaEnvelope className="nav-icon" />
        <FaUser className="nav-icon" />
      </div>
    </nav>
  );
}

export default Navbar;
  