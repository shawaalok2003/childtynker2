// import React, { useState } from "react";
// import "./CourseCards.css";

// const CourseCards = () => {
//   const ageCourses = [
//     {
//       age: "3+",
//       courses: [
//         {
//           title: "Curriculum L1",
//           name: "Enlightened",
//           oldPrice: "₹20.00K",
//           newPrice: "₹18.00K",
//           sessions: "96 Sessions",
//           modules: ["Wise Child Program"],
//           certificate: "Duration: 3 months",
//           icon: "👶",
//         },
//       ],
//     },
//     {
//       age: "5+",
//       courses: [
//         {
//           title: "Curriculum L2",
//           name: "Entry Alpha A",
//           oldPrice: "₹22.00K",
//           newPrice: "₹19.50K",
//           sessions: "40 Sessions",
//           modules: ["Alpha A Software", "Basics of Exploration"],
//           certificate: "Duration: 2 months",
//           icon: "🐣",
//         },
//         {
//           title: "Curriculum L3",
//           name: "Entry Alpha B",
//           oldPrice: "₹22.00K",
//           newPrice: "₹19.50K",
//           sessions: "40 Sessions",
//           modules: ["Alpha B Software", "Intermediate Circuits"],
//           certificate: "Duration: 2 months",
//           icon: "🐤",
//         },
//         {
//           title: "Curriculum L4",
//           name: "Basic Alpha C",
//           oldPrice: "₹24.00K",
//           newPrice: "₹21.00K",
//           sessions: "40 Sessions",
//           modules: ["Alpha C Software", "Advanced Robotics Fundamentals"],
//           certificate: "Duration: 3 months",
//           icon: "🚀",
//         },
//       ],
//     },
//     {
//       age: "6+",
//       courses: [
//         {
//           title: "Curriculum L5",
//           name: "Basic Alpha X Starter Combined",
//           oldPrice: "₹26.00K",
//           newPrice: "₹22.00K",
//           sessions: "40 Sessions",
//           modules: ["Alpha X Starter", "Basics of Coding and Robotics"],
//           certificate: "Duration: 3 months",
//           icon: "🎮",
//         },
//       ],
//     },
//     {
//       age: "7+",
//       courses: [
//         {
//           title: "Curriculum L6",
//           name: "Strengthened Pioneer 1",
//           oldPrice: "₹30.00K",
//           newPrice: "₹27.00K",
//           sessions: "96 Sessions",
//           modules: ["Pioneer 1 Software", "Hardware Integration"],
//           certificate: "Duration: 4 months",
//           icon: "🛠️",
//         },
//       ],
//     },
//     {
//       age: "9+",
//       courses: [
//         {
//           title: "Curriculum L7",
//           name: "Advanced Pioneer 2 Arduino",
//           oldPrice: "₹35.00K",
//           newPrice: "₹31.50K",
//           sessions: "48 Sessions",
//           modules: ["Arduino-Based Projects", "Intermediate Robotics"],
//           certificate: "Duration: 2 months",
//           icon: "🤖",
//         },
//       ],
//     },
//     {
//       age: "10+",
//       courses: [
//         {
//           title: "Curriculum L8",
//           name: "Innovative AI/IOT Defender",
//           oldPrice: "₹40.00K",
//           newPrice: "₹36.00K",
//           sessions: "32 Sessions",
//           modules: ["AI & IoT Applications", "WiseKit Platform"],
//           certificate: "Duration: 1 month",
//           icon: "🧠",
//         },
//       ],
//     },
//     {
//       age: "12+",
//       courses: [
//         {
//           title: "Curriculum L8",
//           name: "Innovative WiseLand Robotics",
//           oldPrice: "₹42.00K",
//           newPrice: "₹37.80K",
//           sessions: "32 Sessions",
//           modules: ["12-in-1 Robotstrom", "Drone Programming"],
//           certificate: "Duration: 1 month",
//           icon: "🛸",
//         },
//       ],
//     },
//     {
//       age: "16+",
//       courses: [
//         {
//           title: "Curriculum L8",
//           name: "Innovative ROS Robotics",
//           oldPrice: "₹50.00K",
//           newPrice: "₹45.00K",
//           sessions: "32 Sessions",
//           modules: ["ROS Framework", "Advanced Robotics Concepts"],
//           certificate: "Duration: 1 month",
//           icon: "🌌",
//         },
//       ],
//     },
//   ];

//   const [selectedAge, setSelectedAge] = useState("3+");

