// AdminPanel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ADMIN_PASSWORD = "Childtynker@admin1234"; // Change this to a secure password

const AdminPanel = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", teacher: "", description: "" });
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [classList, setClassList] = useState([]);
  const [classForm, setClassForm] = useState({ date: "", time: "", topic: "", meetLink: "" });
  const [students, setStudents] = useState([]);
  const [allot, setAllot] = useState({ studentEmail: "", courseId: "" });
  const [allotMessage, setAllotMessage] = useState("");

  // Admin auth state
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("adminAuthenticated") === "true"
  );
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Password check
  const handleAuth = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      setAuthError("");
    } else {
      setAuthError("Incorrect password");
    }
  };

  const fetchWithdrawals = async () => {
    const res = await axios.get("https://childtynker-backend-3.onrender.com/api/withdrawals");
    setWithdrawals(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get("https://childtynker-backend-3.onrender.com/api/users");
    setUsers(res.data.filter((u) => u.role === "teacher"));
  };

  const fetchCourses = async () => {
    const res = await axios.get("https://childtynker-backend-3.onrender.com/api/courses?all=true");
    setCourses(res.data);
  };

  const updateStatus = async (email, requestedAt, status) => {
    await axios.post("https://childtynker-backend-3.onrender.com/api/withdrawals/update", { email, requestedAt, status });
    fetchWithdrawals();
  };

  const handleCreateCourse = async () => {
    await axios.post("https://childtynker-backend-3.onrender.com/api/create-course", newCourse);
    fetchCourses();
    setNewCourse({ title: "", teacher: "", description: "" });
  };

  // Fetch classes for editing
  const fetchClasses = async (courseId) => {
    const res = await axios.get(`https://childtynker-backend-3.onrender.com/api/courses/${courseId}/classes`);
    setClassList(res.data);
    setEditingCourseId(courseId);
  };

  // Add or update a class in the list
  const addOrUpdateClass = () => {
    setClassList((prev) => [
      ...prev.filter((c, i) => i !== classForm.editIndex),
      { date: classForm.date, time: classForm.time, topic: classForm.topic, meetLink: classForm.meetLink }
    ]);
    setClassForm({ date: "", time: "", topic: "", meetLink: "" });
  };

  // Save all classes to backend
  const saveClasses = async () => {
    await axios.post(`https://childtynker-backend-3.onrender.com/api/courses/${editingCourseId}/classes`, { classes: classList });
    setEditingCourseId(null);
    setClassList([]);
    fetchCourses();
  };

  // Fetch students
  const fetchStudents = async () => {
    const res = await axios.get("https://childtynker-backend-3.onrender.com/api/users");
    setStudents(res.data.filter((u) => u.role === "student"));
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchWithdrawals();
      fetchUsers();
      fetchCourses();
      fetchStudents();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const handleAllotCourse = async () => {
    try {
      const res = await axios.post("https://childtynker-backend-3.onrender.com/api/admin/allot-course", allot);
      setAllotMessage(res.data.message);
      setAllot({ studentEmail: "", courseId: "" });
    } catch (err) {
      setAllotMessage(err.response?.data?.message || "Error allotting course");
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FAF8F0"
      }}>
        <form
          onSubmit={handleAuth}
          style={{
            background: "#fff",
            padding: "40px 32px",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(147, 51, 158, 0.10)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h2 style={{ color: "#93339e", marginBottom: 24 }}>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1.5px solid #e0d7ee",
              marginBottom: "18px",
              fontSize: "1.05rem",
              width: "220px"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 32px",
              background: "linear-gradient(90deg, #93339e 60%, #e850f9 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "1.1rem",
              cursor: "pointer"
            }}
          >
            Login
          </button>
          {authError && <p style={{ color: "#e8505b", marginTop: 12 }}>{authError}</p>}
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel</h2>

      <div>
        <h3>Create Course</h3>
        <input
          type="text"
          placeholder="Title"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
        />
        <select
          value={newCourse.teacher}
          onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
        >
          <option value="">Select Teacher</option>
          {users.map((u, i) => (
            <option key={i} value={u.email}>
              {u.email}
            </option>
          ))}
        </select>
        <button onClick={handleCreateCourse}>Create Course</button>
      </div>

      <div>
        <h3>Withdrawal Requests</h3>
        {withdrawals.length === 0 ? (
          <p>No withdrawal requests.</p>
        ) : (
          withdrawals.map((w, i) => (
            <div key={i} style={{ border: "1px solid gray", margin: "10px 0", padding: 10 }}>
              <p>Email: {w.email}</p>
              <p>Amount: ₹{w.amount}</p>
              <p>Status: {w.status}</p>
              <p>Requested: {new Date(w.requestedAt).toLocaleString()}</p>
              {w.status === "pending" && (
                <>
                  <button onClick={() => updateStatus(w.email, w.requestedAt, "approved")}>Approve</button>
                  <button onClick={() => updateStatus(w.email, w.requestedAt, "rejected")}>Reject</button>
                </>
              )}
            </div>
          ))
        )}
      </div>

      <div>
        <h3>Courses</h3>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {course.title} ({course.teacher})
              <button onClick={() => fetchClasses(course.id)}>Edit Classes</button>
            </li>
          ))}
        </ul>
      </div>

      {editingCourseId && (
        <div style={{ border: "1px solid #93339e", padding: 16, margin: 16 }}>
          <h4>Edit Classes for Course</h4>
          <input
            type="date"
            value={classForm.date}
            onChange={e => setClassForm({ ...classForm, date: e.target.value })}
          />
          <input
            type="time"
            value={classForm.time}
            onChange={e => setClassForm({ ...classForm, time: e.target.value })}
          />
          <input
            type="text"
            placeholder="Topic"
            value={classForm.topic}
            onChange={e => setClassForm({ ...classForm, topic: e.target.value })}
          />
          <input
            type="text"
            placeholder="Google Meet Link"
            value={classForm.meetLink}
            onChange={e => setClassForm({ ...classForm, meetLink: e.target.value })}
          />
          <button onClick={addOrUpdateClass}>Add/Update Class</button>
          <ul>
            {classList.map((c, i) => (
              <li key={i}>
                {c.date} {c.time} - {c.topic} - <a href={c.meetLink} target="_blank" rel="noopener noreferrer">Meet Link</a>
              </li>
            ))}
          </ul>
          <button onClick={saveClasses}>Save All Classes</button>
          <button onClick={() => setEditingCourseId(null)}>Cancel</button>
        </div>
      )}

      <div>
        <h3>Allot Course to Student</h3>
        <select
          value={allot.studentEmail}
          onChange={e => setAllot({ ...allot, studentEmail: e.target.value })}
        >
          <option value="">Select Student</option>
          {students.map((s, i) => (
            <option key={i} value={s.email}>
              {s.profile?.name ? `${s.profile.name} (${s.email})` : s.email}
            </option>
          ))}
        </select>
        <select
          value={allot.courseId}
          onChange={e => setAllot({ ...allot, courseId: e.target.value })}
        >
          <option value="">Select Course</option>
          {courses.map((c, i) => (
            <option key={i} value={c.id}>
              {c.title} {/* e.g. WiseChild Package Elementary */}
            </option>
          ))}
        </select>
        <button onClick={handleAllotCourse}>Allot Course</button>
        {allotMessage && <div>{allotMessage}</div>}
      </div>

      {allot.courseId && (
        <div style={{ marginTop: 24 }}>
          <h4>Allot Daily Class Schedules for Selected Course</h4>
          <button onClick={() => fetchClasses(allot.courseId)}>Edit/View Class Schedules</button>
          {editingCourseId === allot.courseId && (
            <div style={{ border: "1px solid #93339e", padding: 16, margin: 16 }}>
              <h4>Edit Classes for {courses.find(c => c.id === editingCourseId)?.title}</h4>
              <input
                type="date"
                value={classForm.date}
                onChange={e => setClassForm({ ...classForm, date: e.target.value })}
              />
              <input
                type="time"
                value={classForm.time}
                onChange={e => setClassForm({ ...classForm, time: e.target.value })}
              />
              <input
                type="text"
                placeholder="Topic"
                value={classForm.topic}
                onChange={e => setClassForm({ ...classForm, topic: e.target.value })}
              />
              <input
                type="text"
                placeholder="Google Meet Link"
                value={classForm.meetLink}
                onChange={e => setClassForm({ ...classForm, meetLink: e.target.value })}
              />
              <button onClick={addOrUpdateClass}>Add/Update Class</button>
              <ul>
                {classList.map((c, i) => (
                  <li key={i}>
                    {c.date} {c.time} - {c.topic} - <a href={c.meetLink} target="_blank" rel="noopener noreferrer">Meet Link</a>
                  </li>
                ))}
              </ul>
              <button onClick={saveClasses}>Save All Classes</button>
              <button onClick={() => setEditingCourseId(null)}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
