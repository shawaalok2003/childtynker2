import React, { useEffect, useState } from 'react';
import CourseDetailsModal from './CourseDetailsModal';

const StudentCourses = ({ userEmail }) => {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/student/${userEmail}`)
      .then(res => res.json())
      .then(data => setCourses(data));
  }, [userEmail]);

  return (
    <div>
      <h2>My Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id} onClick={() => setSelected(course)}>
            <strong>{course.title}</strong> - Progress: {course.progress || 0}%
          </li>
        ))}
      </ul>
      {selected && (
        <CourseDetailsModal course={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default StudentCourses;