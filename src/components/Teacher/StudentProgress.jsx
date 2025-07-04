import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import "./TeacherManagement.css";

const StudentProgress = () => {
  const [student, setStudent] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentData();
  }, [studentId]);

  const fetchStudentData = async () => {
    try {
      // Get student data
      const studentDoc = await getDoc(doc(db, "users", studentId));
      if (studentDoc.exists()) {
        setStudent({ id: studentDoc.id, ...studentDoc.data() });
      }

      // Get student's enrolled classes
      const classesQuery = query(
        collection(db, "classes"),
        where("enrolledStudents", "array-contains", studentId)
      );
      const classesSnapshot = await getDocs(classesQuery);
      const classesList = classesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClasses(classesList);

    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProgress = async (updatedData) => {
    try {
      const studentRef = doc(db, "students", studentId);
      const studentDoc = await getDoc(studentRef);
      
      let currentProgress = {};
      if (studentDoc.exists()) {
        currentProgress = studentDoc.data().progress || {};
      }
      
      const newProgress = {
        ...currentProgress,
        [selectedClass.id]: updatedData
      };
      
      await updateDoc(studentRef, {
        progress: newProgress
      });
      
      setStudent(prev => ({
        ...prev,
        progress: newProgress
      }));
      
      setShowUpdateModal(false);
      setSelectedClass(null);
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const getProgressPercentage = (progress) => {
    if (!progress) return 0;
    const completed = progress.completedLessons || 0;
    const total = progress.totalLessons || 1;
    return Math.round((completed / total) * 100);
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'excellent';
    if (grade >= 80) return 'good';
    if (grade >= 70) return 'average';
    return 'needs-improvement';
  };

  if (loading) {
    return (
      <div className="teacher-loading">
        <div className="loading-spinner"></div>
        <p>Loading student data...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="teacher-management">
        <div className="error-message">
          <h2>Student not found</h2>
          <button onClick={() => navigate('/dashboard/teacher')} className="back-btn">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="teacher-management">
      <div className="teacher-header">
        <h1>Student Progress</h1>
        <button onClick={() => navigate('/dashboard/teacher')} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="student-overview">
        <div className="student-info">
          <h2>{student.name}</h2>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Phone:</strong> {student.phone || 'N/A'}</p>
          <p><strong>Joined:</strong> {new Date(student.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="student-stats">
          <div className="stat-card">
            <span className="stat-number">{classes.length}</span>
            <span className="stat-label">Enrolled Classes</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {Object.keys(student.progress || {}).length}
            </span>
            <span className="stat-label">Active Courses</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {Object.values(student.progress || {}).filter(p => p.completed).length}
            </span>
            <span className="stat-label">Completed Courses</span>
          </div>
        </div>
      </div>

      <div className="classes-progress">
        <h3>Class Progress</h3>
        
        {classes.length > 0 ? (
          <div className="classes-grid">
            {classes.map((cls) => {
              const progress = student.progress?.[cls.id] || {};
              const progressPercentage = getProgressPercentage(progress);
              
              return (
                <div key={cls.id} className="class-progress-card">
                  <div className="class-header">
                    <h4>{cls.name}</h4>
                    <span className={`status-badge ${cls.status}`}>
                      {cls.status}
                    </span>
                  </div>
                  
                  <div className="progress-info">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{progressPercentage}% Complete</span>
                  </div>

                  <div className="progress-details">
                    <p><strong>Lessons:</strong> {progress.completedLessons || 0} / {progress.totalLessons || 'N/A'}</p>
                    <p><strong>Grade:</strong> 
                      <span className={`grade ${getGradeColor(progress.grade || 0)}`}>
                        {progress.grade || 'N/A'}%
                      </span>
                    </p>
                    <p><strong>Last Activity:</strong> {progress.lastActivity ? new Date(progress.lastActivity).toLocaleDateString() : 'N/A'}</p>
                  </div>

                  <div className="progress-actions">
                    <button 
                      className="update-btn"
                      onClick={() => {
                        setSelectedClass(cls);
                        setShowUpdateModal(true);
                      }}
                    >
                      Update Progress
                    </button>
                    <button className="view-details-btn">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-classes">
            <p>This student is not enrolled in any classes yet.</p>
          </div>
        )}
      </div>

      {showUpdateModal && selectedClass && (
        <UpdateProgressModal
          student={student}
          classData={selectedClass}
          currentProgress={student.progress?.[selectedClass.id] || {}}
          onUpdate={handleUpdateProgress}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
};

const UpdateProgressModal = ({ student, classData, currentProgress, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    completedLessons: currentProgress.completedLessons || 0,
    totalLessons: currentProgress.totalLessons || 10,
    grade: currentProgress.grade || 0,
    attendance: currentProgress.attendance || 0,
    notes: currentProgress.notes || '',
    completed: currentProgress.completed || false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProgress = {
      ...formData,
      lastActivity: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    onUpdate(updatedProgress);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Progress - {classData.name}</h2>
        <p><strong>Student:</strong> {student.name}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Completed Lessons</label>
              <input
                type="number"
                value={formData.completedLessons}
                onChange={(e) => setFormData({...formData, completedLessons: parseInt(e.target.value)})}
                min="0"
                max={formData.totalLessons}
              />
            </div>
            <div className="form-group">
              <label>Total Lessons</label>
              <input
                type="number"
                value={formData.totalLessons}
                onChange={(e) => setFormData({...formData, totalLessons: parseInt(e.target.value)})}
                min="1"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Grade (%)</label>
              <input
                type="number"
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: parseInt(e.target.value)})}
                min="0"
                max="100"
              />
            </div>
            <div className="form-group">
              <label>Attendance (%)</label>
              <input
                type="number"
                value={formData.attendance}
                onChange={(e) => setFormData({...formData, attendance: parseInt(e.target.value)})}
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows="3"
              placeholder="Add any notes about student progress..."
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.completed}
                onChange={(e) => setFormData({...formData, completed: e.target.checked})}
              />
              Mark as Completed
            </label>
          </div>

          <div className="modal-actions">
            <button type="submit" className="save-btn">Update Progress</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentProgress; 