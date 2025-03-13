import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle dropdown menu
  const toggleDropdownMenu = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector('.navbar__dropdown');
      const mobileMenu = document.querySelector('.navbar__links');
      if (dropdown && !dropdown.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenu && !mobileMenu.contains(event.target)) {
        setMobileMenuOpen(false);
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
            <img src="/images/Name (2).png" alt="ChildTYNKER Logo" className="logo" />
          </NavLink>
        </div>
        <button className="navbar__toggle" onClick={toggleMobileMenu}>☰</button>
        <ul className={`navbar__links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><NavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>About us</NavLink></li>
          <li className="navbar__item navbar__dropdown" onMouseEnter={toggleDropdownMenu} onMouseLeave={toggleDropdownMenu}>
            <span className="dropdown-toggle">Courses</span>
            <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              <li><NavLink to="/wise-child" onClick={() => setMobileMenuOpen(false)}>Wise Child Package</NavLink></li>
              <li><NavLink to="/alpha-series" onClick={() => setMobileMenuOpen(false)}>Alpha Series Package</NavLink></li>
              <li><NavLink to="/drone-package" onClick={() => setMobileMenuOpen(false)}>Drone Package</NavLink></li>
              <li><NavLink to="/defender-wisekit" onClick={() => setMobileMenuOpen(false)}>Defender WiseKit</NavLink></li>
              <li><NavLink to="/pioneer-package" onClick={() => setMobileMenuOpen(false)}>Pioneer Package</NavLink></li>
              <li><NavLink to="/iot-master-package" onClick={() => setMobileMenuOpen(false)}>IoT Master Package</NavLink></li>
              <li><NavLink to="/aiml-master-package" onClick={() => setMobileMenuOpen(false)}>AI/ML Master Package</NavLink></li>
            </ul>
          </li>
        </ul>
        <div className="navbar__actions">
          <NavLink to="/contact">
            <img src="/images/Logo ChildTynker  (6).png" alt="Contact" className="Contact" />
          </NavLink>
        </div>
      </div>

      {/* Floating WhatsApp & Call Buttons */}
      <div className={`floating-buttons ${isMobileMenuOpen ? 'active' : ''}`}>
  <a href="https://wa.me/+918069641194" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-whatsapp"></i>
  </a>
  <a href="tel:+91 8069641194" className="call-btn">
    <i className="fas fa-phone-alt"></i>
  </a>
</div>
    </nav>
  );
};

export default Navbar;