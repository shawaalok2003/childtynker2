const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  course: String,
  amount: Number,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  payment_status: { type: String, default: "Pending" },
});

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);