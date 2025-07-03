import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboardLayout = () => (
  <div className="student-dashboard-layout">
    <aside className="student-sidebar">
      <h2>Student</h2>
      <NavLink to="/dashboard/student/home">Dashboard</NavLink>
      <NavLink to="/dashboard/student/courses">My Courses</NavLink>
      <NavLink to="/dashboard/student/join">Join Course</NavLink>
      <NavLink to="/dashboard/student/quizzes">Quizzes</NavLink>
      <NavLink to="/dashboard/student/profile">Profile</NavLink>
      <NavLink to="/login" onClick={() => localStorage.clear()}>Logout</NavLink>
    </aside>
    <main className="student-main">
      <Outlet />
    </main>
  </div>
);

export default StudentDashboardLayout;