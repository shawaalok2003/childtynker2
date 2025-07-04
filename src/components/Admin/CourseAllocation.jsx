import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, doc, query, where, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import "./AdminManagement.css";

const CourseAllocation = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [allocationType, setAllocationType] = useState("course"); // course or class
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Fetch students
      const studentsSnapshot = await getDocs(collection(db, "users"));
      const studentsList = studentsSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === "student");
      setStudents(studentsList);

      // Fetch teachers
      const teachersList = studentsSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === "teacher");
      setTeachers(teachersList);

      // Fetch courses
      const coursesSnapshot = await getDocs(collection(db, "courses"));
      const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(coursesList);

      // Fetch classes
      const classesSnapshot = await getDocs(collection(db, "classes"));
      const classesList = classesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClasses(classesList);

      // Fetch existing allocations
      const allocationsSnapshot = await getDocs(collection(db, "courseAllocations"));
      const allocationsList = allocationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllocations(allocationsList);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAllocation = async () => {
    if (!selectedStudent || !selectedTeacher || (!selectedCourse && !selectedClass)) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const allocationData = {
        studentId: selectedStudent,
        teacherId: selectedTeacher,
        allocationType: allocationType,
        createdAt: new Date().toISOString(),
        status: "active"
      };

      if (allocationType === "course") {
        allocationData.courseId = selectedCourse;
        allocationData.courseName = courses.find(c => c.id === selectedCourse)?.name;
      } else {
        allocationData.classId = selectedClass;
        allocationData.className = classes.find(c => c.id === selectedClass)?.name;
      }

      // Add allocation
      await addDoc(collection(db, "courseAllocations"), allocationData);

      // Update student's enrolled courses/classes
      const studentDoc = doc(db, "users", selectedStudent);
      const studentData = students.find(s => s.id === selectedStudent);
      const updatedEnrollments = studentData.enrollments || [];

      if (allocationType === "course") {
        updatedEnrollments.push({
          type: "course",
          id: selectedCourse,
          name: allocationData.courseName,
          teacherId: selectedTeacher,
          enrolledAt: new Date().toISOString()
        });
      } else {
        updatedEnrollments.push({
          type: "class",
          id: selectedClass,
          name: allocationData.className,
          teacherId: selectedTeacher,
          enrolledAt: new Date().toISOString()
        });
      }

      await updateDoc(studentDoc, { enrollments: updatedEnrollments });

      // Update teacher's assigned courses/classes
      const teacherDoc = doc(db, "users", selectedTeacher);
      const teacherData = teachers.find(t => t.id === selectedTeacher);
      const updatedAssignments = teacherData.assignments || [];

      if (allocationType === "course") {
        updatedAssignments.push({
          type: "course",
          id: selectedCourse,
          name: allocationData.courseName,
          studentId: selectedStudent,
          assignedAt: new Date().toISOString()
        });
      } else {
        updatedAssignments.push({
          type: "class",
          id: selectedClass,
          name: allocationData.className,
          studentId: selectedStudent,
          assignedAt: new Date().toISOString()
        });
      }

      await updateDoc(teacherDoc, { assignments: updatedAssignments });

      // Reset form
      setSelectedStudent("");
      setSelectedTeacher("");
      setSelectedCourse("");
      setSelectedClass("");

      // Refresh data
      fetchAllData();
      alert("Allocation successful!");

    } catch (error) {
      console.error("Error creating allocation:", error);
      alert("Allocation failed. Please try again.");
    }
  };

  const removeAllocation = async (allocationId, studentId, teacherId, allocationType, itemId) => {
    try {
      // Remove from allocations collection
      await deleteDoc(doc(db, "courseAllocations", allocationId));

      // Update student's enrollments
      const studentDoc = doc(db, "users", studentId);
      const studentData = students.find(s => s.id === studentId);
      const updatedEnrollments = (studentData.enrollments || []).filter(
        enrollment => !(enrollment.id === itemId && enrollment.type === allocationType)
      );
      await updateDoc(studentDoc, { enrollments: updatedEnrollments });

      // Update teacher's assignments
      const teacherDoc = doc(db, "users", teacherId);
      const teacherData = teachers.find(t => t.id === teacherId);
      const updatedAssignments = (teacherData.assignments || []).filter(
        assignment => !(assignment.id === itemId && assignment.type === allocationType)
      );
      await updateDoc(teacherDoc, { assignments: updatedAssignments });

      // Refresh data
      fetchAllData();
      alert("Allocation removed successfully!");

    } catch (error) {
      console.error("Error removing allocation:", error);
      alert("Failed to remove allocation. Please try again.");
    }
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : "Unknown";
  };

  const getTeacherName = (teacherId) => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? `${teacher.firstName} ${teacher.lastName}` : "Unknown";
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading allocation data...</p>
      </div>
    );
  }

  return (
    <div className="admin-management">
      <div className="admin-header">
        <h1>Course & Class Allocation</h1>
        <button onClick={() => navigate('/dashboard/admin')} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="allocation-form">
        <h2>Create New Allocation</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Student</label>
            <select 
              value={selectedStudent} 
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">Select Student</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.firstName} {student.lastName} ({student.email})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Teacher</label>
            <select 
              value={selectedTeacher} 
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName} ({teacher.email})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Allocation Type</label>
            <select 
              value={allocationType} 
              onChange={(e) => setAllocationType(e.target.value)}
            >
              <option value="course">Course</option>
              <option value="class">Class</option>
            </select>
          </div>

          {allocationType === "course" ? (
            <div className="form-group">
              <label>Course</label>
              <select 
                value={selectedCourse} 
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} - ₹{course.price}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="form-group">
              <label>Class</label>
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name} - ₹{cls.price}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <button onClick={handleAllocation} className="allocate-btn">
          Allocate {allocationType === "course" ? "Course" : "Class"}
        </button>
      </div>

      <div className="allocations-list">
        <h2>Current Allocations</h2>
        <div className="allocations-grid">
          {allocations.length > 0 ? (
            allocations.map((allocation) => (
              <div key={allocation.id} className="allocation-card">
                <div className="allocation-header">
                  <h3>{allocation.allocationType === "course" ? "Course" : "Class"} Allocation</h3>
                  <button 
                    onClick={() => removeAllocation(
                      allocation.id, 
                      allocation.studentId, 
                      allocation.teacherId, 
                      allocation.allocationType,
                      allocation.courseId || allocation.classId
                    )}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="allocation-details">
                  <p><strong>Student:</strong> {getStudentName(allocation.studentId)}</p>
                  <p><strong>Teacher:</strong> {getTeacherName(allocation.teacherId)}</p>
                  <p><strong>Item:</strong> {allocation.courseName || allocation.className}</p>
                  <p><strong>Allocated:</strong> {new Date(allocation.createdAt).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> <span className={`status ${allocation.status}`}>{allocation.status}</span></p>
                </div>
              </div>
            ))
          ) : (
            <p>No allocations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseAllocation; 