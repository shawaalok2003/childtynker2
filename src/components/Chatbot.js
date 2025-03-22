import React, { useState } from "react";
import "./Chatbot.css";
import { IoSend, IoChatbubbles, IoClose } from "react-icons/io5";

const faqs = [
  { question: "Why start at a young age?", answer: "Starting young helps children develop problem-solving and critical thinking skills early, making them more adaptable learners." },
  { question: "How is ChildTynker different?", answer: "ChildTynker offers hands-on robotics, coding, and creative STEM learning designed specifically for kids." },
  { question: "Will this help in academics?", answer: "Yes! Learning robotics and coding improves logical thinking and problem-solving skills, enhancing academic performance." },
  { question: "What is Robotics for Kids?", answer: "It introduces children to robots, coding, and technology, allowing them to build and program their own projects." },
  { question: "Is this suitable for beginners?", answer: "Yes! This course is perfect for kids aged 3+ with no prior coding experience." },
  { question: "Do I need to buy the kit separately?", answer: "No, the cost of the software and kit is included in the price. If you already have the kit, you can opt for training-only pricing." },
  { question: "What is the format of the course?", answer: "It is a live online course with 1:1 interactive sessions where students build projects with a trainer." },
  { question: "What is the Dual Teach Model?", answer: "This model involves two teachers—one for teaching and another as a mentor for additional support." },
  { question: "What coding languages are covered?", answer: "The curriculum covers Scratch, Python, and introductory JavaScript for kids at different levels." },
  { question: "Are there certifications?", answer: "Yes! After completing each level, kids receive a certificate recognized in STEM education." },
  { question: "Can parents track progress?", answer: "Yes, parents get access to a dashboard to monitor their child's learning journey." },
  { question: "Is there a trial class?", answer: "Yes! You can book a free trial class from our website." },
  { question: "Do classes have flexible timing?", answer: "Yes! We offer multiple time slots to suit different schedules." },
  { question: "What devices are required?", answer: "A laptop or tablet with a stable internet connection is recommended." },
];

