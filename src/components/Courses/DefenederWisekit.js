import React, { useState } from 'react';
import './DefenderWiseKit.css'; // External CSS file for styling
import { FaRobot, FaCogs, FaMicrochip, FaMoneyBillWave } from 'react-icons/fa';
import { IoSchoolOutline } from 'react-icons/io5';
import Modal from 'react-modal';

// Function to get the amount
const getAmount = () => 5999900; // ₹59,999

const DefenderWiseKit = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(getAmount());
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

  const handleCoupon = (code) => {
    let amt = getAmount();
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
    handleCoupon(coupon);
    // eslint-disable-next-line
  }, [coupon]);

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
    <div className="defender-wisekit-container">
      <h1 className="title">Defender WiseKit</h1>

      {/* Details Section */}
      <div className="details-box">
        <div className="detail-item">
          <IoSchoolOutline className="icon" />
          <strong>Age Group:</strong>
          <p>10+ years</p>
        </div>
        <div className="detail-item">
          <FaCogs className="icon" />
          <strong>Classes:</strong>
          <p>50 classes</p>
        </div>
        <div className="detail-item">
          <FaMicrochip className="icon" />
          <strong>Projects:</strong>
          <p>50+ projects</p>
        </div>
      </div>

      {/* Key Features */}
      <div className="features-box">
        <h2><FaRobot className="icon" /> Key Features:</h2>
        <ul>
          <li>Hands-on robotics with sensors and logic-building tasks</li>
          <li>Focus on automation and complex designs</li>
          <li>Prepared for W.R.O.</li>
        </ul>
      </div>

      {/* Example Projects */}
      <div className="projects-box">
        <h2><FaCogs className="icon" /> Example Projects:</h2>
        <ul>
          <li>Gesture control robot</li>
          <li>Voice control robot</li>
          <li>Firefighting robot</li>
        </ul>
      </div>

      {/* Pricing Section */}
      <div className="pricing-box">
        <h2><FaMoneyBillWave className="icon" /> Pricing:</h2>
        <div className="price-item">
          <strong>₹59,999</strong>
        </div>
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

export default DefenderWiseKit;