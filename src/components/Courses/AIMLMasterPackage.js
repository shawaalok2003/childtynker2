import React, { useState } from 'react';
import './AIMLMasterPackage.css'; // External CSS file for styling
import Modal from 'react-modal';

// Function to get the amount based on selected plan
const getAmount = (plan) => {
  return plan === '50 Classes' ? 4839900 : 7539900; // ₹48,399 or ₹75,399
};

const AIMLMasterPackage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    plan: '50 Classes',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(getAmount('50 Classes'));
  const [couponMessage, setCouponMessage] = useState('');

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCoupon = (code, plan) => {
    let amt = getAmount(plan);
    let disc = 0;
    let msg = '';
    if (code === 'OFF10') {
      disc = 0.10;
      msg = '10% off applied!';
    } else if (code === 'OFF20') {
      disc = 0.20;
      msg = '20% off applied!';
    } else if (code === 'OFF30') {
      disc = 0.30;
      msg = '30% off applied!';
    } else if (code.length > 0) {
      msg = 'Invalid coupon code';
    }
    setDiscount(disc);
    setCouponMessage(msg);
    setFinalAmount(Math.round(amt * (1 - disc)));
  };

  React.useEffect(() => {
    handleCoupon(coupon, formData.plan);
    // eslint-disable-next-line
  }, [formData.plan, coupon]);

  const createPaymentLink = async () => {
    try {
      const response = await fetch('http://localhost:5001/create-payment-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          currency: 'INR',
          customer: formData,
        }),
      });
      const data = await response.json();
      if (data.success && data.short_url) {
        window.location.href = data.short_url;
      } else {
        alert('Failed to create payment link. Please try again.');
      }
    } catch (error) {
      console.error('Error creating payment link:', error);
      alert('Failed to create payment link. Please try again.');
    }
  };

  return (
    <div className="aiml-master-container">
      <h1 className="title">AI/ML Master Package</h1>
      
      {/* Details Section */}
      <div className="details-box">
        <div className="detail-item">
          <strong>Age Group:</strong>
          <p>12+ years</p>
        </div>
        <div className="detail-item">
          <strong>Classes:</strong>
          <p>50 or 100 classes</p>
        </div>
        <div className="detail-item">
          <strong>Projects:</strong>
          <p>12+ or 40+ projects</p>
        </div>
      </div>

      {/* Key Features */}
      <div className="features-box">
        <h2>Key Features:</h2>
        <ul>
          <li>Learn artificial intelligence and machine learning</li>
          <li>Build AI-enabled robots and tracking systems</li>
        </ul>
      </div>

      {/* Example Projects */}
      <div className="projects-box">
        <h2>Example Projects:</h2>
        <ul>
          <li>Face recognition robot</li>
          <li>Vision line-tracking robot</li>
          <li>Human face tracking</li>
        </ul>
      </div>

      {/* Pricing Section */}
      <div className="pricing-box">
        <h2>Pricing:</h2>
        <p>₹48,399 (50 Classes) or ₹75,399 (100 Classes)</p>
      </div>

      {/* Enroll Button */}
      <button onClick={openModal} className="enroll-btn">Enroll Now</button>

      {/* Modal Form */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Enrollment Form">
        <h2>Fill Your Details</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPaymentLink();
            closeModal();
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', borderRadius: '10px', background: '#f9f6fd', boxShadow: '0 2px 8px #e0d7ee' }}
        >
          <label style={{ fontWeight: 'bold' }}>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{ marginLeft: 8, padding: 6, borderRadius: 5, border: '1px solid #ccc', width: '80%' }} />
          </label>
          <label style={{ fontWeight: 'bold' }}>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={{ marginLeft: 8, padding: 6, borderRadius: 5, border: '1px solid #ccc', width: '80%' }} />
          </label>
          <label style={{ fontWeight: 'bold' }}>
            Contact:
            <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} required style={{ marginLeft: 8, padding: 6, borderRadius: 5, border: '1px solid #ccc', width: '80%' }} />
          </label>
          <label style={{ fontWeight: 'bold' }}>
            Select Plan:
            <select name="plan" value={formData.plan} onChange={handleInputChange} style={{ marginLeft: 8, padding: 6, borderRadius: 5, border: '1px solid #ccc', width: '80%' }}>
              <option value="50 Classes">50 Classes (₹48,399)</option>
              <option value="100 Classes">100 Classes (₹75,399)</option>
            </select>
          </label>
          <label style={{ fontWeight: 'bold' }}>
            Coupon Code:
            <input
              type="text"
              name="coupon"
              value={coupon}
              onChange={e => setCoupon(e.target.value.trim().toUpperCase())}
              style={{ marginLeft: 8, padding: 6, borderRadius: 5, border: '1px solid #ccc', width: '60%' }}
            />
            {couponMessage && (
              <span style={{ color: couponMessage.includes('off') ? 'green' : 'red', marginLeft: 10, fontWeight: 'bold' }}>{couponMessage}</span>
            )}
          </label>
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#80178a', marginTop: 8 }}>
            Payable Amount: ₹{(finalAmount / 100).toLocaleString('en-IN')}
            {discount > 0 && (
              <span style={{ color: '#388e3c', marginLeft: 10 }}>(Discount Applied)</span>
            )}
          </div>
          <button type="submit" style={{ background: '#80178a', color: '#fff', padding: '10px 0', border: 'none', borderRadius: 6, fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginTop: 10, boxShadow: '0 2px 6px #e0d7ee' }}>Proceed to Payment</button>
        </form>
        <button onClick={closeModal} style={{ marginTop: 10, background: '#fff', color: '#80178a', border: '1px solid #80178a', borderRadius: 6, padding: '8px 0', fontWeight: 'bold', cursor: 'pointer' }}>Close</button>
      </Modal>
    </div>
  );
};

export default AIMLMasterPackage;