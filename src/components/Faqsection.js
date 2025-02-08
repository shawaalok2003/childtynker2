import React, { useState } from 'react';
import './FAQSection.css';

const faqs = [
  {
    question: "Why start at a young age? How can my kid grasp all the knowledge from a nascent age?",
    answer: "Starting young helps children develop problem-solving and critical thinking skills early, making them more adaptable learners. Kids can grasp concepts through interactive and age-appropriate activities."
  },
  {
    question: "How is childtynker different from others?",
    answer: "childtynker offers a unique blend of hands-on robotics, coding, and creative STEM learning designed specifically for kids, fostering both technical skills and creativity."
  },
  {
    question: "Will it help my child improve their performance in academics?",
    answer: "Yes! By learning robotics and coding, children improve their logical thinking and problem-solving skills, which are directly beneficial for academic performance."
  },
  {
    question: "What is Robotics for Kids?",
    answer: "Robotics for Kids introduces children to the world of robots, coding, and technology, empowering them to build and program their own projects."
  },
  {
    question: "Why should kids learn robotics?",
    answer: "Learning robotics equips kids with future-ready skills, fosters creativity, and prepares them for careers in technology and engineering."
  },
  {
    question: "Is this suitable for kids who have never done any coding before?",
    answer: "Yes. This is the perfect course for kids aged 3+ who have never done any coding before. If your kids love tech and want to make their own awesome software and video games, then they should join this course today!"
  },
  {
    question: "Do I need to pay separately for the software and kit used in the course?",
    answer: "The cost of the software and kit are already included in the MRP. If you are an existing Child Tynker customer who already have our kits and just want the training, then click on the 'I already have the kit' option to see the training-only cost."
  },
  {
    question: "What is the format of the course?",
    answer: "It is a live online course with 1:1 Live interactive class, where each week the students make one new project with a trainer on video call, and get one project as homework."
  },
  {
    question: "What is the Dual Teach Model?",
    answer: "The dual teacher model involves two teachers, where one is responsible for teaching and the other acts as mentor support. Their diverse strengths enhance teaching strategies, supporting varied learning needs, fostering collaboration, and boosting student engagement."
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h1 className="faq-title">Explore more of <span className="brand-name">childtynker</span> universe</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-icon">{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;