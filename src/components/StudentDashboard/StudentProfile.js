import React, { useState } from 'react';

const StudentProfile = ({ student, onUpdate }) => {
  const [form, setForm] = useState(student.profile || { name: '', guardian: '', phone: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/profile/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: student.email, profile: form }),
    });
    onUpdate && onUpdate(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: <input name="name" value={form.name} onChange={handleChange} /></label>
      <label>Guardian: <input name="guardian" value={form.guardian} onChange={handleChange} /></label>
      <label>Phone: <input name="phone" value={form.phone} onChange={handleChange} /></label>
      <button type="submit">Save</button>
    </form>
  );
};

export default StudentProfile;
