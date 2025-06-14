import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  const fetchWithdrawals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/withdrawals");
      setWithdrawals(res.data);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    }
  };

  const updateStatus = async (email, requestedAt, status) => {
    try {
      await axios.post("http://localhost:5000/api/withdrawals/update", {
        email,
        requestedAt,
        status,
      });
      fetchWithdrawals();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Withdrawal Requests</h2>
      {withdrawals.length === 0 ? (
        <p>No withdrawal requests found.</p>
      ) : (
        withdrawals.map((w, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "15px",
            }}
          >
            <p><strong>Email:</strong> {w.email}</p>
            <p><strong>Amount:</strong> ₹{w.amount}</p>
            <p><strong>Status:</strong> {w.status}</p>
            <p><strong>Requested At:</strong> {new Date(w.requestedAt).toLocaleString()}</p>
            {w.status === "pending" && (
              <div>
                <button
                  onClick={() => updateStatus(w.email, w.requestedAt, "approved")}
                  style={{ marginRight: "10px", backgroundColor: "green", color: "#fff", padding: "5px 10px" }}
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(w.email, w.requestedAt, "rejected")}
                  style={{ backgroundColor: "red", color: "#fff", padding: "5px 10px" }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPanel;