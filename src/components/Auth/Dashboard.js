// ✅ Enhanced Dashboard.jsx for Wallet Withdrawal Amount Selection

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const { state } = useLocation();
  const [wallet, setWallet] = useState(0);
  const [courses, setCourses] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");
  const [withdrawRequested, setWithdrawRequested] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [lastWithdrawal, setLastWithdrawal] = useState(null);

  useEffect(() => {
    if (state?.role === "teacher") {
      axios.get(`https://childtynker-backend-3.onrender.com/api/courses/teacher/${state.email}`)
        .then(res => setCourses(res.data));
    } else if (state?.role === "student") {
      axios.get("https://childtynker-backend-3.onrender.com/api/courses").then(res => setCourses(res.data));
    }

    axios.get("https://childtynker-backend-3.onrender.com/api/users").then(res => {
      const user = res.data.find(u => u.email === state.email);
      if (user) setWallet(user.wallet || 0);
    });

   axios.get(`https://childtynker-backend-3.onrender.com/api/teacher-wallet/${state.email}`).then(res => {
  setLastWithdrawal(res.data.lastWithdrawal || null);
});
  }, [state]);

  const handleCompleteClass = async (courseId) => {
    try {
      const res = await axios.post("https://childtynker-backend-3.onrender.com/api/complete-class", {
        email: state.email,
        courseId
      });
      setWallet(res.data.wallet);
      setCourses(prev =>
        prev.map(course =>
          course.id === courseId ? { ...course, completed: true } : course
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Error completing class");
    }
  };

  const handleWithdraw = async () => {
    if (withdrawAmount <= 0 || withdrawAmount > wallet) {
      alert("Invalid withdrawal amount");
      return;
    }
    setWithdrawRequested(true);
    await axios.post("https://childtynker-backend-3.onrender.com/api/withdraw", {
      email: state.email,
      amount: withdrawAmount
    });
    setWallet(wallet - withdrawAmount);
    setWithdrawAmount(0);
  };

  const renderStudentCourses = () => (
    <div>
      <h3>Live Courses Enrolled</h3>
      {courses.map((course) => (
        <div key={course.id} className="course-card">
          <h4>{course.title}</h4>
          <p>Status: {course.status}</p>
          <p>Instructor: {course.teacher}</p>
          {course.quiz?.length > 0 && (
            <div>
              <h5>Quiz:</h5>
              {course.quiz.map((q, i) => (
                <div key={i}>
                  <p>{q.question}</p>
                  {q.options.map((opt, j) => (
                    <label key={j}>
                      <input type="radio" name={`q${i}`} /> {opt}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderTeacherCourses = () => (
    <div>
      <h3>Your Teaching Courses</h3>
      {courses.map((course) => (
        <div key={course.id} className="course-card">
          <h4>{course.title}</h4>
          <p>Status: {course.status}</p>
          <p>Students Enrolled: {course.enrolledStudents}</p>
          <p>Completed: {course.completed ? "✅" : "❌"}</p>
          {!course.completed && (
            <button onClick={() => handleCompleteClass(course.id)}>
              Mark as Complete & Earn ₹100
            </button>
          )}
        </div>
      ))}
    </div>
  );

  const renderWallet = () => (
    <div>
      <h3>Wallet</h3>
      <p>Balance: ₹{wallet}</p>
      <input
        type="number"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(parseInt(e.target.value))}
        placeholder="Enter amount to withdraw"
      />
      <button onClick={handleWithdraw} disabled={withdrawRequested}>
        Request Withdraw
      </button>
      {withdrawRequested && (
        <p style={{ color: "green" }}>
          ✅ Withdraw request for ₹{withdrawAmount} sent. You’ll receive your money in 7 days.
        </p>
      )}
      {lastWithdrawal && (
        <p style={{ marginTop: 10 }}>
          <strong>Last Withdrawal:</strong> ₹{lastWithdrawal.amount} - {lastWithdrawal.status} on {new Date(lastWithdrawal.requestedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <h3>Welcome</h3>
        <p>{state?.email}</p>
        <nav>
          <ul>
            <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
            <li onClick={() => setActivePage("courses")}>My Courses</li>
            {state?.role === "teacher" && (
              <li onClick={() => setActivePage("wallet")}>Wallet / Withdraw</li>
            )}
          </ul>
        </nav>
      </aside>

      <main className="dashboard-main">
        <h2>
          {activePage === "dashboard"
            ? "Dashboard"
            : activePage === "courses"
            ? "Courses"
            : "Wallet"}
        </h2>
        {activePage === "dashboard" && (
          <>
            <p><strong>Role:</strong> {state?.role}</p>
          </>
        )}
        {activePage === "courses" &&
          (state?.role === "student"
            ? renderStudentCourses()
            : renderTeacherCourses())}
        {activePage === "wallet" &&
          state?.role === "teacher" &&
          renderWallet()}
      </main>
    </div>
  );
};

export default Dashboard;