const websiteData = {
    "book class": "You can book your first free class from the Hero Section!",
    "download curriculum": "You can download the curriculum by clicking the button in the Hero Section.",
    "course duration": "The course is structured with weekly sessions, with one project per session and homework tasks.",
    "contact support": "For support, please reach out to us through the Contact Us page on our website.",
    "pricing details": "You can find our pricing details on the Pricing page of our website.",
    "refund policy": "Our refund policy allows cancellations within the first 7 days with a full refund.",
    "learning levels": "We offer Beginner, Intermediate, and Advanced levels tailored to different age groups.",
    "teaching methodology": "Our curriculum is project-based, ensuring kids learn by doing rather than just theory.",
    "certifications offered": "Upon course completion, students receive a certificate recognized in STEM education.",
    "trial class availability": "We offer a free trial class for new students to experience our teaching approach.",
    "class scheduling": "Classes are scheduled flexibly to accommodate different time zones and student availability.",
    "required equipment": "Students need a computer with internet access; specific courses may require additional tools.",
    "parental involvement": "Parents can track progress through our dashboard and are encouraged to support learning at home.",
    "student community": "Students can join our online community to collaborate and share projects.",
    "instructor qualifications": "Our instructors are experienced professionals with backgrounds in STEM education.",
    "course prerequisites": "No prior experience is required; courses are designed to cater to various skill levels.",
    "homework policy": "Homework is assigned to reinforce learning and is reviewed in subsequent sessions.",
    "progress tracking": "Our platform provides real-time progress tracking for students and parents.",
    "age groups": "Courses are designed for children aged 3 to 16, with content tailored to each age group.",
    "platform compatibility": "Our courses are accessible on Windows, macOS, and Linux platforms.",
    "interactive sessions": "Classes are interactive, encouraging student participation and hands-on learning.",
    "support materials": "We provide supplementary materials and resources to enhance the learning experience.",
    "course updates": "Curricula are regularly updated to include the latest developments in STEM fields.",
    "feedback mechanism": "We welcome feedback from students and parents to continually improve our courses.",
    "safety measures": "We prioritize online safety with secure platforms and monitored interactions.",
    "payment options": "Various payment options are available, including credit card, debit card, and online banking.",
    "scholarship opportunities": "We offer scholarships for eligible students; details are available on our website.",
    "extracurricular activities": "Students can participate in coding competitions and workshops to enhance skills.",
    "course customization": "Courses can be tailored to meet individual learning needs and goals.",
    "language support": "Our courses are primarily in English, with support for other languages as needed.",
    "technical support": "Technical assistance is available to resolve any platform-related issues.",
    "holiday breaks": "Classes are paused during major holidays; schedules are communicated in advance.",
    "attendance policy": "Regular attendance is encouraged; makeup classes are available upon request.",
    "course materials": "All necessary materials are provided digitally; some courses may require physical kits.",
    "project showcases": "Students have opportunities to showcase their projects in our online gallery.",
    "alumni network": "Graduates can join our alumni network for continued learning and networking.",
    "career guidance": "We offer career guidance for older students interested in STEM fields.",
    "partnerships": "We collaborate with schools and organizations to promote STEM education.",
    "environmental initiatives": "Our projects often include themes on sustainability and environmental awareness.",
    "accessibility features": "Our platform includes features to support learners with disabilities.",
    "data privacy": "We adhere to strict data privacy policies to protect our users' information.",
    "terms of service": "Our terms of service outline user responsibilities and rights.",
    "code of conduct": "We maintain a code of conduct to ensure a respectful learning environment.",
    "contact information": "You can reach us via email at support@childtynker.com or call us at +1-800-123-4567.",
    "social media": "Follow us on social media for updates and community stories.",
    "newsletters": "Subscribe to our newsletter for the latest news and special offers.",
    "mobile app": "Access our courses on-the-go with our mobile app, available for iOS and Android.",
    "faq": "Visit our FAQ page for answers to common questions.",
    "blog": "Read our blog for articles on STEM education and parenting tips.",
    "testimonials": "Hear from other parents and students about their experiences with ChildTynker.",
    "mission statement": "Our mission is to empower children with the skills to thrive in a technology-driven world.",
    "values": "We value creativity, curiosity, and a commitment to lifelong learning.",
    "partnership inquiries": "For partnership opportunities, contact us at partnerships@childtynker.com.",
    "media inquiries": "For media inquiries, please email media@childtynker.com.",
    "careers": "Join our team! Visit our careers page for current openings.",
    "volunteer opportunities": "Volunteer with us to support STEM education in your community.",
    "donations": "Support our initiatives by making a donation through our website.",
    "events": "Check out our upcoming events and webinars on our events page.",
    "press releases": "Read our latest press releases in the news section.",
    "research collaborations": "We collaborate on research projects to advance STEM education methodologies.",
    "franchise opportunities": "Learn about franchising opportunities with ChildTynker.",
    "international programs": "We offer programs tailored for international students.",
    "custom workshops": "Request custom workshops for schools or organizations.",
    "gift cards": "Purchase gift cards for our courses to inspire young learners.",
    "referral program": "Refer a friend and receive discounts on future courses.",
    "loyalty program": "Join our loyalty program for exclusive benefits.",
    "accreditations": "Our courses are accredited by leading STEM education organizations.",
    "awards": "We have been recognized for excellence in STEM education.",
    "community outreach": "We are committed to giving back through community outreach programs.",
    "sustainability efforts": "Learn about our efforts to promote sustainability within our organization.",
    "annual report": "View our annual report for insights into our impact and growth.",
    "investor relations": "For investor information, please contact investors@childtynker.com.",
    "technology partners": "We partner with leading technology companies to enhance our offerings.",
    "curriculum developers": "Our curriculum is developed by experts in education and technology.",
    "student success stories": "Read success stories from our students around the world.",
    "parent testimonials": "Hear from parents about their children's experiences with ChildTynker.",
    "student testimonials": "Our students share their thoughts on our courses and projects.",
    "educator resources": "We provide resources for educators to integrate",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! Welcome to ChildTynker. How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const toggleChatbot = () => setIsOpen(!isOpen);

  const getResponse = (userInput) => {
    const faqResponse = faqs.find((faq) => userInput.toLowerCase().includes(faq.question.toLowerCase()));
    if (faqResponse) return faqResponse.answer;

    const websiteResponse = Object.keys(websiteData).find((key) => userInput.toLowerCase().includes(key));
    if (websiteResponse) return websiteData[websiteResponse];

    return "I'm not sure about that. You can check our website or contact support for more details.";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    
    setTimeout(() => {
      const botResponse = { text: getResponse(input), sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
    
    setInput("");
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        {isOpen ? <IoClose size={30} /> : <IoChatbubbles size={30} />} 
      </button>
      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <h4>Chat with ChildTynker</h4>
            <button onClick={toggleChatbot}><IoClose size={20} /></button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>{msg.text}</div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}><IoSend size={20} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
