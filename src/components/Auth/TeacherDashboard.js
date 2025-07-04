import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherDashboard = ({ userEmail }) => {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    axios.get(`https://childtynker-backend-3.onrender.com/api/dashboard/teacher/${userEmail}`)
      .then(res => setTeacher(res.data))
      .catch(err => console.error(err));
  }, [userEmail]);

  if (!teacher) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Teacher Dashboard</h2>

      <section>
        <h3>Profile</h3>
        <button>Edit</button>
        <p>Name: {teacher.profile.name}</p>
        <p>Email: {teacher.email}</p>
        <p>Phone: {teacher.profile.phone}</p>
      </section>

      <section>
        <h3>Upcoming Classes</h3>
        <ul>
          {teacher.upcomingClasses.map(c => (
            <li key={c.classId}>
              <strong>{c.title}</strong> – {c.date} – {c.students} students
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TeacherDashboard;