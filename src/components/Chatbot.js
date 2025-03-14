import React, { useState } from "react";
import "./Chatbot.css";
import { IoSend, IoChatbubbles, IoClose } from "react-icons/io5";

const faqs = [
  {
    question: "Why start at a young age?",
    answer:
      "Starting young helps children develop problem-solving and critical thinking skills early, making them more adaptable learners.",
  },
  {
    question: "How is ChildTynker different?",
    answer:
      "ChildTynker offers hands-on robotics, coding, and creative STEM learning designed specifically for kids.",
  },
  {
    question: "Will this help in academics?",
    answer:
      "Yes! Learning robotics and coding improves logical thinking and problem-solving skills, enhancing academic performance.",
  },
  {
    question: "What is Robotics for Kids?",
    answer:
      "It introduces children to robots, coding, and technology, allowing them to build and program their own projects.",
  },
  {
    question: "Is this suitable for beginners?",
    answer:
      "Yes! This course is perfect for kids aged 3+ with no prior coding experience.",
  },
  {
    question: "Do I need to buy the kit separately?",
    answer:
      "No, the cost of the software and kit is already included in the price. If you already have the kit, you can opt for training-only pricing.",
  },
  {
    question: "What is the format of the course?",
    answer:
      "It is a live online course with 1:1 interactive sessions where students build projects with a trainer.",
  },
  {
    question: "What is the Dual Teach Model?",
    answer:
      "This model involves two teachers—one for teaching and another as a mentor for additional support.",
  },
];

const websiteData = {
  "book class": "You can book your first free class from the Hero Section!",
  "download curriculum": "You can download the curriculum by clicking the button in the Hero Section.",
  "course duration":
    "The course is structured with weekly sessions, with one project per session and homework tasks.",
  "contact support": "For support, please reach out to us through the Contact Us page on the website.",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const getResponse = (userInput) => {
    // Check FAQ responses
    const faqResponse = faqs.find((faq) =>
      userInput.toLowerCase().includes(faq.question.toLowerCase())
    );
    if (faqResponse) return faqResponse.answer;

    // Check website data responses
    const websiteResponse = Object.keys(websiteData).find((key) =>
      userInput.toLowerCase().includes(key)
    );
    if (websiteResponse) return websiteData[websiteResponse];

    // Default response
    return "I'm not sure about that. You can check our website or contact support for more details.";
  };

  const handleSend = () => {
    if (input.trim() === "") return;

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
    <button
    className="chatbot-toggle"
    onClick={toggleChatbot}
    style={{
      backgroundColor: "#19aa03",
      color: "white",
      border: "none",
      width: "60px", // Increased size
      height: "60px", // Increased size
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px", // Increased icon size
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      transition: "background 0.3s ease, transform 0.2s ease-in-out, box-shadow 0.2s"
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = "#148b02";
      e.target.style.transform = "scale(1.1)";
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = "#19aa03";
      e.target.style.transform = "scale(1)";
    }}
    onMouseDown={(e) => {
      e.target.style.transform = "scale(0.95)";
    }}
    onMouseUp={(e) => {
      e.target.style.transform = "scale(1.1)";
    }}
  >
    {isOpen ? <IoClose size={30} /> : <IoChatbubbles size={30} />} 
  </button>

      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <h4>Chat Support</h4>
            <button onClick={toggleChatbot}>
              <IoClose size={20} />
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>
              <IoSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;