import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./ChampsCarousel.css"; 
import { FaHeart } from "react-icons/fa";

const ChampsCarousel = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/register");
  };

  const champs = [
    {
      id: 1,
      name: "Mahmoud",
      grade: "8th grade",
      title: "Building Robots",
      description:
        "Teach kids to build and program robots using motors, sensors, and microcontrollers. Gain programming skills to control robot movement and behavior with Scratch or Python.",
      likes: "400+ people have appreciated my project.",
      teaches: "Teaches kids to build and program humanoid robots",
      image: "/images/cm3eaX6j3HC.png", 
      projectImage: "/images/17543910_2001.i109.035_stem_education_isometric_concept_icons-02-removebg-preview.png",
    },
    {
      id: 2,
      name: "Shreyas",
      grade: "7th grade",
      title: "Robotics Mastery",
      description:
        "Introduce kids to robotics programming, design, and building, preparing them for the industry using Python.",
      likes: "300+ people have appreciated my project.",
      teaches: "Teaches kids about various robotics skills",
      image: "/images/Shreyas Image (1).png",
      projectImage: "/images/Screenshot 2025-01-18 235549.png",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="carousel-container">
      <h1 className="carousel-title">
        Watch our Champs <span className="highlight1">learning in action</span>
      </h1>

      <Slider {...settings}>
        {champs.map((champ) => (
          <div className="champ-card" key={champ.id}>
            <div className="champ-content">
              
              {/* Left Section */}
              <div className="champ-info-section">
                <div className="champ-avatar-container">
                  <img src={champ.image} alt={champ.name} className="champ-avatar" />
                </div>
                <div className="champ-details">
                  <h3 className="champ-name">
                    Hi 👋, I am <strong>{champ.name}</strong>
                  </h3>
                  <p className="champ-grade">I study in {champ.grade}</p>
                  <p className="champ-teaches">{champ.teaches}</p>
                  <h4 className="champ-title">{champ.title}</h4>
                  <p className="champ-description">{champ.description}</p>
                  <div className="champ-likes">
                    <FaHeart className="heart-icon" />
                    <span>{champ.likes}</span>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="champ-project-section">
                <img 
                  src={champ.projectImage} 
                  alt="Project showcase" 
                  className="champ-project-image" 
                />
              </div>
              
            </div>
          </div>
        ))}
      </Slider>

      <button className="hero__button" onClick={handleBookingClick}>
        Book Your First Free Class
      </button>
      <div class="trustpilot-widget" 
     data-locale="en-US" 
     data-template-id="56278e9abfbbba0bdcd568bc" 
     data-businessunit-id="67c3138311f3ffaeab09e239" 
     data-style-height="52px" 
     data-style-width="100%">
  <a href="https://www.trustpilot.com/review/childtynker.com" 
     target="_blank" 
     rel="noopener">
    Trustpilot
  </a>
</div>
    </div>
  );
};

export default ChampsCarousel;