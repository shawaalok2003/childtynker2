import React, { useState } from 'react';
import './PioneerPackage.css';
import { FaRobot, FaLightbulb, FaMedal, FaTools } from 'react-icons/fa';
import Modal from 'react-modal';

const PioneerPackage = () => {
  const [orderData, setOrderData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    course: 'Single Course', // Default selection
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Open & Close Modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Get Pricing Based on Course Selection
  const getAmount = (course) => {
    return course === 'Single Course' ? 4499900 : 7499900; // Amount in paise
  };

  // Create Razorpay Order
  const createOrder = async () => {
    const response = await fetch('http://localhost:5000/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: getAmount(formData.course),
        currency: 'INR',
        customer: formData, 
      }),
    });

    const data = await response.json();
    setOrderData(data);
    initializeRazorpay(data);
  };

  // Initialize Razorpay Payment
  const initializeRazorpay = (orderData) => {
    const options = {
      key: 'rzp_live_a8Hc5dJCBEsE0Y',
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'ChildTynker',
      description: 'Pioneer Package Enrollment',
      order_id: orderData.id,
      handler: async function (response) {
        await verifyPayment(response);
        alert('Payment successful! Order ID: ' + response.razorpay_order_id);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
      },
      notes: { address: 'Your address' },
      theme: { color: '#80178a' },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  // Verify Payment
  const verifyPayment = async (paymentResponse) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;

    const response = await fetch('http://localhost:5000/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        signature: razorpay_signature,
      }),
    });

    const result = await response.json();
    alert(result.success ? 'Payment verified and order updated!' : 'Payment verification failed');
  };

  return (
    <div className="pioneer-container">
      <h1 className="title">Pioneer Package</h1>

      {/* Details Section */}
      <div className="details-box">
        <div className="detail-item"><strong>Age Group:</strong><p>11+ years</p></div>
        <div className="detail-item"><strong>Classes:</strong><p>50 or 100 classes</p></div>
        <div className="detail-item"><strong>Projects:</strong><p>50+ or 100+ projects</p></div>
      </div>

      {/* Key Features */}
      <div className="features-box">
        <h2>Key Features:</h2>
        <div className="feature-item"><FaTools className="icon" /><p>Programming with Arduino IDE or block-based coding</p></div>
        <div className="feature-item"><FaRobot className="icon" /><p>Learn advanced robotics concepts and logic</p></div>
      </div>
      {/* Example Projects */}
      <div className="projects-box">
        <h2>Example Projects:</h2>
        <div className="project-item"><FaRobot className="project-icon" /><p>Autonomous maze-solving robot</p></div>
        <div className="project-item"><FaLightbulb className="project-icon" /><p>Traffic light control system</p></div>
        <div className="project-item"><FaMedal className="project-icon" /><p>Night street lamp</p></div>
      </div>
      {/* Pricing Section */}
      <div className="pricing-box">
        <h2>Pricing:</h2>
        <div className="pricing-item"><strong>Single Course:</strong><p>₹44,999</p></div>
        <div className="pricing-item"><strong>Combined:</strong><p>₹74,999</p></div>
      </div>
      {/* Enroll Button */}
      <button onClick={openModal} className="enroll-btn">Enroll Now</button>

      {/* Modal Form */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Enrollment Form">
        <h2>Fill Your Details</h2>
        <form onSubmit={(e) => { e.preventDefault(); createOrder(); closeModal(); }}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </label>
          <label>
            Contact:
            <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} required />
          </label>
          <label>
            Select Course:
            <select name="course" value={formData.course} onChange={handleInputChange}>
              <option value="Single Course">Single Course (₹44,999)</option>
              <option value="Combined">Combined (₹74,999)</option>
            </select>
          </label>
          <button type="submit">Proceed to Payment</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default PioneerPackage;