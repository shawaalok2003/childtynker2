import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const TeacherDashboard = ({ userEmail }) => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [courses, setCourses] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [activePage, setActivePage] = useState("dashboard");
  const [withdrawRequested, setWithdrawRequested] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [lastWithdrawal, setLastWithdrawal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get user email from prop or localStorage
  const teacherEmail = userEmail || localStorage.getItem('userEmail');

  useEffect(() => {
    // If no user email, redirect to login
    if (!teacherEmail) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError("");

    // Fetch teacher data using existing endpoints
    const fetchTeacherData = async () => {
      try {
        // Get teacher profile from users
        const usersRes = await axios.get("https://childtynker-backend-3.onrender.com/api/users");
        const teacherUser = usersRes.data.find(u => u.email === teacherEmail && u.role === "teacher");
        
        if (!teacherUser) {
          setError("Teacher not found");
          setLoading(false);
          return;
        }

        // Get teacher's courses
        const coursesRes = await axios.get(`https://childtynker-backend-3.onrender.com/api/courses/teacher/${teacherEmail}`);
        
        // Get teacher wallet info
        const walletRes = await axios.get(`https://childtynker-backend-3.onrender.com/api/teacher-wallet/${teacherEmail}`);

        setTeacher(teacherUser);
        setCourses(coursesRes.data);
        setWallet(teacherUser.wallet || 0);
        setLastWithdrawal(walletRes.data.lastWithdrawal || null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching teacher data:", err);
        setError("Failed to load teacher dashboard. Please try again.");
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [teacherEmail, navigate]);

  const handleCompleteClass = async (courseId) => {
    try {
      const res = await axios.post("https://childtynker-backend-3.onrender.com/api/complete-class", {
        email: teacherEmail,
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
      email: teacherEmail,
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

  const renderUpcomingClasses = () => {
    // Create upcoming classes from courses
    const upcomingClasses = courses.map(course => ({
      classId: course.id,
      title: course.title,
      date: course.schedule || "TBD",
      students: course.enrolledStudents || 0
    }));

    return (
      <div>
        <h3>Upcoming Classes</h3>
        {upcomingClasses.length > 0 ? (
          <ul>
            {upcomingClasses.map(c => (
              <li key={c.classId}>
                <strong>{c.title}</strong> – {c.date} – {c.students} students
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming classes scheduled.</p>
        )}
      </div>
    );
  };

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
          <h2>Loading Teacher Dashboard...</h2>
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

  if (!teacher) {
    return (
      <div className="dashboard-wrapper">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>No Teacher Data Found</h2>
          <p>Unable to load teacher information.</p>
          <button onClick={handleLogout}>Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <h3>Welcome Teacher</h3>
        <p>{teacherEmail}</p>
        <p><strong>Role:</strong> Teacher</p>
        <nav>
          <ul>
            <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
            <li onClick={() => setActivePage("courses")}>My Courses</li>
            <li onClick={() => setActivePage("classes")}>Upcoming Classes</li>
            <li onClick={() => setActivePage("wallet")}>Wallet / Withdraw</li>
          </ul>
        </nav>
        <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
      </aside>

      <main className="dashboard-main">
        <h2>
          {activePage === "dashboard"
            ? "Teacher Dashboard"
            : activePage === "courses"
            ? "My Courses"
            : activePage === "classes"
            ? "Upcoming Classes"
            : "Wallet"}
        </h2>
        
        {activePage === "dashboard" && (
          <>
            <p><strong>Role:</strong> Teacher</p>
            <p><strong>Email:</strong> {teacherEmail}</p>
            <p><strong>Name:</strong> {teacher.profile?.name || 'Not set'}</p>
            <p><strong>Phone:</strong> {teacher.profile?.phone || 'Not set'}</p>
            <p><strong>Wallet Balance:</strong> ₹{wallet}</p>
            <p><strong>Total Courses:</strong> {courses.length}</p>
            <p><strong>Active Courses:</strong> {courses.filter(c => !c.completed).length}</p>
          </>
        )}
        
        {activePage === "courses" && renderTeacherCourses()}
        {activePage === "classes" && renderUpcomingClasses()}
        {activePage === "wallet" && renderWallet()}
      </main>
    </div>
  );
};

export default TeacherDashboard;