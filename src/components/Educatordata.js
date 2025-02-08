import React from 'react';
import { useParams } from 'react-router-dom';
import './EducatorPage.css';

const educatorData = [
  {
    id: 1,
    name: "Rashmee Kansal",
    title: "Robotics Trainer with 15+ Years of Experience",
    photo: "/images/Rashmee Kansal (2).png",
    bio: "Rashmee Kansal has over 15 years of experience as a dedicated robotics trainer. Her passion lies in empowering students to explore and innovate in the field of robotics and automation.",
    qualifications: [
      "Bachelor's in Electronics and Communication Engineering",
      "Certified Robotics Trainer",
      "15+ Years of Teaching Experience in Robotics",
      "Presenter at International Robotics Education Conferences"
    ],
    courses: [
      {
        title: "Introduction to Robotics",
        description: "An engaging course designed for beginners to learn the fundamentals of robotics, including design and programming.",
        duration: "2 months"
      },
      {
        title: "Advanced Robotics Programming",
        description: "A deep dive into programming and controlling advanced robotic systems.",
        duration: "4 months"
      },
      {
        title: "Robotics in Education",
        description: "Learn how to teach robotics effectively and inspire young minds.",
        duration: "3 months"
      }
    ],
    testimonials: [
      {
        text: "Rashmee's courses helped me build my first robot from scratch! Her guidance was invaluable.",
        author: "Anisha G., High School Student"
      },
      {
        text: "Thanks to Rashmee, I now have a solid foundation in robotics. Her teaching style is both inspiring and effective.",
        author: "Rajesh P., College Graduate"
      }
    ],
    contact: {
      email: "rashmeekansal@example.com",
      linkedin: "https://www.linkedin.com/in/rashmeekansal"
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Advanced Robotics Educator",
    photo: "educator-photo-2.jpg",
    bio: "Jane specializes in integrating robotics with AI and IoT to create real-world solutions for the tech-driven world.",
    qualifications: [
      "PhD in Robotics and AI",
      "AI & Robotics Researcher",
      "10+ Years of Industry and Teaching Experience"
    ],
    courses: [
      {
        title: "AI-Powered Robotics",
        description: "An advanced course focused on using AI techniques to enhance robotics applications.",
        duration: "5 months"
      }
    ],
    testimonials: [
      {
        text: "Jane's approach to teaching is incredibly engaging, and her industry experience adds so much value to the courses.",
        author: "Alice M., Tech Enthusiast"
      }
    ],
    contact: {
      email: "janesmith@example.com",
      linkedin: "https://www.linkedin.com/in/janesmith"
    }
  },
  {
    id: 3,
    name: "Emily Johnson",
    title: "AI and Machine Learning Specialist",
    photo: "educator-photo-3.jpg",
    bio: "Emily has been at the forefront of AI and Machine Learning education, creating impactful learning experiences for students worldwide.",
    qualifications: [
      "Master's in Artificial Intelligence",
      "Machine Learning Expert",
      "Published Author in AI Education"
    ],
    courses: [
      {
        title: "Machine Learning Basics",
        description: "A course designed to introduce students to the fundamentals of machine learning.",
        duration: "4 months"
      }
    ],
    testimonials: [
      {
        text: "Emily has an incredible ability to make complex AI concepts easy to understand. Highly recommend her courses.",
        author: "David P., Data Scientist"
      }
    ],
    contact: {
      email: "emilyjohnson@example.com",
      linkedin: "https://www.linkedin.com/in/emilyjohnson"
    }
  }
];

const EducatorPage = () => {
  const { id } = useParams();
  const educator = educatorData.find((educator) => educator.id === parseInt(id));

  if (!educator) {
    return <div>Educator not found!</div>;
  }

  return (
    <div className="educator-page">
      <header className="educator-header">
        <div className="educator-header-content">
          <img src={educator.photo} alt={educator.name} className="educator-photo" />
          <div className="educator-info">
            <h1 className="educator-name">{educator.name}</h1>
            <p className="educator-title">{educator.title}</p>
            <p className="educator-bio">{educator.bio}</p>
          </div>
        </div>
      </header>

      <section className="qualifications-section">
        <h2 className="section-title">Qualifications</h2>
        <ul className="qualifications-list">
          {educator.qualifications.map((qualification, index) => (
            <li key={index}>{qualification}</li>
          ))}
        </ul>
      </section>

      <section className="courses-section">
        <h2 className="section-title">Courses Taught</h2>
        <div className="courses-list">
          {educator.courses.map((course, index) => (
            <div key={index} className="course-card">
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <span className="course-duration">Duration: {course.duration}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <h2 className="section-title">Testimonials</h2>
        {educator.testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <p className="testimonial">"{testimonial.text}"</p>
            <span className="testimonial-author">- {testimonial.author}</span>
          </div>
        ))}
      </section>

      <section className="contact-section">
        <h2 className="section-title">Contact</h2>
        <p className="contact-info">
          Email: <a href={`mailto:${educator.contact.email}`}>{educator.contact.email}</a>
        </p>
        <p className="contact-info">
          LinkedIn: <a href={educator.contact.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/{educator.name.toLowerCase().replace(' ', '')}</a>
        </p>
      </section>
    </div>
  );
};

export default EducatorPage;