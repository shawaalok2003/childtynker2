// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

const USERS_FILE = "./users.json";
const COURSES_FILE = "./courses.json";
const WITHDRAWALS_FILE = "./withdrawals.json";

app.use(cors());
app.use(bodyParser.json());

const readFile = (path) => (fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : []);
const writeFile = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, 2));

// AUTH ROUTES
app.post("/api/signup", (req, res) => {
  const { email, password, role } = req.body;
  const users = readFile(USERS_FILE);
  const exists = users.find((u) => u.email === email);
  if (exists) return res.status(400).json({ message: "User already exists" });

  const newUser = {
    email,
    password,
    role,
    profile: { name: "", guardian: "", phone: "" },
    enrolledCourses: [],
    schedule: [],
    quizzes: [],
    wallet: 0
  };
  if (role === "teacher") newUser.wallet = 0;

  users.push(newUser);
  writeFile(USERS_FILE, users);
  res.status(200).json({ message: "Signup successful" });
});

app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;
  const users = readFile(USERS_FILE);
  const user = users.find((u) => u.email === email && u.password === password && u.role === role);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ message: "Login successful", user });
});

// COURSE ROUTES
app.post("/api/create-course", (req, res) => {
  const { title, teacher, description } = req.body;
  const courses = readFile(COURSES_FILE);
  const newCourse = {
    id: "course_" + Date.now(),
    title,
    description,
    teacher,
    completed: false,
    quiz: [],
    schedule: ""
  };
  courses.push(newCourse);
  writeFile(COURSES_FILE, courses);
  res.json({ message: "Course created successfully", course: newCourse });
});

// List all courses (all or only active)
app.get("/api/courses", (req, res) => {
  const showAll = req.query.all === "true";
  const courses = readFile(COURSES_FILE);
  const filtered = showAll ? courses : courses.filter((c) => !c.completed);
  res.json(filtered);
});

// Get all courses by teacher
app.get("/api/courses/teacher/:email", (req, res) => {
  const { email } = req.params;
  const courses = readFile(COURSES_FILE);
  const teacherCourses = courses.filter((c) => c.teacher === email);
  res.json(teacherCourses);
});

// Student joins a course
app.post("/api/dashboard/student/join-course", (req, res) => {
  const { email, courseId } = req.body;
  const users = readFile(USERS_FILE);
  const courses = readFile(COURSES_FILE);
  const user = users.find(u => u.email === email);
  const course = courses.find(c => c.id === courseId);
  if (!user || !course) return res.status(404).json({ message: "User or course not found" });

  if (!user.enrolledCourses) user.enrolledCourses = [];
  if (user.enrolledCourses.includes(courseId)) {
    return res.status(400).json({ message: "Already enrolled" });
  }
  user.enrolledCourses.push(courseId);
  writeFile(USERS_FILE, users);
  res.json({ message: "Enrolled successfully", enrolledCourses: user.enrolledCourses });
});

// Get all courses a student is enrolled in
app.get("/api/dashboard/student/:email/courses", (req, res) => {
  const { email } = req.params;
  const users = readFile(USERS_FILE);
  const courses = readFile(COURSES_FILE);
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });
  const enrolled = (user.enrolledCourses || []).map(cid => courses.find(c => c.id === cid)).filter(Boolean);
  res.json(enrolled);
});

