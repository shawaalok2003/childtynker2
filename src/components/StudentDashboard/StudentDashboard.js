import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentProfileModal from './StudentProfileModal';
import CourseDetailsModal from './CourseDetailsModal';
import './StudentDashboard.css';

const JoinCourseModal = ({ open, onClose, userEmail, onJoin }) => {
  const [courses, setCourses] = useState([]);
  const [joining, setJoining] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (open) {
      fetch('https://childtynker-backend-3.onrender.com/api/courses')
        .then(res => res.json())
        .then(data => setCourses(data));
    }
  }, [open]);

  const handleJoin = async (courseId) => {
    setJoining(true);
    setMessage('');
    const res = await fetch('https://childtynker-backend-3.onrender.com/api/dashboard/student/join-course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, courseId })
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Enrolled successfully!');
      onJoin && onJoin();
    } else {
      setMessage(data.message || 'Error joining course');
    }
    setJoining(false);
  };

  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content join-course-modal">
        <h3>Join a Course</h3>
        {message && <div className="join-message">{message}</div>}
        <ul className="courses-list">
          {courses.map(c => (
            <li key={c.id} className="course-item">
              <div className="course-title">{c.title}</div>
              <button className="join-btn" onClick={() => handleJoin(c.id)} disabled={joining}>
                Join
              </button>
            </li>
          ))}
        </ul>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const StudentDashboard = ({ userEmail, onLogout }) => {
  const [student, setStudent] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail) {
      navigate('/login');
      return;
    }
    fetch(`https://childtynker-backend-3.onrender.com/api/dashboard/student/${userEmail}`)
      .then(res => res.json())
      .then(data => setStudent(data));
  }, [userEmail, navigate]);

  const handleProfileSave = (updatedProfile) => {
    setStudent(prev => ({ ...prev, profile: updatedProfile }));
    setProfileModalOpen(false);
  };

  const refreshStudent = () => {
    fetch(`https://childtynker-backend-3.onrender.com/api/dashboard/student/${userEmail}`)
      .then(res => res.json())
      .then(data => setStudent(data));
  };

  if (!userEmail) {
    return <div className="dashboard-loading">Please log in again.</div>;
  }
  if (!student) return <div className="dashboard-loading">Loading...</div>;

  // Defensive: fallback if profile is missing
  const profile = student.profile || { name: '', guardian: '', phone: '' };
  const enrolledCourses = Array.isArray(student.enrolledCourses) ? student.enrolledCourses : [];
  const schedule = Array.isArray(student.schedule) ? student.schedule : [];
  const quizzes = Array.isArray(student.quizzes) ? student.quizzes : [];

  return (
    <div className="student-dashboard-modern">
      <header className="dashboard-header">
        <h2>Student Dashboard</h2>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </header>
      <div className="dashboard-main-grid">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <button className="sidebar-btn" onClick={() => setProfileModalOpen(true)}>Profile</button>
        </aside>
        {/* Main Content */}
        <main className="dashboard-content">
          <div className="dashboard-cards-row">
            <div className="dashboard-card profile-card">
              <h3>Profile <button className="edit-btn" onClick={() => setProfileModalOpen(true)}>Edit</button></h3>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Guardian:</strong> {profile.guardian}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
            </div>
            <div className="dashboard-card wallet-card">
              <h3>Wallet / Points</h3>
              <div className="wallet-balance">₹{student.wallet || 0}</div>
            </div>
          </div>
          <div className="dashboard-card courses-card">
  <h3>My Courses</h3>
  <ul className="courses-list">
    {enrolledCourses.length === 0 ? (
      <li>No courses assigned yet.</li>
    ) : (
      enrolledCourses.map(c => (
        <li key={c.courseId || c.id} className="course-item" onClick={() => { setSelectedCourse(c); setCourseModalOpen(true); }}>
          <div className="course-title">{c.title}</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${c.progress || 0}%` }}></div>
          </div>
          <span className="progress-label">{c.progress || 0}%</span>
        </li>
      ))
    )}
  </ul>
</div>
          <div className="dashboard-card sessions-card">
            <h3>Upcoming Sessions</h3>
            <ul className="sessions-list">
              {schedule.length === 0 ? <li>No upcoming sessions.</li> : schedule.map(s => (
                <li key={s.sessionId || s.date}>
                  <span className="session-title">{s.course}</span> – <span>{s.date} @ {s.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="dashboard-card quizzes-card">
            <h3>Quizzes & Assignments</h3>
            <div className="quiz-section">
              <strong>Pending:</strong>
              <ul>
                {quizzes.filter(q => !q.completed).length === 0 ? <li>None</li> : quizzes.filter(q => !q.completed).map(q => (
                  <li key={q.id}>
                    {q.title}
                    <button
                      className="save-btn"
                      style={{ marginLeft: 10, fontSize: 12, padding: '4px 10px' }}
                      onClick={async () => {
                        await fetch('https://childtynker-backend-3.onrender.com/api/dashboard/student/complete-quiz', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email: userEmail, quizId: q.id }),
                        });
                        setStudent(prev => ({
                          ...prev,
                          quizzes: prev.quizzes.map(quiz => quiz.id === q.id ? { ...quiz, completed: true } : quiz)
                        }));
                      }}
                    >Mark as Complete</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="quiz-section">
              <strong>Completed:</strong>
              <ul>
                {quizzes.filter(q => q.completed).length === 0 ? <li>None</li> : quizzes.filter(q => q.completed).map(q => (
                  <li key={q.id}>{q.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
      {/* Profile Edit Modal */}
      {profileModalOpen && (
        <StudentProfileModal
          profile={student.profile}
          userEmail={userEmail}
          onSave={handleProfileSave}
          onClose={() => setProfileModalOpen(false)}
        />
      )}
      {/* Course Details Modal */}
      {courseModalOpen && selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={() => setCourseModalOpen(false)}
        />
      )}
    </div>
  );
};

export default StudentDashboard;