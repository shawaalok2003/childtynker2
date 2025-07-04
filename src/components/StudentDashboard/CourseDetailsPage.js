import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (!userEmail) {
      setError('User not logged in.');
      setLoading(false);
      return;
    }
    fetch(`https://childtynker-backend-3.onrender.com/api/dashboard/student/${userEmail}`)
      .then(res => res.json())
      .then(data => {
        const enrolled = Array.isArray(data.enrolledCourses) ? data.enrolledCourses : [];
        const found = enrolled.find(c => (c.courseId || c.id) === courseId);
        if (found) {
          setCourse(found);
        } else {
          setError('Course not found or not enrolled.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch course details.');
        setLoading(false);
      });
  }, [courseId, userEmail]);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-loading">{error}</div>;
  if (!course) return null;

  return (
    <div className="student-dashboard-modern">
      <header className="dashboard-header">
        <h2>{course.title} Details</h2>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem('userEmail');
          navigate('/login');
        }}>Logout</button>
        <button className="back-btn" onClick={() => navigate(-1)} style={{marginLeft: 10}}>Back</button>
      </header>
      <main className="dashboard-content">
        <div className="dashboard-card">
          <p><strong>Progress:</strong> {course.progress || 0}%</p>
          <h4>Assignments</h4>
          <ul>
            {course.assignments?.length > 0 ? course.assignments.map((a, i) => (
              <li key={i}>{a.title} {a.completed ? '✅' : '❌'}</li>
            )) : <li>No assignments.</li>}
          </ul>
          <h4>Sessions</h4>
          <ul>
            {course.sessions?.length > 0 ? course.sessions.map((s, i) => (
              <li key={i}>{s.date} @ {s.time} - {s.topic}</li>
            )) : <li>No sessions.</li>}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default CourseDetailsPage; 