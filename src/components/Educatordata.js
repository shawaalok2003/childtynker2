import React from 'react';
import { useParams } from 'react-router-dom';
import './EducatorPage.css';

const educatorData = [
  {
    id: 1,
    name: "Rashmee Kansal",
    title: "Robotics Trainer with 15+ Years of Experience",
    photo: "/images/Logo ChildTynker  (8).png",
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
    name: "Ashley",
    title: "Certified Global Robotics Trainer with 6+ Years of Experience",
    photo: "/images/Logo ChildTynker  (9).png",
    bio: "Ashley is a passionate robotics educator with over 6 years of experience in training students globally. She specializes in teaching hands-on robotics, automation, and coding. Her expertise includes designing interactive learning experiences for students of all ages.",
    qualifications: [
      "Bachelor’s in Computer Science and Robotics",
      "Certified Global Robotics Trainer",
      "Experience in AI-Integrated Robotics",
      "Speaker at International STEM Conferences"
    ],
    courses: [
      {
        title: "Foundations of Robotics",
        description: "An introductory course covering the basics of robotics, including mechanical design and programming fundamentals.",
        duration: "3 months"
      },
      {
        title: "AI in Robotics",
        description: "An advanced course that explores how artificial intelligence is applied in robotics.",
        duration: "5 months"
      },
      {
        title: "Hands-On Robotics for Kids",
        description: "A fun and engaging course designed for young learners to build and program simple robots.",
        duration: "2 months"
      }
    ],
    testimonials: [
      {
        text: "Ashley’s way of teaching robotics is fun and interactive. She makes complex topics easy to understand.",
        author: "Michael S., High School Student"
      },
      {
        text: "With Ashley's guidance, I built my first AI-powered robot. She is a fantastic mentor!",
        author: "Sarah T., University Student"
      }
    ],
    contact: {
      email: "ashley@example.com",
      linkedin: "https://www.linkedin.com/in/ashley"
    }
  },
  {
    id: 3,
    name: "Salman Mamdapur",
    title: "Robotics Trainer with 5+ Years of Experience",
    photo: "/images/Logo ChildTynker  (10).png",
    bio: "Salman Mamdapur is a dedicated robotics trainer with a strong background in automation and robotics engineering. With 5+ years of experience, he has trained students in building autonomous systems and developing AI-driven robots. His focus is on making robotics education accessible and practical.",
    qualifications: [
      "Master’s in Robotics Engineering",
      "Certified Automation and AI Specialist",
      "5+ Years of Experience in Robotics Training",
      "Trainer at Multiple Robotics Bootcamps"
    ],
    courses: [
      {
        title: "Autonomous Robotics",
        description: "Learn to design and program autonomous robots using sensors and AI algorithms.",
        duration: "4 months"
      },
      {
        title: "IoT and Robotics",
        description: "Explore the integration of Internet of Things (IoT) with robotics for smart automation.",
        duration: "3 months"
      },
      {
        title: "Advanced Arduino Robotics",
        description: "A hands-on course focused on developing robotics projects using Arduino.",
        duration: "2 months"
      }
    ],
    testimonials: [
      {
        text: "Salman’s deep knowledge of robotics helped me build complex projects with confidence.",
        author: "Rohit K., Engineering Student"
      },
      {
        text: "His IoT and Robotics course was incredibly insightful and practical.",
        author: "Aisha M., Robotics Enthusiast"
      }
    ],
    contact: {
      email: "salman.mamdapur@example.com",
      linkedin: "https://www.linkedin.com/in/salmanmamdapur"
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