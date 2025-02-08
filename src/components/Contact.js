import React from 'react';

const ContactPage = () => {
  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    fontSize: '2em',
    color: '#333',
    marginBottom: '20px',
  };

  const infoStyle = {
    fontSize: '1.1em',
    color: '#555',
    marginBottom: '30px',
  };

  const detailsStyle = {
    fontSize: '1.2em',
    color: '#333',
  };
  const itemStyle = {
    marginBottom: '15px',
  };
  const strongStyle = {
    color: '#000',
  };
  const linkStyle = {
    color: '#007BFF',
    textDecoration: 'none',
  };

  const linkHoverStyle = {
    textDecoration: 'underline',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Contact Us</h1>
      <p style={infoStyle}>
        If you have any additional questions or would like to request a refund, feel free to contact us.
      </p>
      <div style={detailsStyle}>
        <p style={itemStyle}>
          <strong style={strongStyle}>Mob:</strong>+91 96118 28173
        </p>
        <p style={itemStyle}>
          <strong style={strongStyle}>Location:</strong>Hustle Hub Tech Park, HSR-02, Bengaluru-560102
          </p>
          <p>
          <strong style={strongStyle}>Location:</strong>500 Terry Francine St. San Francisco, CA 94158
          
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