import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Dashboard.css"; // Include CSS for layout & sidebar

const dummyCourses = [
  {
    id: 1,
    title: "React for Beginners",
    teacher: "teacher@example.com",
    enrolledStudents: 40,
    status: "ongoing",
    quiz: [
      {
        question: "What is JSX?",
        options: ["XML in JS", "CSS Library"],
        answer: "XML in JS",
      },
    ],
    completed: false,
  },
  {
    id: 2,
    title: "Data Structures in C++",
    teacher: "teacher@example.com",
    enrolledStudents: 55,
    status: "upcoming",
    quiz: [],
    completed: false,
  },
];

const Dashboard = () => {
  const { state } = useLocation();
  const [wallet, setWallet] = useState(0);
  const [courses, setCourses] = useState(dummyCourses);
  const [activePage, setActivePage] = useState("dashboard");
  const [withdrawRequested, setWithdrawRequested] = useState(false);

  const handleCompleteClass = (courseId) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId && !course.completed
          ? { ...course, completed: true }
          : course
      )
    );
    setWallet((prev) => prev + 100); // Earn ₹100
  };

  const handleWithdraw = () => {
    setWithdrawRequested(true);
    // Here you would send API call to backend to register the withdraw
  };

  const renderStudentCourses = () => (
    <div>
      <h3>Live Courses Enrolled</h3>
      {courses.map((course) => (
        <div key={course.id} className="course-card">
          <h4>{course.title}</h4>
          <p>Status: {course.status}</p>
          <p>Instructor: {course.teacher}</p>
          {course.quiz.length > 0 && (
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
      <button onClick={handleWithdraw} disabled={withdrawRequested}>
        Request Withdraw
      </button>
      {withdrawRequested && (
        <p style={{ color: "green" }}>
          ✅ Withdraw request sent. You’ll receive your money in 7 days.
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
        <h2>{activePage === "dashboard" ? "Dashboard" : activePage === "courses" ? "Courses" : "Wallet"}</h2>
        {activePage === "dashboard" && (
          <>
            <p><strong>Role:</strong> {state?.role}</p>
          </>
        )}

        {activePage === "courses" &&
          (state?.role === "student" ? renderStudentCourses() : renderTeacherCourses())}

        {activePage === "wallet" && state?.role === "teacher" && renderWallet()}
      </main>
    </div>
  );
};

export default Dashboard;