// Add a quiz to a course
app.post("/api/add-quiz", (req, res) => {
  const { courseId, question, options, answer } = req.body;
  const courses = readFile(COURSES_FILE);
  const course = courses.find((c) => c.id === courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  if (!course.quiz) course.quiz = [];
  course.quiz.push({ question, options, answer });
  writeFile(COURSES_FILE, courses);
  res.json({ message: "Quiz added successfully" });
});

// Get quizzes for a course
app.get("/api/courses/:courseId/quizzes", (req, res) => {
  const { courseId } = req.params;
  const courses = readFile(COURSES_FILE);
  const course = courses.find(c => c.id === courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course.quiz || []);
});

// Student submits quiz answers
app.post("/api/dashboard/student/submit-quiz", (req, res) => {
  const { email, courseId, answers } = req.body; // answers: [{question, selectedOption}]
  const users = readFile(USERS_FILE);
  const courses = readFile(COURSES_FILE);
  const user = users.find(u => u.email === email);
  const course = courses.find(c => c.id === courseId);
  if (!user || !course) return res.status(404).json({ message: "User or course not found" });

  // Calculate score
  let score = 0;
  (course.quiz || []).forEach((q, idx) => {
    if (answers[idx] && answers[idx].selectedOption === q.answer) score++;
  });

  if (!user.quizzes) user.quizzes = [];
  user.quizzes.push({
    id: `${courseId}_${Date.now()}`,
    courseId,
    answers,
    score,
    completed: true,
    submittedAt: new Date().toISOString()
  });
  writeFile(USERS_FILE, users);
  res.json({ message: "Quiz submitted", score });
});

// Get schedule for a course
app.get("/api/courses/:courseId/schedule", (req, res) => {
  const { courseId } = req.params;
  const courses = readFile(COURSES_FILE);
  const course = courses.find(c => c.id === courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json({ schedule: course.schedule || "" });
});

// Set schedule for a course
app.post("/api/schedule-class", (req, res) => {
  const { courseId, schedule } = req.body;
  const courses = readFile(COURSES_FILE);
  const course = courses.find((c) => c.id === courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  course.schedule = schedule;
  writeFile(COURSES_FILE, courses);
  res.json({ message: "Class scheduled successfully", course });
});

// WITHDRAWAL ROUTES
const getWithdrawals = () => (fs.existsSync(WITHDRAWALS_FILE) ? JSON.parse(fs.readFileSync(WITHDRAWALS_FILE)) : []);
const saveWithdrawals = (withdrawals) => fs.writeFileSync(WITHDRAWALS_FILE, JSON.stringify(withdrawals, null, 2));

app.post("/api/withdraw", (req, res) => {
  const { email, amount } = req.body;
  const users = readFile(USERS_FILE);
  const withdrawals = getWithdrawals();

  const userIndex = users.findIndex(u => u.email === email);
  if (userIndex === -1 || users[userIndex].wallet < amount) {
    return res.status(400).json({ message: "Insufficient balance or user not found" });
  }

  users[userIndex].wallet -= amount;
  writeFile(USERS_FILE, users);

  const request = {
    email,
    amount,
    status: "pending",
    requestedAt: new Date().toISOString()
  };
  withdrawals.push(request);
  saveWithdrawals(withdrawals);

  res.json({ message: "Withdrawal request submitted. Admin will process it soon." });
});

app.get("/api/withdrawals", (req, res) => {
  res.json(getWithdrawals());
});

app.post("/api/withdrawals/update", (req, res) => {
  const { email, requestedAt, status } = req.body;
  const withdrawals = getWithdrawals();
  let updated = false;

  const updatedWithdrawals = withdrawals.map(w => {
    if (w.email === email && w.requestedAt === requestedAt && w.status === 'pending') {
      updated = true;
      return { ...w, status };
    }
    return w;
  });

  if (!updated) return res.status(404).json({ message: "Withdrawal not found" });
  saveWithdrawals(updatedWithdrawals);
  res.json({ message: `Withdrawal ${status}`, withdrawals: updatedWithdrawals });
});

// --- Student Dashboard API additions ---

// Update student profile
app.post("/api/dashboard/student/update-profile", (req, res) => {
  const { email, profile } = req.body;
  const users = readFile(USERS_FILE);
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.profile = profile;
  writeFile(USERS_FILE, users);
  res.json({ message: "Profile updated", profile });
});

// Mark quiz/assignment as complete (for manual marking)
app.post("/api/dashboard/student/complete-quiz", (req, res) => {
  const { email, quizId } = req.body;
  const users = readFile(USERS_FILE);
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (!user.quizzes) user.quizzes = [];
  const quiz = user.quizzes.find(q => q.id === quizId);
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });
  quiz.completed = true;
  writeFile(USERS_FILE, users);
  res.json({ message: "Quiz marked as complete", quiz });
});

// Get student dashboard data by email
app.get("/api/dashboard/student/:email", (req, res) => {
  const { email } = req.params;
  const users = readFile(USERS_FILE);
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// ADMIN ROUTES

// Admin: List all users
app.get("/api/admin/users", (req, res) => {
  const users = readFile(USERS_FILE);
  res.json(users);
});

// Admin: Delete a user
app.delete("/api/admin/users/:email", (req, res) => {
  const { email } = req.params;
  let users = readFile(USERS_FILE);
  const initialLength = users.length;
  users = users.filter(u => u.email !== email);
  if (users.length === initialLength) return res.status(404).json({ message: "User not found" });
  writeFile(USERS_FILE, users);
  res.json({ message: "User deleted" });
});

// Admin: List all courses (already present as /api/courses?all=true)

// Teacher wallet info
app.get("/api/teacher-wallet/:email", (req, res) => {
  const { email } = req.params;
  const users = readFile(USERS_FILE);
  const user = users.find(u => u.email === email);
  const withdrawals = getWithdrawals().filter(w => w.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });

  const lastWithdrawal = withdrawals.length > 0
    ? withdrawals[withdrawals.length - 1]
    : null;

  res.json({ wallet: user.wallet, withdrawals, lastWithdrawal });
});

// List all users (students and teachers)
app.get("/api/users", (req, res) => {
  const users = readFile(USERS_FILE);
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});