//   // Filtered courses based on selected age
//   const filteredCourses =
//     selectedAge === "All"
//       ? ageCourses
//       : ageCourses.filter((group) => group.age === selectedAge);

//   return (
//     <div className="course-container">
//       {/* Age filter dropdown */}
//       <div className="filter-container">
//         <label htmlFor="ageFilter">Filter by Age:</label>
//         <select
//           id="ageFilter"
//           value={selectedAge}
//           onChange={(e) => setSelectedAge(e.target.value)}
//           className="filter-select"
//         >
//           {Array.from(new Set(ageCourses.map((group) => group.age))).map(
//             (age, index) => (
//               <option key={index} value={age}>
//                 {age}
//               </option>
//             )
//           )}
//         </select>
//       </div>

//       {/* Render filtered courses */}
//       {filteredCourses.map((ageGroup, index) => (
//         <div key={index} className="age-group">
//           <h2 className="header-text">
//             Suitable for children aged <span className="highlight">{ageGroup.age}</span>
//           </h2>
//           <div className="card-container">
//             {ageGroup.courses.map((course, idx) => (
//               <div key={idx} className="card">
//                 <div className="icon">{course.icon}</div>
//                 <h3 className="card-title">{course.title}</h3>
//                 <h2 className="course-name">{course.name}</h2>
//                 <p className="pricing">
//                   <span className="old-price">{course.oldPrice}</span>
//                   <span className="new-price">{course.newPrice}</span>
//                 </p>
//                 <p className="sessions">{course.sessions}</p>
//                 <h4>Modules in this course:</h4>
//                 <ul>
//                   {course.modules.map((module, idx) => (
//                     <li key={idx} className="module">
//                       {module}
//                     </li>
//                   ))}
//                 </ul>
//                 <p className="certificate">{course.certificate}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CourseCards;
import React, { useState } from "react";
import "./CourseCards.css";

