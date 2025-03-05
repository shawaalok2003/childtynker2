import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle the dropdown menu
  const toggleDropdownMenu = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Function to close dropdown when clicking outside
  const closeDropdownMenu = () => {
    setDropdownOpen(false);
  };

  // Close mobile menu and dropdown when user clicks outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector('.navbar__dropdown');
      const mobileMenu = document.querySelector('.navbar__links');
      if (dropdown && !dropdown.contains(event.target)) {
        setDropdownOpen(false); // Close dropdown
      }
      if (mobileMenu && !mobileMenu.contains(event.target)) {
        setMobileMenuOpen(false); // Close mobile menu
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__top-banner" style={{ backgroundColor: 'green', color: 'white', textAlign: 'center', padding: '5px', fontSize: '14px' }}>
        <span>1:1 live Robotics classes by IIT/NIT Trainers </span>
        <NavLink to="/register">
          <button className="top-banner__button" style={{ background: 'white', color: 'black', border: 'none', padding: '5px 10px', marginLeft: '10px', cursor: 'pointer', borderRadius: '5px' }}>Book Now</button>
        </NavLink>
      </div>
      <div className="navbar__main">
        <div className="navbar__logo">
          <NavLink to="/">
            <img src="/images/Name (2).png"alt="ChildTYNKER Logo" className="logo" />
          </NavLink>
        </div>
        <button className="navbar__toggle" onClick={toggleMobileMenu}>☰</button>
        <ul className={`navbar__links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><NavLink to="/" onClick={closeMobileMenu}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={closeMobileMenu}>About us</NavLink></li>
          <li className="navbar__item navbar__dropdown" onMouseEnter={toggleDropdownMenu} onMouseLeave={toggleDropdownMenu}>
            <span className="dropdown-toggle">Courses</span>
            <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              <li><NavLink to="/wise-child" onClick={closeMobileMenu}>Wise Child Package</NavLink></li>
              <li><NavLink to="/alpha-series" onClick={closeMobileMenu}>Alpha Series Package</NavLink></li>
              <li><NavLink to="/drone-package" onClick={closeMobileMenu}>Drone Package</NavLink></li>
              <li><NavLink to="/defender-wisekit" onClick={closeMobileMenu}>Defender WiseKit</NavLink></li>
              <li><NavLink to="/pioneer-package" onClick={closeMobileMenu}>Pioneer Package</NavLink></li>
              <li><NavLink to="/iot-master-package" onClick={closeMobileMenu}>IoT Master Package</NavLink></li>
              <li><NavLink to="/aiml-master-package" onClick={closeMobileMenu}>AI/ML Master Package</NavLink></li>
            </ul>
          </li>
        </ul>
        <div className="navbar__actions">
        <NavLink to="/contact">
        <img src="/images/Logo ChildTynker  (6).png" alt="Contact" className="Contact" />
      </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;