import React, { useState } from 'react';
import './StudentDashboard.css';

const StudentProfileModal = ({ profile, userEmail, onSave, onClose }) => {
  // Defensive: fallback if profile is missing
  const safeProfile = profile || { name: '', guardian: '', phone: '' };
  const [form, setForm] = useState(safeProfile);
  const [saving, setSaving] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    await fetch('http://localhost:5000/api/dashboard/student/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, profile: form }),
    });
    setSaving(false);
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Profile</h3>
        <form onSubmit={handleSubmit} className="profile-form">
          <label>Name:<input name="name" value={form.name} onChange={handleChange} required /></label>
          <label>Guardian:<input name="guardian" value={form.guardian} onChange={handleChange} required /></label>
          <label>Phone:<input name="phone" value={form.phone} onChange={handleChange} required /></label>
          <div className="modal-actions">
            <button type="submit" className="save-btn" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentProfileModal; 