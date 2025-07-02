import React, { useState } from 'react';
import './WiseChild.css';
import { FaRobot, FaGraduationCap, FaAward, FaTools, FaMedal, FaCogs } from 'react-icons/fa';
import Modal from 'react-modal';

// Function to get the amount based on selected course
const getAmount = (course) => {
  if (course === 'Elementary') return 3839900; // ₹38,399 in paise
  if (course === 'Intermediate') return 7039900; // ₹70,399 in paise
  return 9599900; // ₹95,999 in paise for Advanced
};

const WiseChildPackage = () => {
  const [orderData, setOrderData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    course: 'Elementary',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(getAmount('Elementary'));
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

  // Function to handle coupon code
  const handleCoupon = (code, course) => {
    let amt = getAmount(course);
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

  // Update final amount when course or coupon changes
  React.useEffect(() => {
    handleCoupon(coupon, formData.course);
    // eslint-disable-next-line
  }, [formData.course, coupon]);

  // Function to create Razorpay payment link
  const createPaymentLink = async () => {
    try {
      const response = await fetch('http://localhost:5001/create-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount,
          currency: 'INR',
          customer: formData,
        }),
      });

      const data = await response.json();
      if (data.success && data.short_url) {
        window.location.href = data.short_url; // Redirect to Razorpay payment page
      } else {
        alert('Failed to create payment link. Please try again.');
      }
    } catch (error) {
      console.error('Error creating payment link:', error);
      alert('Failed to create payment link. Please try again.');
    }
  };

  return (
    <div className="wise-child-container">
      <h1 className="title">Wise Child Package</h1>

      {/* Details Section */}
      <div className="details-box">
        <div className="detail-item">
          <strong>Age Group:</strong>
          <p>3+ years</p>
        </div>
        <div className="detail-item">
          <strong>Classes:</strong>
          <p>32, 64, or 96 classes</p>
        </div>
        <div className="detail-item">
          <strong>Projects:</strong>
          <p>32+ projects per course</p>
        </div>
      </div>

      {/* Key Features */}
      <div className="features-box">
        <h2>Key Features:</h2>
        <div className="feature-item">
          <FaTools className="icon" />
          <p>BIS-certified kit</p>
        </div>
        <div className="feature-item">
          <FaGraduationCap className="icon" />
          <p>1:1 live online classes by IIT/NIT experts</p>
        </div>
        <div className="feature-item">
          <FaAward className="icon" />
          <p>STEM.org accredited</p>
        </div>
        <div className="feature-item">
          <FaRobot className="icon" />
          <p>Prepared for W.R.O. (World Robot Olympiad)</p>
        </div>
        <div className="feature-item">
          <FaCogs className="icon" />
          <p>100% kit replacement throughout the course</p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="pricing-box">
        <h2>Pricing:</h2>
        <div className="pricing-item">
          <strong>Elementary:</strong>
          <p>₹38,399</p>
        </div>
        <div className="pricing-item">
          <strong>Intermediate:</strong>
          <p>₹70,399</p>
        </div>
        <div className="pricing-item">
          <strong>Advanced:</strong>
          <p>₹95,999</p>
        </div>
      </div>

      {/* Enroll Button */}
      <button onClick={openModal} className="enroll-btn">
        Enroll Now
      </button>

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
            Select Course:
            <select name="course" value={formData.course} onChange={handleInputChange} style={{ marginLeft: 8, padding: 6, borderRadius: 5, border: '1px solid #ccc', width: '80%' }}>
              <option value="Elementary">Elementary</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
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

export default WiseChildPackage;