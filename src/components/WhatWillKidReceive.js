import React from "react";
import "./WhatWillKidReceive.css";

const WhatWillKidReceive = () => {
  const receiveItems = [
    {
      title: "Robotic Kit",
      description:
        "Child Tynker Robotics Kit are BIS certified. Kit will be shipped within 1 week. Your child will build many robotics projects & learn while playing.",
      image: "/images/Robotic kit.png",
    },
    {
      title: "Mission",
      description:
        "Designed by experts, Child Tynker missions are real-world problems that your child will solve using Child Tynker Robotics Kit. This will help your child develop the skills needed for the future.",
      image: "/images/Mision.png",
    },
    {
      title: "Live 1:1 classes",
      description:
        "Child Tynker coaches help your child through Live 1-1 Robotics classes by IIT/NITs experts. They encourage your child to think & come up with creative ideas to solve real-world problems.",
      image: "/images/Live 1-1 class.png",
    },
  ];

  const buildItems = [
    { title: "Working Robots", image: "/images/Image Gallery-20250306T121018Z-001/Image Gallery/working robot.png" },
    { title: "Creativity & problem solving", image: "/images/Image Gallery-20250306T121018Z-001/Image Gallery/creative thinking.png" },
    { title: "Confidence", image: "/images/Image Gallery-20250306T121018Z-001/Image Gallery/Confedence.png" },
    { title: "Team work & social collaboration", image: "/images/Image Gallery-20250306T121018Z-001/Image Gallery/Team work.png" },
  ];

  return (
    <div className="kid-container">
      <h2 className="section-title">WHAT WILL YOUR KID RECEIVE</h2>
      <div className="receive-section">
        {receiveItems.map((item, index) => (
          <div key={index} className="receive-card">
            <img src={item.image} alt={item.title} className="receive-icon" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">WHAT WILL YOUR KID BUILD</h2>
      <div className="build-section">
        {buildItems.map((item, index) => (
          <div key={index} className="build-card">
            <img src={item.image} alt={item.title} className="build-icon" />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWillKidReceive;