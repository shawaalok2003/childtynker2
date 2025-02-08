import React, { useState } from "react";
import "./CurriculumSystem.css"; // Custom CSS for styling

const CurriculumSystem = () => {
  const curriculumData = [
    {
      level: "L1",
      stage: "Enlightened",
      age: "3+",
      sessions: 96,
      software: "Wise Child",
      duration: "3 months",
      image: "👶",
    },
    {
      level: "L2",
      stage: "Entry",
      age: "5+",
      sessions: 40,
      software: "Alpha A",
      duration: "2 months",
      image: "🐣",
    },
    {
      level: "L3",
      stage: "Entry",
      age: "5+",
      sessions: 40,
      software: "Alpha B",
      duration: "2 months",
      image: "🐤",
    },
    {
      level: "L4",
      stage: "Basic",
      age: "5+",
      sessions: 40,
      software: "Alpha C",
      duration: "3 months",
      image: "🚀",
    },
    {
      level: "L5",
      stage: "Basic",
      age: "6+",
      sessions: 40,
      software: "Alpha X Starter Combined",
      duration: "3 months",
      image: "🎮",
    },
    {
      level: "L6",
      stage: "Strengthened",
      age: "7+",
      sessions: 96,
      software: "Pioneer 1",
      duration: "4 months",
      image: "🛠️",
    },
    {
      level: "L7",
      stage: "Advanced",
      age: "9+",
      sessions: 48,
      software: "Pioneer 2 Arduino",
      duration: "2 months",
      image: "🤖",
    },
    {
      level: "L8",
      stage: "Innovative",
      age: "10+",
      sessions: 32,
      software: "AI/IOT Defender WiseKit",
      duration: "1 month",
      image: "🧠",
    },
    {
      level: "L8",
      stage: "Innovative",
      age: "12+",
      sessions: 32,
      software: "WiseLand 12 in 1 Robotstrom Drone",
      duration: "1 month",
      image: "🛸",
    },
    {
      level: "L8",
      stage: "Innovative",
      age: "16+",
      sessions: 32,
      software: "ROS",
      duration: "1 month",
      image: "🌌",
    },
  ];

  // State for age filter
  const [ageFilter, setAgeFilter] = useState("");

  const filterByAge = (age) => {
    if (!age) return curriculumData;
    return curriculumData.filter((item) => item.age.startsWith(age));
  };

  const filteredData = filterByAge(ageFilter);

  return (
    <div className="curriculum-container">
      <h1 className="title">🎓 Age-wise Curriculum System 🧩</h1>

      {/* Dropdown Filter */}
      <div className="filter-section">
        <label htmlFor="ageFilter">Filter by Age Group: </label>
        <select
          id="ageFilter"
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Ages</option>
          <option value="3">3+</option>
          <option value="5">5+</option>
          <option value="6">6+</option>
          <option value="7">7+</option>
          <option value="9">9+</option>
          <option value="10">10+</option>
          <option value="12">12+</option>
          <option value="16">16+</option>
        </select>
      </div>

      {/* Curriculum Cards */}
      <div className="card-container">
        {filteredData.map((item, index) => (
          <div key={index} className="card">
            <div className="card-header">
              <span className="card-image">{item.image}</span>
              <h3 className="card-title">Level {item.level}</h3>
            </div>
            <div className="card-body">
              <p>
                <strong>Stage:</strong> {item.stage}
              </p>
              <p>
                <strong>Age:</strong> {item.age}
              </p>
              <p>
                <strong>Sessions:</strong> {item.sessions}
              </p>
              <p>
                <strong>Software:</strong> {item.software}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurriculumSystem;