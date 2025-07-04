// AdminPanel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", teacher: "", description: "" });

  const fetchWithdrawals = async () => {
    const res = await axios.get("https://childtynker-backend-3.onrender.com/api/withdrawals");
    setWithdrawals(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get("https://childtynker-backend-3.onrender.com/api/users");
    setUsers(res.data.filter((u) => u.role === "teacher"));
  };

  const fetchCourses = async () => {
    const res = await axios.get("https://childtynker-backend-3.onrender.com/api/courses?all=true");
    setCourses(res.data);
  };

  const updateStatus = async (email, requestedAt, status) => {
    await axios.post("https://childtynker-backend-3.onrender.com/api/withdrawals/update", { email, requestedAt, status });
    fetchWithdrawals();
  };

  const handleCreateCourse = async () => {
    await axios.post("https://childtynker-backend-3.onrender.com/api/create-course", newCourse);
    fetchCourses();
    setNewCourse({ title: "", teacher: "", description: "" });
  };

  useEffect(() => {
    fetchWithdrawals();
    fetchUsers();
    fetchCourses();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel</h2>

      <div>
        <h3>Create Course</h3>
        <input
          type="text"
          placeholder="Title"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
        />
        <select
          value={newCourse.teacher}
          onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
        >
          <option value="">Select Teacher</option>
          {users.map((u, i) => (
            <option key={i} value={u.email}>
              {u.email}
            </option>
          ))}
        </select>
        <button onClick={handleCreateCourse}>Create Course</button>
      </div>

      <div>
        <h3>Withdrawal Requests</h3>
        {withdrawals.length === 0 ? (
          <p>No withdrawal requests.</p>
        ) : (
          withdrawals.map((w, i) => (
            <div key={i} style={{ border: "1px solid gray", margin: "10px 0", padding: 10 }}>
              <p>Email: {w.email}</p>
              <p>Amount: ₹{w.amount}</p>
              <p>Status: {w.status}</p>
              <p>Requested: {new Date(w.requestedAt).toLocaleString()}</p>
              {w.status === "pending" && (
                <>
                  <button onClick={() => updateStatus(w.email, w.requestedAt, "approved")}>Approve</button>
                  <button onClick={() => updateStatus(w.email, w.requestedAt, "rejected")}>Reject</button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
