import React, { useState } from "react";

const PaymentGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    amount: "",
  });

  const [paymentLink, setPaymentLink] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const correctPassword = "ChildTynker@2345"; // Change this to your secure password

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Authenticate the password
  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password! Access denied.");
    }
  };

  // Generate Payment Link
  const generatePaymentLink = async () => {
    if (!formData.name || !formData.email || !formData.contact || !formData.amount) {
      alert("Please fill all details");
      return;
    }

    const response = await fetch("https://childtynker-r8zx.vercel.app/create-payment-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: parseInt(formData.amount) * 100, // Convert ₹ to paise
        currency: "INR",
        customer: formData,
      }),
    });

    const data = await response.json();
    if (data.success) {
      setPaymentLink(data.short_url);
    } else {
      alert("Failed to generate payment link");
    }
  };

  // Show password input before displaying the form
  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>Enter Password to Access Payment Generator</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
        <button onClick={handlePasswordSubmit}>Submit</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Generate Payment Link</h2>

      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Customer Name" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Customer Email" />
      <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Customer Contact" />
      <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Enter Amount (₹)" />

      <button onClick={generatePaymentLink}>Generate Payment Link</button>

      {paymentLink && (
        <div>
          <p>Payment Link:</p>
          <a href={paymentLink} target="_blank" rel="noopener noreferrer">
            {paymentLink}
          </a>
          <br />
          <button onClick={() => navigator.clipboard.writeText(paymentLink)}>Copy Link</button>
          <a href={`https://wa.me/?text=Pay%20now:%20${paymentLink}`} target="_blank" rel="noopener noreferrer">
            Share via WhatsApp
          </a>
        </div>
      )}
    </div>
  );
};

export default PaymentGenerator;