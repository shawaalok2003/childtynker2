import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentDashboard = ({ userEmail }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/dashboard/student/${userEmail}`)
      .then(res => setStudent(res.data))
      .catch(err => console.error(err));
  }, [userEmail]);

  if (!student) return <p>Loading...</p>;
  return (
    <div className="container">
      <h2>Student Dashboard</h2>

      <section>
        <h3>Profile</h3>
        <button>Edit</button>
        <p>Name: {student.profile.name}</p>
        <p>Guardian: {student.profile.guardian}</p>
        <p>Phone: {student.profile.phone}</p>
      </section>

      <section>
        <h3>Courses</h3>
        <ul>
          {student.enrolledCourses.map(c => (
            <li key={c.courseId}>
              {c.title} – Progress: {c.progress}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Upcoming Sessions</h3>
        <ul>
          {student.schedule.map(s => (
            <li key={s.sessionId}>
              {s.course} – {s.date} @ {s.time}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
export default StudentDashboard;