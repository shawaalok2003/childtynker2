import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to booking page
import "./CourseSelectionPage.css"; // Assuming your styles are in this file

const CourseSelectionPage = () => {
  const ageCourses = [
    {
      age: "3+",
      courses: [
        {
          image: "/images/Image Gallery-20250306T121018Z-001/Image Gallery/Course age wise/WiseChild2-Elementary.png",
          title: "Curriculum L1",
          name: "Enlightened",
          oldPrice: "₹20.00K",
          newPrice: "₹18.00K",
          sessions: "96 Sessions",
          modules: ["Wise Child Program"],
          certificate: "Duration: 3 months",
          icon: "👶",
        },
      ],
    },
    {
      age: "5+",
      courses: [
        {
          image: "",
          title: "Curriculum L2",
          name: "Entry Alpha A",
          oldPrice: "₹22.00K",
          newPrice: "₹19.50K",
          sessions: "40 Sessions",
          modules: ["Alpha A Software", "Basics of Exploration"],
          certificate: "Duration: 2 months",
          icon: "🐣",
        },
        {
          image: "",
          title: "Curriculum L3",
          name: "Entry Alpha B",
          oldPrice: "₹22.00K",
          newPrice: "₹19.50K",
          sessions: "40 Sessions",
          modules: ["Alpha B Software", "Intermediate Circuits"],
          certificate: "Duration: 2 months",
          icon: "🐤",
        },
        {
          image: "",
          title: "Curriculum L4",
          name: "Basic Alpha C",
          oldPrice: "₹24.00K",
          newPrice: "₹21.00K",
          sessions: "40 Sessions",
          modules: ["Alpha C Software", "Advanced Robotics Fundamentals"],
          certificate: "Duration: 3 months",
          icon: "🚀",
        },
      ],
    },
    {
      age: "6+",
      courses: [
        {
          image: "",
          title: "Curriculum L5",
          name: "Basic Alpha X Starter Combined",
          oldPrice: "₹26.00K",
          newPrice: "₹22.00K",
          sessions: "40 Sessions",
          modules: ["Alpha X Starter", "Basics of Coding and Robotics"],
          certificate: "Duration: 3 months",
          icon: "🎮",
        },
      ],
    },
    {
      age: "7+",
      courses: [
        {
          image: "",
          title: "Curriculum L6",
          name: "Strengthened Pioneer 1",
          oldPrice: "₹30.00K",
          newPrice: "₹27.00K",
          sessions: "96 Sessions",
          modules: ["Pioneer 1 Software", "Hardware Integration"],
          certificate: "Duration: 4 months",
          icon: "🛠️",
        },
      ],
    },
    {
      age: "9+",
      courses: [
        {
          image: "",
          title: "Curriculum L7",
          name: "Advanced Pioneer 2 Arduino",
          oldPrice: "₹35.00K",
          newPrice: "₹31.50K",
          sessions: "48 Sessions",
          modules: ["Arduino-Based Projects", "Intermediate Robotics"],
          certificate: "Duration: 2 months",
          icon: "🤖",
        },
      ],
    },
    {
      age: "10+",
      courses: [
        {
          image: "",
          title: "Curriculum L8",
          name: "Innovative AI/IOT Defender",
          oldPrice: "₹40.00K",
          newPrice: "₹36.00K",
          sessions: "32 Sessions",
          modules: ["AI & IoT Applications", "WiseKit Platform"],
          certificate: "Duration: 1 month",
          icon: "🧠",
        },
      ],
    },
    {
      age: "12+",
      courses: [
        {
          image:"",
          title: "Curriculum L8",
          name: "Innovative WiseLand Robotics",
          oldPrice: "₹42.00K",
          newPrice: "₹37.80K",
          sessions: "32 Sessions",
          modules: ["12-in-1 Robotstrom", "Drone Programming"],
          certificate: "Duration: 1 month",
          icon: "🛸",
        },
      ],
    },
    {
      age: "16+",
      courses: [
        {
          image: "",
          title: "Curriculum L8",
          name: "Innovative ROS Robotics",
          oldPrice: "₹50.00K",
          newPrice: "₹45.00K",
          sessions: "32 Sessions",
          modules: ["ROS Framework", "Advanced Robotics Concepts"],
          certificate: "Duration: 1 month",
          icon: "🌌",
        },
      ],
    },
  ];
  const [selectedAge, setSelectedAge] = useState("3+");
  const navigate = useNavigate(); // Hook for navigation

  // Filtered courses based on selected age
  const filteredCourses =
    selectedAge === "All"
      ? ageCourses
      : ageCourses.filter((group) => group.age === selectedAge);

  // Handle course selection and navigate directly to booking
  const handleCourseSelection = (course) => {
    navigate("/booking", { state: { selectedCourse: course } });
  };

  return (
    <div className="course-selection-page">
      <h1>Select Your Course for the Free Demo</h1>
      <p>Choose the course you'd like to get a demo for:</p>

      {/* Age filter dropdown */}
      <div className="filter-container">
        <label htmlFor="ageFilter">Filter by Age:</label>
        <select
          id="ageFilter"
          value={selectedAge}
          onChange={(e) => setSelectedAge(e.target.value)}
          className="filter-select"
        >
          {Array.from(new Set(ageCourses.map((group) => group.age))).map(
            (age, index) => (
              <option key={index} value={age}>
                {age}
              </option>
            )
          )}
        </select>
      </div>
      {/* Render filtered courses */}
      <div className="course-options">
        {filteredCourses.map((ageGroup, index) => (
          <div key={index} className="age-group">
            <h2 className="header-text">
              Suitable for children aged{" "}
              <span className="highlight">{ageGroup.age}</span>
            </h2>
            <div className="card-container">
              {ageGroup.courses.map((course, idx) => (
                <div
                  key={idx}
                  className="card"
                  onClick={() => handleCourseSelection(course)}
                >
                  <img src={course.image} alt={course.name} className="course-image" />
                  <div className="card-content">
                    <h3 className="card-title">{course.title}</h3>
                    <h2 className="course-name">{course.name}</h2>
                    <p className="pricing">
                      <span className="old-price">{course.oldPrice}</span>
                      <span className="new-price">{course.newPrice}</span>
                    </p>
                    <p className="sessions">{course.sessions}</p>
                    <h4>Modules in this course:</h4>
                    <ul>
                      {course.modules.map((module, idx) => (
                        <li key={idx} className="module">
                          {module}
                        </li>
                      ))}
                    </ul>
                    <p className="certificate">{course.certificate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CourseSelectionPage;