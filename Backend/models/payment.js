const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: 'rzp_live_a8Hc5dJCBEsE0Y',
    key_secret: 'd8Ya5ci807WpqZPy1QJz0XGX',
});

// Generate Payment Link
app.post("/create-payment-link", async (req, res) => {
  try {
    const { amount, currency, customer } = req.body;

    // Generate Razorpay Payment Link
    const paymentLink = await razorpay.paymentLink.create({
      amount: amount, // Amount in paise
      currency: currency || "INR",
      description: `Payment for ${customer.name}`,
      customer: {
        name: customer.name,
        email: customer.email,
        contact: customer.contact,
      },
      notify: { sms: true, email: true },
      callback_url: "https://childtynker.com/payment-success",
      callback_method: "get",
    });

    res.json({
      success: true,
      short_url: paymentLink.short_url, // Razorpay's short payment URL
    });
  } catch (error) {
    console.error("Error creating payment link:", error);
    res.status(500).json({ success: false, error: "Failed to create payment link" });
  }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));