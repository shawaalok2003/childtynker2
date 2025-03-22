import React from 'react';

const ContactPage = () => {
  const containerStyle = {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '30px',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    fontSize: '2.5em',
    color: '#007BFF',
    marginBottom: '20px',
    fontWeight: 'bold',
  };

  const sectionStyle = {
    textAlign: 'left',
    marginBottom: '30px',
    fontSize: '1.2em',
    color: '#444',
  };

  const itemStyle = {
    marginBottom: '15px',
  };

  const strongStyle = {
    color: '#000',
    fontWeight: 'bold',
  };

  const linkStyle = {
    color: '#007BFF',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  const handleSendMessage = (event) => {
    event.preventDefault(); // Prevent default form submission

    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;

    const subject = encodeURIComponent(`Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:support@childtynker.com?subject=${subject}&body=${body}`;
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Contact Us</h1>

      {/* Contact Information */}
      <div style={sectionStyle}>
        <h2>Our Contact Details</h2>
        <p style={itemStyle}>
          <strong style={strongStyle}>Mobile:</strong> +91 80 6964 1194
        </p>
        <p style={itemStyle}>
          <strong style={strongStyle}>Office (India):</strong> Hustle Hub Tech Park, HSR-02, Bengaluru-560102
        </p>
        <p style={itemStyle}>
          <strong style={strongStyle}>Office (USA):</strong> 500 Terry Francine St., San Francisco, CA 94158
        </p>
        <p style={itemStyle}>
          <strong style={strongStyle}>Email:</strong>{' '}
          <a href="mailto:support@childtynker.com" style={linkStyle}>
            support@childtynker.com
          </a>
        </p>
      </div>

      {/* Contact Form */}
      <div style={sectionStyle}>
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSendMessage}>
          <input type="text" name="name" placeholder="Your Name" required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
          <input type="email" name="email" placeholder="Your Email" required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
          <textarea name="message" placeholder="Your Message" rows="5" required style={{ width: '100%', padding: '10px', marginBottom: '10px' }}></textarea>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Send Message
          </button>
        </form>
      </div>

      {/* Google Map */}
      <div style={sectionStyle}>
        <h2>Find Us</h2>
        <iframe
          title="Google Map"
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: '0', borderRadius: '10px' }}
          src=""
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;