import React from 'react';
import './StudentDashboard.css';

const CourseDetailsModal = ({ course, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>{course.title} Details</h3>
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
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default CourseDetailsModal; 