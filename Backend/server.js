const express = require('express');
const Razorpay = require('razorpay');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Order = require('./models/order');  // Import the Order model
const app = express();
const razorpay = new Razorpay({
  key_id: 'rzp_live_a8Hc5dJCBEsE0Y',
  key_secret: 'd8Ya5ci807WpqZPy1QJz0XGX',
});

app.use(cors());

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/razorpay', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Create Razorpay order
app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, customer } = req.body;  // Assume customer data is in request body

    const options = {
      amount: amount, // Amount in paise
      currency: currency,
      receipt: 'order_receipt_' + Math.random().toString(36).substring(7),
      notes: {
        key1: 'value1',
        key2: 'value2',
      },
    };

    const order = await razorpay.orders.create(options);

    // Store order data in MongoDB
    const newOrder = new Order({
      name: customer.name,
      email: customer.email,
      contact: customer.contact,
      course: customer.course,
      amount: amount,
      razorpay_order_id: order.id,
    });
    await newOrder.save();

    res.json(order); // Send the order details back to frontend
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Verify Payment Signature and Update Order Status
app.post('/verify-payment', async (req, res) => {
  const { payment_id, order_id, signature } = req.body;

  try {
    const order = await Order.findOne({ razorpay_order_id: order_id });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Here, you should verify the payment signature with Razorpay API

    // Update the payment status in the database
    order.razorpay_payment_id = payment_id;
    order.razorpay_signature = signature;
    order.payment_status = 'Completed';  // Assuming the payment is successful

    await order.save();

    res.status(200).json({ success: true, message: 'Payment successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});