const CourseCards = () => {
  const exchangeRate = 0.012; // Assuming 1 INR = 0.012 USD (This can be updated with real-time rates)
  const ageCourses = [
    {
      age: "3+",
      courses: [
        { 
          image: "/images/Image Gallery-20250306T121018Z-001/Image Gallery/Course age wise/WiseChild2-Elementary.png",
          title: "WiseChild Package",
          name: "WiseChild Package Elementary",
          oldPrice: 38399,
          newPrice: 38399,
          newPrice2: 32*1200, // Converting INR to USD
          sessions: "32 Classes / 32+ Projects",
          modules: [
            "BIS Certified Kit",
            "1:1 Live Classes by IIT/NIT Experts",
            "STEM.org Accreditation",
          ],
          certificate: "Duration: 3 months",
          icon: "👶",
          videoLink:
            "https://youtu.be/sNfXFfGP9-k?si=PqMfqLsg2cDfTUyo",
        },
        {
          image: "/images/Image Gallery-20250306T121018Z-001/Image Gallery/Course age wise/WiseChild2-Intermediate.png",
          title: "WiseChild Package",
          name: "WiseChild Package Intermediate",
          oldPrice: 70399,
          newPrice: 70399,
          newPrice2: 64*1200, // Converting INR to USD
          sessions: "64 Classes / 64+ Projects",
          modules: [
            "BIS Certified Kit",
            "1:1 Live Classes by IIT/NIT Experts",
            "STEM.org Accreditation",
          ],
          certificate: "Duration: 6 months",
          icon: "👶",
          videoLink:
            "https://youtu.be/sNfXFfGP9-k?si=PqMfqLsg2cDfTUyo",
        },
        {
          image: "/images/Image Gallery-20250306T121018Z-001/Image Gallery/Course age wise/WiseChild2-Adavanced.png",
          title: "WiseChild Package",
          name: "WiseChild Package Advanced",
          oldPrice: 95999,
          newPrice: 95999,
          newPrice2: 96*1200, // Converting INR to USD
          sessions: "96 Classes / 96+ Projects",
          modules: [
            "BIS Certified Kit",
            "1:1 Live Classes by IIT/NIT Experts",
            "STEM.org Accreditation",
          ],
          certificate: "Duration: 9 months",
          icon: "👶",
          videoLink:
            "https://youtu.be/sNfXFfGP9-k?si=PqMfqLsg2cDfTUyo",
        },
      ],
    },

    {
      age: "6+",
      courses: [
        {
          image: "/images/Image Gallery-20250306T121018Z-001/Image Gallery/Course age wise/Alpha Set A.png",
          title: "Alpha Series Package",
          name: "Alpha A",
          oldPrice: 38399,
          newPrice: 38399,
          newPrice2: 32*1200, // Converting INR to USD
          sessions: "32 Classes / 32+ Projects",
          modules: [
            "BIS Certified Kit",
            "1:1 Live Classes by IIT/NIT Experts",
            "STEM.org Accreditation",
          ],
          certificate: "Duration: 3 months",
          icon: "🐣",
          videoLink:
            "https://drive.google.com/file/d/1f0D3dsAIOrAY-mEr7JZj41B11cEkvA92/view",
        },
        {
          image: "/images/Image Gallery-20250306T121018Z-001/Image Gallery/Course age wise/Alpha Set B.png",
          title: "Alpha Series Package",
          name: "Alpha B",
          oldPrice: 70399,
          newPrice: 70399,
          newPrice2: 64*1200, // Converting INR to USD
          sessions: "64 Classes / 64+ Projects",
          modules: [
            "BIS Certified Kit",
            "1:1 Live Classes by IIT/NIT Experts",
            "STEM.org Accreditation",
          ],
          certificate: "Duration: 6 months",
          icon: "🐤",
          videoLink:
            "https://www.youtube.com/watch?v=E_fLelCZLbM&t=7s",
        },
        {
          image: "/images/Image Gallery-20250306T121018Z-001/Image Gallery/Course age wise/Alpha Set C.png",
          title: "Alpha Series Package",
          name: "Alpha C",
          oldPrice: 95999,
          newPrice: 95999,
          newPrice2: 96*1200, // Converting INR to USD
          sessions: "96 Classes / 96+ Projects",
          modules: [
            "BIS Certified Kit",
            "1:1 Live Classes by IIT/NIT Experts",
            "STEM.org Accreditation",
          ],
          certificate: "Duration: 9 months",
          icon: "🚀",
          videoLink: "https://www.youtube.com/watch?v=pO_qDfi5BgA",
        },
        {
          image: "/images/Image Gallery-20250306T121018Z-001/Image Gallery/Course age wise/Alpha Set X.png",
          title: "Alpha Series Package",
          name: "Alpha X",
          oldPrice: 95999,
          newPrice: 95999,
          newPrice2: 96*1200, // Converting INR to USD
          sessions: "96 Classes / 96+ Projects",
          modules: [
            "BIS Certified Kit",
            "1:1 Live Classes by IIT/NIT Experts",
            "STEM.org Accreditation",
          ],
          certificate: "Duration: 9 months",
          icon: "🚀",
          videoLink: "https://www.youtube.com/watch?v=pO_qDfi5BgA",
        },
      ],
    },
    {
      age: "8+",
      courses: [
        { 
          image: "/images/WhatsApp Image 2025-03-24 at 02.42.00.jpeg",
          title: "Starter ",
          name: "Starter ",
          oldPrice: 38399,
          newPrice: 38399,
          newPrice2: 30*1200, // Converting INR to USD
          sessions: "30 Classes / 30+ Projects",
          modules: [
            "BIS Certified Kit",
            "1:1 Live Classes by IIT/NIT Experts",
            "STEM.org Accreditation",
          ],
          certificate: "Duration: 3 months",
          icon: "👶",
          videoLink : "https://youtu.be/PM_FuZVt3Rs"
        },
        {
          image: "/images/WhatsApp Image 2025-03-24 at 02.44.05.jpeg",
          title: "Pioneer",
          name: "Pioneer",
          oldPrice: 70399,
          newPrice: 70399,
          newPrice2: 60*1200, // Converting INR to USD
          sessions: "60 Classes / 60+ Projects",
          modules: [
            "BIS Certified Kit",
            "1:1 Live Classes by IIT/NIT Experts",
            "STEM.org Accreditation",
          ],
          certificate: "Duration: 6 months",
          icon: "👶",
          videoLink : "https://youtu.be/IioZJIUVXhA?si=hjU0Z5zBrwMt3pUF"
        },
        {
          image: "/images/WhatsApp Image 2025-03-24 at 02.45.42.jpeg",
          title: "Adventure",
          name: "Adventure",
          oldPrice: 95999,
          newPrice: 95999,
          newPrice2: 100*1200, // Converting INR to USD
          sessions: "100 Classes / 100+ Projects",
          modules: [
            "BIS Certified Kit",
            "1:1 Live Classes by IIT/NIT Experts",
            "STEM.org Accreditation",
          ],
          certificate: "Duration: 9 months",
          icon: "👶",
          videoLink:"https://youtu.be/hxI0va1Vaco?si=n_gA-3VLc2bvEne0"
        },
      ],
    },
    {
      age: "10+",
      courses: [
        {
          title: "Drone Kit",
          name: "Drone Programming",
          oldPrice: 47999,
          newPrice: 47999,
          newPrice2: 36*1200, // Converting INR to USD
          sessions: "36 Sessions / 20+ Projects",
          modules: ["Drone Hardware", "Basic Drone Programming"],
          certificate: "Duration: 2 months",
          icon: "🛸",
          videoLink: null, // No video available
        },
        {
          image: "/images/WhatsApp Image 2025-03-24 at 02.51.05.jpeg",
          title: "Defender WiseKit",
          name: "AI and IoT Applications",
          oldPrice: 59999,
          newPrice: 59999,
          newPrice2: 50*1200, // Converting INR to USD
          sessions: "50 Sessions / 50+ Projects",
          modules: ["WiseKit Platform", "AI & IoT Integration"],
          certificate: "Duration: 3 months",
          icon: "🧠",
          videoLink:
            "https://youtu.be/imiMe4ZbDpY?si=Wnu0Qx6ksq8p_iS2",
        },
      ],
    },
    {
      age: "12+",
      courses: [
        {
          title: "IoT Mastery",
          name: "IoT Mastery and AI/ML Integration Projects",
          oldPrice: 48399,
          newPrice: 48399,
          newPrice2: 50*1200, // Converting INR to USD
          sessions: "50 Sessions / 20+ Projects",
          modules: ["IoT Projects", "Embedded Systems"],
          certificate: "Duration: 3 months",
          icon: "🌐",
          videoLink:
            "https://drive.google.com/file/d/1RWOmVTGAkusv2vTShgoOAlSXnnK3Fr1R/view?usp=drivesdk",
        },
        {
          title: "ML Basics",
          name: "Machine Learning",
          oldPrice: 75399,
          newPrice: 75399,
          newPrice2: 100*1200, // Converting INR to USD
          sessions: "100 Sessions / 40+ Projects",
          modules: ["ML Algorithms", "Python Integration"],
          certificate: "Duration: 6 months",
          icon: "🤖",
          videoLink:
            "https://drive.google.com/file/d/16R0AFQv74EgxBb73L_YeSg7PXA-madKx/view?usp=drivesdk",
        },
      ],
    },
  ];

  const [selectedAge, setSelectedAge] = useState("3+");

  const filteredCourses =
    selectedAge === "All"
      ? ageCourses
      : ageCourses.filter((group) => group.age === selectedAge);

  const formatCurrency = (amount) => {
    return `₹${new Intl.NumberFormat().format(amount)}`;
  };

  const formatUSD = (amount) => {
    return `₹${new Intl.NumberFormat().format(amount)}`;
  };

  return (
    <div className="course-container">
      <div className="filter-container">
        <label htmlFor="ageFilter">Filter by Age:</label>
        <select
          id="ageFilter"
          value={selectedAge}
          onChange={(e) => setSelectedAge(e.target.value)}
          className="filter-select"
        >
          {Array.from(new Set(ageCourses.map((group) => group.age))).map(
            (age, index) => (
              <option key={index} value={age}>
                {age}
              </option>
            )
          )}
        </select>
      </div>

      {filteredCourses.map((ageGroup, index) => (
        <div key={index} className="age-group">
          <h2 className="header-text">
            Suitable for children aged{" "}
            <span className="highlight">{ageGroup.age}</span>
          </h2>
          <div className="card-container">
            {ageGroup.courses.map((course, idx) => (
              <div key={idx} className="card">
              <img src={course.image} alt={course.name} className="course-image" />
                <h2 className="course-name">{course.name}</h2>
                <p className="pricing">
                  <span className="new-price2">{formatUSD(course.newPrice2)}</span>
                </p>
                <p className="sessions">{course.sessions}</p>
                <h4>Modules in this course:</h4>
                <ul>
                  {course.modules.map((module, idx) => (
                    <li key={idx} className="module">
                      {module}
                    </li>
                  ))}
                </ul>
                <p className="certificate">{course.certificate}</p>
                {course.videoLink ? (
                  <a
                    href={course.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-link"
                  >
                    📹 Watch Video
                  </a>
                ) : (
                  <p className="no-video">📹 Video Not Available</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCards;