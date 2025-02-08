import React, { useState } from "react";
import { FaRobot, FaSchool, FaUsers, FaTools, FaCogs } from "react-icons/fa";
import "./ChildTynker.css";

const All = () => {
  const [activeBox, setActiveBox] = useState(null);

  const handleBoxClick = (index) => {
    setActiveBox((prevIndex) => (prevIndex === index ? null : index)); // Toggle box state
  };

  const sections = [
    {
      title: "About Us",
      icon: <FaRobot />,
      content:
        "We are a revolutionary STEM-based EdTech company, focusing on Robotics, IoT, and Drone courses for children aged 3 to 16. Recognized by the Government of India for our innovative approach.",
    },
    {
      title: "Milestones",
      icon: <FaCogs />,
      content:
        "✔ Founded by IIT/NIT alumni\n✔ Recognized by the Government of India\n✔ Trained 50,000+ students\n✔ Partnerships with 200+ schools and corporates",
    },
    {
      title: "Key Features",
      icon: <FaTools />,
      content:
        "✔ 1:1 Live interactive classes\n✔ Hands-on projects\n✔ Courses for children aged 3 to 16\n✔ Focus on Robotics, IoT, and Drones",
    },
    {
      title: "Our Partners",
      icon: <FaSchool />,
      content:
        "Schools: Partnered with 200+ schools across India.\nCorporates: Collaborated with industry leaders for advanced learning opportunities.",
    },
    {
      title: "Testimonials",
      icon: <FaUsers />,
      content:
        "“Child Tynker has transformed the way my child learns and engages with technology!”\n— A Happy Parent",
    },
    {
      title: "Our Products",
      icon: <FaRobot />,
      content: "✔ Robotics Kits\n✔ IoT Starter Kits\n✔ Drone Kits for Beginners",
    },
  ];

  return (
    <div className="child-tynker">
      <h1 className="title">
        Welcome to <span className="highlight">Child Tynker</span>
      </h1>
      <div className="grid-container">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`box ${activeBox === index ? "active" : ""}`}
            onClick={() => handleBoxClick(index)}
          >
            <div className="box-header">
              <span className="box-icon">{section.icon}</span>
              <h2 className="box-title">{section.title}</h2>
            </div>
            {activeBox === index && (
              <div className="box-content">
                {section.content.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default All;