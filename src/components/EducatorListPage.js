// src/components/EducatorListPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Educatorpagelist.css';

const educatorData = [
  {
    id: 1,
    name: "Rashmee kansal",
    title: "15+ yrs  as a robotics trainer",
    photo: "/images/Logo ChildTynker  (8).png",
  },
  {
    id: 1,
    name: "Ashley",
    title: "YOE- 6+ (A Certified Global robotics Trainer )",
    photo: "/images/Logo ChildTynker  (9).png",
  },
  {
    id: 1,
    name: "Salman Mamdapur ",
    title: "YOE- 5+",
    photo: "/images/Logo ChildTynker  (10).png",
  },
];

const EducatorListPage = () => {
  return (
    <div className="educator-list">
      <h1>Meet Our Educators</h1>
      <div className="educator-cards">
        {educatorData.map((educator) => (
          <div key={educator.id} className="educator-card">
            <img src={educator.photo} alt={educator.name} className="educator-photo" />
            <div className="educator-info">
              <h2>{educator.name}</h2>
              <p>{educator.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducatorListPage;