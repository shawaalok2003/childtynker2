import React, { useState } from 'react';
import './WiseChild.css';
import { FaRobot, FaGraduationCap, FaAward, FaTools, FaMedal, FaCogs } from 'react-icons/fa';
import Modal from 'react-modal';

const WiseChildPackage = () => {
  const [orderData, setOrderData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    course: 'Elementary',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to create Razorpay order
  const createOrder = async () => {
    try {
      const response = await fetch('https://childtynker-r8zx.vercel.app/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: getAmount(formData.course),
          currency: 'INR',
          customer: formData,
        }),
      });

      const data = await response.json();
      setOrderData(data);
      initializeRazorpay(data);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  // Function to get the amount based on selected course
  const getAmount = (course) => {
    if (course === 'Elementary') return 3839900; // ₹38,399 in paise
    if (course === 'Intermediate') return 7039900; // ₹70,399 in paise
    return 9599900; // ₹95,999 in paise for Advanced
  };

  // Function to initialize Razorpay payment
  const initializeRazorpay = (orderData) => {
    const options = {
      key: 'rzp_live_a8Hc5dJCBEsE0Y',
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'ChildTynker',
      description: 'Wise Child Package Enrollment',
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
      notes: {
        address: 'Your address',
      },
      theme: {
        color: '#80178a',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  // Function to verify payment
  const verifyPayment = async (paymentResponse) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;

    try {
      const response = await fetch('https://childtynker-r8zx.vercel.app/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
          signature: razorpay_signature,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Payment verified and order updated!');
      } else {
        alert('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      alert('Error verifying payment. Please contact support.');
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
            createOrder();
            closeModal();
          }}
        >
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
              <option value="Elementary">Elementary</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </label>
          <button type="submit">Proceed to Payment</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default WiseChildPackage;