import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6"; // Import X (formerly Twitter)

const Footer = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#93339e', color: '#FFFFFF', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Logo and Tagline */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0', color: '#FFCC00' }}>ChildTynker</h2>
        <p style={{ fontSize: '16px', margin: '5px 0 0', fontStyle: 'italic' }}>Make your Child future ready</p>
      </div>
      
      {/* Links Container */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        
        {/* Company Links */}
        <div style={{ flex: '1', marginBottom: '20px', minWidth: '220px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: 'bold', color: '#FFCC00', textTransform: 'uppercase' }}>Company</h3>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            <li><Link to="/" style={linkStyle}>Home</Link></li>
            <li><Link to="/about-us" style={linkStyle}>About Us</Link></li>
            <li><Link to="/curriculum" style={linkStyle}>Curriculum</Link></li>
          </ul>
        </div>

        {/* Our Programs */}
        <div style={{ flex: '1', marginBottom: '20px', minWidth: '220px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: 'bold', color: '#FFCC00', textTransform: 'uppercase' }}>Our Programs</h3>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            <li><Link to="/wise-child" style={linkStyle}>Wise Child</Link></li>
            <li><Link to="/alpha-series" style={linkStyle}>Alpha Series</Link></li>
            <li><Link to="/pioneer-package" style={linkStyle}>Pioneer</Link></li>
            <li><Link to="/defender-wisekit" style={linkStyle}>Defender Wise Kit</Link></li>
            <li><Link to="/drone-package" style={linkStyle}>Drone</Link></li>
            <li><Link to="/iot-master-package" style={linkStyle}>IoT</Link></li>
            <li><Link to="/aiml-master-package" style={linkStyle}>AI & ML</Link></li>
          </ul>
        </div>

        {/* Terms Section */}
        <div style={{ flex: '1', marginBottom: '20px', minWidth: '220px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: 'bold', color: '#FFCC00', textTransform: 'uppercase' }}>Terms</h3>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            <li><Link to="/terms" style={linkStyle}>Terms & Conditions</Link></li>
            <li><Link to="/refunds-and-cancellations" style={linkStyle}>Refund Policy & Cancellation</Link></li>
            <li><Link to="/privacy" style={linkStyle}>Privacy Policy</Link></li>
            <li><Link to="/cancellation" style={linkStyle}>Cancellation</Link></li>
            <li><Link to="/shipping" style={linkStyle}>Shipping & Exchange</Link></li>
            <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
          </ul>
        </div>
      </div>

      {/* Social Media Links */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <h3 style={{ color: '#FFCC00', fontSize: '18px', marginBottom: '10px' }}>Follow Us</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <a href="https://www.instagram.com/ChildTynker/" target="_blank" rel="noopener noreferrer" style={iconStyle}><FaInstagram /></a>
          <a href="https://www.threads.net/@childtynker" target="_blank" rel="noopener noreferrer" style={iconStyle}><FaXTwitter /></a>
          <a href="https://www.linkedin.com/company/childtynker/posts/?feedView=all" target="_blank" rel="noopener noreferrer" style={iconStyle}><FaLinkedin /></a>
          <a href="https://www.youtube.com/@childtynker" target="_blank" rel="noopener noreferrer" style={iconStyle}><FaYoutube /></a>
          <a href="https://www.facebook.com/share/1BSD9zDhuC/?mibextid=qi2Omg" target="_blank" rel="noopener noreferrer" style={iconStyle}><FaFacebook /></a>
        </div>
      </div>

      {/* Footer Information */}
      <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '14px', color: '#D3D3D3', borderTop: '1px solid #6A5ACD', paddingTop: '20px' }}>
        <p>© 2025 Reuwati Ventures Private Limited. All Rights Reserved.</p>
      </div>
    </div>
  );
};

// Styles
const linkStyle = {
  fontSize: '15px',
  marginBottom: '10px',
  textDecoration: 'none',
  color: '#87CEEB',
  transition: 'color 0.3s ease-in-out',
};

const iconStyle = {
  fontSize: '24px',
  color: '#FFFFFF',
  textDecoration: 'none',
  transition: 'color 0.3s ease-in-out',
};

export default Footer;