import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import "./AdminManagement.css";

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
  }, []);

  const fetchClasses = async () => {
    try {
      const classesSnapshot = await getDocs(collection(db, "classes"));
      const classesList = classesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClasses(classesList);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const teachersQuery = query(collection(db, "users"), where("role", "==", "teacher"));
      const teachersSnapshot = await getDocs(teachersQuery);
      const teachersList = teachersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTeachers(teachersList);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleCreateClass = async (classData) => {
    try {
      const newClass = {
        ...classData,
        createdAt: new Date().toISOString(),
        status: 'active',
        studentCount: 0,
        enrolledStudents: []
      };
      
      const docRef = await addDoc(collection(db, "classes"), newClass);
      setClasses([...classes, { id: docRef.id, ...newClass }]);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  const handleUpdateClass = async (updatedData) => {
    try {
      await updateDoc(doc(db, "classes", selectedClass.id), updatedData);
      setClasses(classes.map(cls => 
        cls.id === selectedClass.id ? { ...cls, ...updatedData } : cls
      ));
      setShowEditModal(false);
      setSelectedClass(null);
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  const handleDeleteClass = async (classId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await deleteDoc(doc(db, "classes", classId));
        setClasses(classes.filter(cls => cls.id !== classId));
      } catch (error) {
        console.error("Error deleting class:", error);
      }
    }
  };

  const handleStatusToggle = async (classId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await updateDoc(doc(db, "classes", classId), { status: newStatus });
      setClasses(classes.map(cls => 
        cls.id === classId ? { ...cls, status: newStatus } : cls
      ));
    } catch (error) {
      console.error("Error updating class status:", error);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading classes...</p>
      </div>
    );
  }

  return (
    <div className="admin-management">
      <div className="admin-header">
        <h1>Class Management</h1>
        <div className="header-actions">
          <button onClick={() => setShowCreateModal(true)} className="create-btn">
            + Create New Class
          </button>
          <button onClick={() => navigate('/dashboard/admin')} className="back-btn">
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="classes-grid">
        {classes.map((cls) => (
          <div key={cls.id} className="class-card">
            <div className="class-header">
              <h3>{cls.name}</h3>
              <span className={`status-badge ${cls.status}`}>
                {cls.status}
              </span>
            </div>
            <p className="class-description">{cls.description}</p>
            <div className="class-details">
              <p><strong>Teacher:</strong> {cls.teacherName || 'Unassigned'}</p>
              <p><strong>Students:</strong> {cls.studentCount || 0}</p>
              <p><strong>Duration:</strong> {cls.duration || 'N/A'}</p>
              <p><strong>Created:</strong> {new Date(cls.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="class-actions">
              <button 
                className="edit-btn"
                onClick={() => {
                  setSelectedClass(cls);
                  setShowEditModal(true);
                }}
              >
                Edit
              </button>
              <button 
                className={`status-btn ${cls.status === 'active' ? 'deactivate' : 'activate'}`}
                onClick={() => handleStatusToggle(cls.id, cls.status)}
              >
                {cls.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDeleteClass(cls.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <CreateClassModal
          teachers={teachers}
          onCreate={handleCreateClass}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {showEditModal && selectedClass && (
        <EditClassModal
          classData={selectedClass}
          teachers={teachers}
          onUpdate={handleUpdateClass}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

const CreateClassModal = ({ teachers, onCreate, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    teacherId: '',
    duration: '',
    maxStudents: 20,
    price: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const teacher = teachers.find(t => t.id === formData.teacherId);
    onCreate({
      ...formData,
      teacherName: teacher ? teacher.name : 'Unassigned'
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Class</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Class Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Teacher:</label>
            <select
              value={formData.teacherId}
              onChange={(e) => setFormData({...formData, teacherId: e.target.value})}
            >
              <option value="">Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Duration:</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                placeholder="e.g., 8 weeks"
              />
            </div>
            <div className="form-group">
              <label>Max Students:</label>
              <input
                type="number"
                value={formData.maxStudents}
                onChange={(e) => setFormData({...formData, maxStudents: parseInt(e.target.value)})}
                min="1"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Price (₹):</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
              min="0"
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="save-btn">Create Class</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditClassModal = ({ classData, teachers, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: classData.name || '',
    description: classData.description || '',
    teacherId: classData.teacherId || '',
    duration: classData.duration || '',
    maxStudents: classData.maxStudents || 20,
    price: classData.price || 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const teacher = teachers.find(t => t.id === formData.teacherId);
    onUpdate({
      ...formData,
      teacherName: teacher ? teacher.name : 'Unassigned'
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Class</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Class Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Teacher:</label>
            <select
              value={formData.teacherId}
              onChange={(e) => setFormData({...formData, teacherId: e.target.value})}
            >
              <option value="">Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Duration:</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                placeholder="e.g., 8 weeks"
              />
            </div>
            <div className="form-group">
              <label>Max Students:</label>
              <input
                type="number"
                value={formData.maxStudents}
                onChange={(e) => setFormData({...formData, maxStudents: parseInt(e.target.value)})}
                min="1"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Price (₹):</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
              min="0"
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassManagement; 