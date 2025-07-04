// ✅ Enhanced Dashboard.jsx for Wallet Withdrawal Amount Selection

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(0);
  const [courses, setCourses] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");
  const [withdrawRequested, setWithdrawRequested] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [lastWithdrawal, setLastWithdrawal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get user data from state or localStorage
  const userEmail = state?.email || localStorage.getItem('userEmail');
  const userRole = state?.role || localStorage.getItem('userRole');

  useEffect(() => {
    // If no user data, redirect to login
    if (!userEmail || !userRole) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError("");

    const fetchData = async () => {
      try {
        if (userRole === "teacher") {
          const coursesRes = await axios.get(`https://childtynker-backend-3.onrender.com/api/courses/teacher/${userEmail}`);
          setCourses(coursesRes.data);
        } else if (userRole === "student") {
          const coursesRes = await axios.get("https://childtynker-backend-3.onrender.com/api/courses");
          setCourses(coursesRes.data);
        }

        // Get user wallet
        const usersRes = await axios.get("https://childtynker-backend-3.onrender.com/api/users");
        const user = usersRes.data.find(u => u.email === userEmail);
        if (user) setWallet(user.wallet || 0);

        // Get teacher wallet info if teacher
        if (userRole === "teacher") {
          const walletRes = await axios.get(`https://childtynker-backend-3.onrender.com/api/teacher-wallet/${userEmail}`);
          setLastWithdrawal(walletRes.data.lastWithdrawal || null);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userEmail, userRole, navigate]);

  const handleCompleteClass = async (courseId) => {
    try {
      const res = await axios.post("https://childtynker-backend-3.onrender.com/api/complete-class", {
        email: userEmail,
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
      email: userEmail,
      amount: withdrawAmount
    });
    setWallet(wallet - withdrawAmount);
    setWithdrawAmount(0);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const renderStudentCourses = () => (
    <div>
      <h3>Live Courses Enrolled</h3>
      {courses.length === 0 ? (
        <p>No courses enrolled yet.</p>
      ) : (
        courses.map((course) => (
          <div key={course.id} className="course-card">
            <h4>{course.title}</h4>
            <p>Status: {course.status || 'Active'}</p>
            <p>Instructor: {course.teacher || 'TBD'}</p>
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
        ))
      )}
    </div>
  );

  const renderTeacherCourses = () => (
    <div>
      <h3>Your Teaching Courses</h3>
      {courses.length === 0 ? (
        <p>No courses assigned yet.</p>
      ) : (
        courses.map((course) => (
          <div key={course.id} className="course-card">
            <h4>{course.title}</h4>
            <p>Status: {course.status || 'Active'}</p>
            <p>Students Enrolled: {course.enrolledStudents || 0}</p>
            <p>Completed: {course.completed ? "✅" : "❌"}</p>
            {!course.completed && (
              <button onClick={() => handleCompleteClass(course.id)}>
                Mark as Complete & Earn ₹100
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );

  const renderWallet = () => (
    <div>
      <h3>Wallet</h3>
      <p>Balance: ₹{wallet}</p>
      <input
        type="number"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(parseInt(e.target.value) || 0)}
        placeholder="Enter amount to withdraw"
      />
      <button onClick={handleWithdraw} disabled={withdrawRequested}>
        Request Withdraw
      </button>
      {withdrawRequested && (
        <p style={{ color: "green" }}>
          ✅ Withdraw request for ₹{withdrawAmount} sent. You'll receive your money in 7 days.
        </p>
      )}
      {lastWithdrawal && (
        <p style={{ marginTop: 10 }}>
          <strong>Last Withdrawal:</strong> ₹{lastWithdrawal.amount} - {lastWithdrawal.status} on {new Date(lastWithdrawal.requestedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading Dashboard...</h2>
          <p>Please wait while we fetch your data.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-wrapper">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <h3>Welcome</h3>
        <p>{userEmail}</p>
        <p><strong>Role:</strong> {userRole}</p>
        <nav>
          <ul>
            <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
            <li onClick={() => setActivePage("courses")}>My Courses</li>
            {userRole === "teacher" && (
              <li onClick={() => setActivePage("wallet")}>Wallet / Withdraw</li>
            )}
          </ul>
        </nav>
        <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
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
            <p><strong>Role:</strong> {userRole}</p>
            <p><strong>Email:</strong> {userEmail}</p>
            {userRole === "teacher" && <p><strong>Wallet Balance:</strong> ₹{wallet}</p>}
          </>
        )}
        {activePage === "courses" &&
          (userRole === "student"
            ? renderStudentCourses()
            : renderTeacherCourses())}
        {activePage === "wallet" &&
          userRole === "teacher" &&
          renderWallet()}
      </main>
    </div>
  );
};

export default Dashboard;
