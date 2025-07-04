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
  const [skipped, setSkipped] = useState(false);
  const [joinMessage, setJoinMessage] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
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

  // List of all available courses (from CourseCards.js, simplified)
  const availableCourses = [
    { id: 'wisechild-elementary', name: 'WiseChild Package Elementary', age: '3+', sessions: 32, description: 'BIS Certified Kit, 1:1 Live Classes by IIT/NIT Experts, STEM.org Accreditation', duration: '3 months', route: '/wise-child' },
    { id: 'wisechild-intermediate', name: 'WiseChild Package Intermediate', age: '3+', sessions: 64, description: 'BIS Certified Kit, 1:1 Live Classes by IIT/NIT Experts, STEM.org Accreditation', duration: '6 months', route: '/wise-child' },
    { id: 'wisechild-advanced', name: 'WiseChild Package Advanced', age: '3+', sessions: 96, description: 'BIS Certified Kit, 1:1 Live Classes by IIT/NIT Experts, STEM.org Accreditation', duration: '9 months', route: '/wise-child' },
    { id: 'alpha-a', name: 'Alpha A', age: '6+', sessions: 32, description: 'BIS Certified Kit, 1:1 Live Classes by IIT/NIT Experts, STEM.org Accreditation', duration: '3 months', route: '/alpha-series' },
    { id: 'alpha-b', name: 'Alpha B', age: '6+', sessions: 64, description: 'BIS Certified Kit, 1:1 Live Classes by IIT/NIT Experts, STEM.org Accreditation', duration: '6 months', route: '/alpha-series' },
    { id: 'alpha-c', name: 'Alpha C', age: '6+', sessions: 96, description: 'BIS Certified Kit, 1:1 Live Classes by IIT/NIT Experts, STEM.org Accreditation', duration: '9 months', route: '/alpha-series' },
    { id: 'alpha-x', name: 'Alpha X', age: '6+', sessions: 96, description: 'BIS Certified Kit, 1:1 Live Classes by IIT/NIT Experts, STEM.org Accreditation', duration: '9 months', route: '/alpha-series' },
    { id: 'starter', name: 'Starter', age: '8+', sessions: 30, description: 'BIS Certified Kit, 1:1 Live Classes by IIT/NIT Experts, STEM.org Accreditation', duration: '3 months', route: '/pioneer-package' },
    { id: 'pioneer', name: 'Pioneer', age: '8+', sessions: 60, description: 'BIS Certified Kit, 1:1 Live Classes by IIT/NIT Experts, STEM.org Accreditation', duration: '6 months', route: '/pioneer-package' },
    { id: 'adventure', name: 'Adventure', age: '8+', sessions: 100, description: 'BIS Certified Kit, 1:1 Live Classes by IIT/NIT Experts, STEM.org Accreditation', duration: '9 months', route: '/pioneer-package' },
    { id: 'drone', name: 'Drone Programming', age: '10+', sessions: 36, description: 'Drone Hardware, Basic Drone Programming', duration: '2 months', route: '/drone-package' },
    { id: 'defender', name: 'AI and IoT Applications', age: '10+', sessions: 50, description: 'WiseKit Platform, AI & IoT Integration', duration: '3 months', route: '/defender-wisekit' },
    { id: 'iot-mastery', name: 'IoT Mastery and AI/ML Integration Projects', age: '12+', sessions: 50, description: 'IoT Projects, Embedded Systems', duration: '3 months', route: '/iot-master-package' },
    { id: 'ml-basics', name: 'Machine Learning', age: '12+', sessions: 100, description: 'ML Algorithms, Python Integration', duration: '6 months', route: '/aiml-master-package' },
  ];

  // Age groups for selection
  const ageGroups = [
    { label: '3-5', value: '3' },
    { label: '6-9', value: '6' },
    { label: '10-11', value: '10' },
    { label: '12+', value: '12' },
  ];

  // Filter courses by selected age
  const filteredCourses = selectedAge
    ? availableCourses.filter(c => {
        const ageNum = parseInt(c.age);
        return ageNum <= parseInt(selectedAge);
      })
    : [];

  // If already enrolled, show message
  if (enrolledCourses.length > 0) {
    return (
      <div className="student-dashboard-modern">
        <header className="dashboard-header">
          <h2>Student Dashboard</h2>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </header>
        <main className="dashboard-content">
          <div className="dashboard-card courses-card">
            <h3>Already enrolled in a course.</h3>
            <ul className="courses-list">
              {enrolledCourses.map(c => (
                <li key={c.courseId || c.id} className="course-item">
                  <div className="course-title">{c.title}</div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    );
  }

  // If no courses joined, show age selection first
  if (enrolledCourses.length === 0 && !skipped) {
    return (
      <div className="student-dashboard-modern">
        <header className="dashboard-header">
          <h2>Student Dashboard</h2>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </header>
        <main className="dashboard-content">
          <div className="dashboard-card courses-card">
            <h3>Select Your Age Group</h3>
            <div style={{ marginBottom: 20 }}>
              {ageGroups.map(a => (
                <button
                  key={a.value}
                  className={`age-btn${selectedAge === a.value ? ' selected' : ''}`}
                  style={{ marginRight: 10, marginBottom: 10 }}
                  onClick={() => setSelectedAge(a.value)}
                >
                  {a.label}
                </button>
              ))}
            </div>
            {selectedAge && (
              <>
                <h3>Available Courses</h3>
                {joinMessage && <div className="join-message">{joinMessage}</div>}
                <ul className="courses-list">
                  {filteredCourses.map(c => (
                    <li key={c.id} className="course-item">
                      <div className="course-title">{c.name} <span style={{fontSize:12, color:'#93339e'}}>({c.age})</span></div>
                      <div className="course-desc">{c.description}</div>
                      <div className="course-sessions">Sessions: {c.sessions} | Duration: {c.duration}</div>
                      <button className="join-btn" onClick={() => navigate(c.route)}>Join</button>
                    </li>
                  ))}
                </ul>
                <button className="skip-btn" style={{marginTop: 20}} onClick={() => setSkipped(true)}>Skip</button>
              </>
            )}
          </div>
        </main>
      </div>
    );
  }

  // If courses joined, or skipped, show class/session breakdown for each
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
          {enrolledCourses.length === 0 && skipped && (
            <div className="dashboard-card courses-card">
              <h3>No Courses Joined</h3>
              <p>You have not joined any courses yet. You can join a course anytime from the courses section.</p>
            </div>
          )}
          {enrolledCourses.length > 0 && (
            <div className="dashboard-card courses-card">
              <h3>My Courses</h3>
              <ul className="courses-list">
                {enrolledCourses.map(c => (
                  <li key={c.courseId || c.id} className="course-item" onClick={() => { setSelectedCourse(c); setCourseModalOpen(true); }}>
                    <div className="course-title">{c.title}</div>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${c.progress || 0}%` }}></div>
                    </div>
                    <span className="progress-label">{c.progress || 0}%</span>
                    {/* Show class/session breakdown if available */}
                    {Array.isArray(c.sessions) && c.sessions.length > 0 && (
                      <ul className="session-breakdown">
                        {c.sessions.map((s, idx) => (
                          <li key={idx} className="session-item">
                            <span className="session-title">Class {idx + 1}: {s.topic}</span> <span className="session-date">{s.date}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
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