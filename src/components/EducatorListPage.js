// src/components/EducatorListPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Educatorpagelist.css';

const educatorData = [
  {
    id: 1,
    name: "Rashmee kansal",
    title: "15+ yrs  as a robotics trainer",
    photo: "/images/Rashmee Kansal (2).png",
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
              <Link to={`/educator/${educator.id}`}>View Profile</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducatorListPage;