import React from 'react';

const ContactPage = () => {
  const containerStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    fontSize: '2.2em',
    color: '#007BFF',
    marginBottom: '20px',
    fontWeight: 'bold',
  };

  const infoStyle = {
    fontSize: '1.2em',
    color: '#444',
    marginBottom: '25px',
    lineHeight: '1.6',
  };

  const detailsStyle = {
    fontSize: '1.3em',
    color: '#333',
    lineHeight: '1.6',
  };

  const itemStyle = {
    marginBottom: '15px',
    fontWeight: 'bold',
  };

  const strongStyle = {
    color: '#000',
  };

  const linkStyle = {
    color: '#007BFF',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  const linkHoverStyle = {
    textDecoration: 'underline',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Contact Us</h1>
      <p style={infoStyle}>
        If you have any additional questions, feel free to contact us.
      </p>
      <div style={detailsStyle}>
        <p style={itemStyle}>
          <strong style={strongStyle}>Mobile:</strong> +91 80 6964 1194
        </p>
        <p style={itemStyle}>
          <strong style={strongStyle}>Office:</strong> Hustle Hub Tech Park, HSR-02, Bengaluru-560102
        </p>
        <p style={itemStyle}>
          <strong style={strongStyle}>Office:</strong> 500 Terry Francine St., San Francisco, CA 94158
        </p>
        <p style={itemStyle}>
          <strong style={strongStyle}>Email:</strong> 
          <a href="mailto:support@childtynker.com" style={linkStyle}>
            support@childtynker.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;