import React, { useEffect, useState } from 'react';

const StudentJoinCourse = ({ userEmail, onCourseJoined }) => {
  const [courses, setCourses] = useState([]);
  const [joined, setJoined] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data));
    // Fetch joined courses for the student
    fetch(`http://localhost:5000/api/courses/student/${userEmail}`)
      .then(res => res.json())
      .then(data => setJoined(data.map(c => c.id)));
  }, [userEmail]);

  const handleJoin = async (courseId) => {
    await fetch('http://localhost:5000/api/courses/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, courseId }),
    });
    setJoined([...joined, courseId]);
    onCourseJoined && onCourseJoined();
  };

  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <strong>{course.title}</strong>
            <button
              disabled={joined.includes(course.id)}
              onClick={() => handleJoin(course.id)}
            >
              {joined.includes(course.id) ? 'Joined' : 'Join'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentJoinCourse;