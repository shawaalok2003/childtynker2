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
      projectImage: "/images/Screenshot 2025-01-18 235549.png",
      videoUrl: "https://www.youtube.com/embed/2wiLEZtAk40", // Replace with actual video link
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
      videoUrl: "https://www.youtube.com/embed/2wiLEZtAk40", // Replace with actual video link
    },
  ];
  const testimonials = [
    {
      image: "/images/Image Gallery-20250306T121018Z-001/Image Gallery/Amlan Kumar Sengupta Professor IIT  Madras.png", 
      id: 1,
      name: "Amlan Kumar Sengupta",
      designation: "Professor, IIT Madras",
      feedback:
        "Over the past six months, more than 100 students from IIT Madras actively participated in a 6-hour aeromodelling workshop conducted in the engaging 'design-build-fly' format.",
    },
    { image: "/images/Image Gallery-20250306T121018Z-001/Image Gallery/Tanushree Parents.png",
      id: 2,
      name: "Tanushree",
      designation: "Parent",
      feedback:
        "Initially, I thought Robotics for kids was just a gimmicky advertisement. However, after attending the free session, I realized how effective it is in unlocking my daughter's potential. I was so impressed that I even referred three of my colleagues!",
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
      {/* Section 1: Parents Testimonials */}
      <h1 className="carousel-title">Here's what <span className="highlight1">Parents have to say!</span></h1>
      <div className="testimonials-container">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
          <img src={testimonial.image} alt="image" className="image"/>
            <p className="testimonial-feedback">"{testimonial.feedback}"</p>
            <h4 className="testimonial-name">- {testimonial.name}</h4>
            <h4 className="testimonial-name">- {testimonial.designation}</h4>
          </div>
        ))}
      </div>
      <div className="trustpilot-widget" 
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

      {/* Section 2: Tech Leaders Showcase */}
      <h1 className="carousel-title">Meet our <span className="highlight1">Tech Leaders</span></h1>
      <p className="tech-leaders-intro">
        See what our <strong>3 to 16 years kids</strong> built with <strong>ChildTynker!</strong>
      </p>

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
            {/* Right Section */}
<div className="champ-project-section">
<iframe
  className="champ-project-video"
  width="100%"
  height="315"
  src={champ.videoUrl}
  title={champ.title}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
</div>
              
            </div>
          </div>
        ))}
      </Slider>

      <button className="hero__button" onClick={handleBookingClick}>
        Book Your First Free Class
      </button>
    </div>
  );
};

export default ChampsCarousel;