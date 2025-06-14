const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

// File Paths
const USERS_FILE = "./users.json";
const COURSES_FILE = "./courses.json";
const WITHDRAWALS_FILE = "./withdrawals.json";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Utility Functions
const readFile = (path) => (fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : []);
const writeFile = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, 2));

// ---------- AUTH ROUTES ----------
app.post("/api/signup", (req, res) => {
  const { email, password, role } = req.body;
  const users = readFile(USERS_FILE);
  const exists = users.find((u) => u.email === email);
  if (exists) return res.status(400).json({ message: "User already exists" });

  const newUser = { email, password, role };
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

// ---------- COURSE ROUTES ----------
// Create new course
app.post("/api/create-course", (req, res) => {
  const { title, teacher, description } = req.body;
  const courses = readFile(COURSES_FILE);

  const newCourse = {
    id: "course_" + Date.now(),
    title,
    description,
    teacher,
    completed: false,
    quiz: []
  };

  courses.push(newCourse);
  writeFile(COURSES_FILE, courses);
  res.json({ message: "Course created successfully", course: newCourse });
});

// Get courses (only incomplete unless ?all=true)
app.get("/api/courses", (req, res) => {
  const showAll = req.query.all === "true";
  const courses = readFile(COURSES_FILE);
  const filtered = showAll ? courses : courses.filter((c) => !c.completed);
  res.json(filtered);
});

app.post("/api/complete-class", (req, res) => {
  const { email, courseId } = req.body;
  const courses = readFile(COURSES_FILE);
  const users = readFile(USERS_FILE);

  const courseIndex = courses.findIndex((c) => c.id === courseId && c.teacher === email);
  if (courseIndex === -1) return res.status(404).json({ message: "Course not found or not authorized" });

  if (courses[courseIndex].completed) {
    return res.status(400).json({ message: "Class already completed" });
  }

  courses[courseIndex].completed = true;
  writeFile(COURSES_FILE, courses);

  const userIndex = users.findIndex((u) => u.email === email);
  users[userIndex].wallet += 100;
  writeFile(USERS_FILE, users);

  res.json({ message: "Class marked complete. ₹100 credited.", wallet: users[userIndex].wallet });
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

// ---------- WITHDRAWAL ROUTES ----------
const getWithdrawals = () => (fs.existsSync(WITHDRAWALS_FILE) ? JSON.parse(fs.readFileSync(WITHDRAWALS_FILE)) : []);
const saveWithdrawals = (withdrawals) => fs.writeFileSync(WITHDRAWALS_FILE, JSON.stringify(withdrawals, null, 2));

app.post("/api/withdraw", (req, res) => {
  const { email, amount } = req.body;
  const withdrawals = getWithdrawals();
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
// ---------- USERS ROUTE ----------
app.get("/api/users", (req, res) => {
  const users = readFile(USERS_FILE);
  res.json(users);
});
// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});