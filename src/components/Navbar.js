import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCoursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [isDesktopDropdownOpen, setDesktopDropdownOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle courses dropdown for mobile
  const toggleCoursesDropdown = () => {
    setCoursesDropdownOpen(!isCoursesDropdownOpen);
  };

  // Toggle courses dropdown for desktop
  const toggleDesktopDropdown = () => {
    setDesktopDropdownOpen(!isDesktopDropdownOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.querySelector('.navbar__mobile-menu');
      const hamburger = document.querySelector('.navbar__hamburger');
      const desktopDropdown = document.querySelector('.navbar__dropdown');
      
      if (mobileMenu && !mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
        setMobileMenuOpen(false);
        setCoursesDropdownOpen(false);
      }
      
      if (desktopDropdown && !desktopDropdown.contains(event.target)) {
        setDesktopDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu when pressing Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        setCoursesDropdownOpen(false);
        setDesktopDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Add/remove body class for scroll prevention
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMobileMenuOpen]);

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
        
        {/* Desktop Navigation - Only visible on desktop */}
        <ul className="navbar__links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li><NavLink to="/milestones">Milestones</NavLink></li>
          <li><NavLink to="/key-features">Key Features</NavLink></li>
          <li><NavLink to="/our-products">Our Products</NavLink></li>
          <li className="navbar__dropdown" 
              onMouseEnter={() => setDesktopDropdownOpen(true)} 
              onMouseLeave={() => setDesktopDropdownOpen(false)}>
            <span className="dropdown-toggle">Courses</span>
            <ul className={`dropdown-menu ${isDesktopDropdownOpen ? 'show' : ''}`}>
              <li><NavLink to="/wise-child">Wise Child Package</NavLink></li>
              <li><NavLink to="/alpha-series">Alpha Series Package</NavLink></li>
              <li><NavLink to="/drone-package">Drone Package</NavLink></li>
              <li><NavLink to="/defender-wisekit">Defender WiseKit</NavLink></li>
              <li><NavLink to="/pioneer-package">Pioneer Package</NavLink></li>
              <li><NavLink to="/iot-master-package">IoT Master Package</NavLink></li>
              <li><NavLink to="/aiml-master-package">AI/ML Master Package</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/our-partners">Our Partners</NavLink></li>
          <li><NavLink to="/testimonials">Testimonials</NavLink></li>
        </ul>

        {/* Hamburger Menu Button - Only visible on mobile */}
        <button className="navbar__hamburger" onClick={toggleMobileMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="navbar__overlay" onClick={() => setMobileMenuOpen(false)}></div>
        )}

        {/* Mobile Menu Sidebar */}
        <div className={`navbar__mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu__header">
            <h3>Menu</h3>
            <button className="mobile-menu__close" onClick={() => setMobileMenuOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <ul className="mobile-menu__links">
            <li><NavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</NavLink></li>
            <li><NavLink to="/milestones" onClick={() => setMobileMenuOpen(false)}>Milestones</NavLink></li>
            <li><NavLink to="/key-features" onClick={() => setMobileMenuOpen(false)}>Key Features</NavLink></li>
            <li><NavLink to="/our-products" onClick={() => setMobileMenuOpen(false)}>Our Products</NavLink></li>
            
            {/* Courses Dropdown for Mobile */}
            <li className={`mobile-menu__dropdown ${isCoursesDropdownOpen ? 'active' : ''}`}>
              <span className="dropdown-toggle" onClick={toggleCoursesDropdown}>Courses</span>
              <ul className="dropdown-menu">
                <li><NavLink to="/wise-child" onClick={() => setMobileMenuOpen(false)}>Wise Child Package</NavLink></li>
                <li><NavLink to="/alpha-series" onClick={() => setMobileMenuOpen(false)}>Alpha Series Package</NavLink></li>
                <li><NavLink to="/drone-package" onClick={() => setMobileMenuOpen(false)}>Drone Package</NavLink></li>
                <li><NavLink to="/defender-wisekit" onClick={() => setMobileMenuOpen(false)}>Defender WiseKit</NavLink></li>
                <li><NavLink to="/pioneer-package" onClick={() => setMobileMenuOpen(false)}>Pioneer Package</NavLink></li>
                <li><NavLink to="/iot-master-package" onClick={() => setMobileMenuOpen(false)}>IoT Master Package</NavLink></li>
                <li><NavLink to="/aiml-master-package" onClick={() => setMobileMenuOpen(false)}>AI/ML Master Package</NavLink></li>
              </ul>
            </li>
            
            <li><NavLink to="/our-partners" onClick={() => setMobileMenuOpen(false)}>Our Partners</NavLink></li>
            <li><NavLink to="/testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</NavLink></li>
          </ul>

          <div className="mobile-menu__actions">
            <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <img src="/images/Logo ChildTynker  (6).png" alt="Contact" className="Contact" />
            </NavLink>
            <NavLink to="/login" onClick={() => setMobileMenuOpen(false)}>
              <button className="auth-button">Login</button>
            </NavLink>
          </div>
        </div>

        <div className="navbar__actions">
          <NavLink to="/contact">
            <img src="/images/Logo ChildTynker  (6).png" alt="Contact" className="Contact" />
          </NavLink>
        </div>
        <div className="navbar__auth">
          <NavLink to="/login">
            <button className="auth-button">Login</button>
          </NavLink>
        </div>
      </div>

      {/* Floating WhatsApp & Call Buttons */}
      <div className="floating-buttons">
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