import React from "react";

const BannerPic2 = ({ img}) => {
   
    const title = "Explore the Wonders of Bali";
    const description =
      "Subscribe to our newsletter and be the first to know about the best travel deals, exclusive offers, and upcoming events in Bali.";
  const bgImage = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "600px", // Increased height to accommodate the newsletter section
    position: "relative",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    padding: "0 20px",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
  };

  const descriptionStyle = {
    fontSize: "1.25rem",
    lineHeight: "1.5",
    maxWidth: "800px",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
    marginBottom: "40px",
  };

  const newsletterContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  };

  const inputStyle = {
    padding: "10px 15px",
    fontSize: "1rem",
    borderRadius: "5px 0 0 5px",
    border: "none",
    outline: "none",
    minWidth: "250px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "0 5px 5px 0",
    backgroundColor: "#ff7f50", // Coral color for the button
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <div data-aos="zoom-in" className="relative h-[600px] w-full" style={bgImage}>
      <div style={overlayStyle}>
        <h1 style={titleStyle}>{title}</h1>
        <p style={descriptionStyle}>{description}</p>
        <div style={newsletterContainerStyle}>
          <input
            type="email"
            placeholder="Enter your email"
            style={inputStyle}
          />
          <button style={buttonStyle} onMouseEnter={(e) => (e.target.style.backgroundColor = "#ff6347")} onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff7f50")}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerPic2;
