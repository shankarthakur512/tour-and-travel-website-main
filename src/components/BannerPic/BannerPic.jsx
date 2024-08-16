import React from "react";

const BannerPic = ({ img, title , description }) => {

  const bgImage = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "500px",
    position: "relative", 
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better text contrast
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "white", // Text color
    textAlign: "center", // Center align text
    padding: "0 20px", // Padding for mobile responsiveness
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)", // Text shadow for depth
  };

  const descriptionStyle = {
    fontSize: "1.25rem",
    lineHeight: "1.5",
    maxWidth: "800px", // Constrain the text width for readability
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)", // Text shadow for depth
  };

  return (
    <div data-aos="zoom-in" className="relative h-[500px] w-full" style={bgImage}>
      <div style={overlayStyle}>
        <h1 style={titleStyle}>{title}</h1>
        <p style={descriptionStyle}>{description}</p>
      </div>
    </div>
  );
};

export default BannerPic;
