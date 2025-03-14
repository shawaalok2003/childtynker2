import React from "react";
import "./SchoolGallery.css"; // Import the CSS file

const imageList = [
  "1689629253683.jpg",
  "1689629253707.jpg",
  "1689629253732.jpg",
  "1689629253758.jpg",
  "1689629253781.jpg",
  "1689629253804.jpg",
  "1689629253827.jpg",
  "1689629253852.jpg",
  "1689629253877.jpg",
  "1689629253900.jpg",
  "1689629253921.jpg",
  "1689629253940.jpg",
  "1689629253970.jpg",
  "1689629253987.jpg",
  "1689629254003.jpg",
  "1689629254017.jpg",
  "1689629254038.jpg",
  "1689629254072.jpg",
  "1689629254087.jpg",
  "1689629254103.jpg",
];

const SchoolGallery = () => {
  return (
    <div className="gallery-container">
      <h2 className="gallery-title">School Gallery</h2>
      <div className="gallery-grid">
        {imageList.map((image, index) => (
          <div key={index} className="gallery-item">
            <img
              src={`/images/Image Gallery-20250306T121018Z-001/Image Gallery/Schools Images/${image}`}
              alt={`School ${index + 1}`}
              className="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolGallery;