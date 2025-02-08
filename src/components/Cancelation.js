import React from 'react';

const CancellationPolicy = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333', padding: '20px', maxWidth: '800px', margin: '80px auto', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ fontSize: '28px', textAlign: 'center', color: '#4B0082', marginBottom: '20px' }}>Cancellation Policy</h1>

      <section style={{ marginBottom: '20px' }}>
        <p>
          Your order is eligible for cancellation within a period of 24 hours from the time of placing it.
        </p>
        <p>
          If you wish to cancel your order, you can do so by either:
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>
            Sending an email to <a href="mailto:support@childtynker.com" style={{ color: '#4B0082', textDecoration: 'none' }}>support@childtynker.com</a>.
          </li>
          <li style={{ marginBottom: '10px' }}>
            Calling us at <strong style={{ color: '#4B0082' }}>+91 9431018254</strong>.
          </li>
        </ul>
        <p>
          Please make sure to contact us within 24 hours of placing the order for a successful cancellation request.
        </p>
      </section>

      <footer style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#555' }}>
        <p>© 2025 Child Tynker. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default CancellationPolicy;