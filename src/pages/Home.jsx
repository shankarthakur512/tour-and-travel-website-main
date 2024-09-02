import React, { useState } from "react";
import axios from "axios"; // Import axios for API calls
import Hero from "../components/Hero/Hero";
import NatureVid from "../assets/video/main.mp4";
import BlogsComp from "../components/Blogs/BlogsComp";
import Places from "../components/Places/Places";
import Testimonial from "../components/Testimonial/Testimonial";
import Banner from "../components/Banner/Banner";
import BannerPic from "../components/BannerPic/BannerPic";
import BannerImg from "../assets/places/Banner1.jpg";
import Banner2 from "../assets/places/Banner2.jpg";
import OrderPopup from "../components/OrderPopup/OrderPopup";
import BannerPic2 from "../components/BannerPic/BannerPic2";
import { FiMic } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";

const Home = () => {
  const [orderPopup, setOrderPopup] = useState(false);
  const [chatOpen, setChatOpen] = useState(false); // State for chat visibility
  const [message, setMessage] = useState(""); // State for the chat input
  const [chatMessages, setChatMessages] = useState([]); // State to manage chat messages
  const [isLoading, setIsLoading] = useState(false); // State to show loading

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to the chat
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: true },
    ]);
    setMessage(""); // Clear input field

    // Show loader while waiting for AI response
    setIsLoading(true);

    try {
      // Make the API call to Gemini
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAy2hPGLQOIctPri4vVd421BEg9krez08w`,
        {
          contents: [{ parts: [{ text: message }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Add AI response to the chat
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.candidates[0].content.parts[0].text, isUser: false },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: "Failed to get a response. Please try again.", isUser: false },
      ]);
    } finally {
      setIsLoading(false); // Hide loader after response
    }
  };

  const title = "Discover the Beauty of the Himalayas";
  const description =
    "Join us on an unforgettable journey to the majestic Himalayas. Experience breathtaking views, serene landscapes, and a rich cultural heritage like never before.";

  return (
    <>
      <div>
        <div className="h-[700px] relative">
          <video
            autoPlay
            loop
            muted
            className="absolute right-0 top-0 h-[700px] w-full object-cover z-[-1]"
          >
            <source src={NatureVid} type="video/mp4" />
          </video>
          <Hero />
        </div>
        <Places handleOrderPopup={handleOrderPopup} />
        <BannerPic img={BannerImg} title={title} description={description} />
        <BlogsComp />
        <Banner />
        <BannerPic2 img={Banner2} />
        <Testimonial />
        <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />

        {/* Chatbot Button */}
        <button
          onClick={handleChatToggle}
          className="fixed bottom-6 border flex border-primary right-6 text-primary p-4 rounded-full shadow-lg hover:bg-secondary transition-all z-50"
        >
          Ai Guide
        </button>

        {/* Chat Interface */}
        {chatOpen && (
          <div className="fixed bottom-16 right-6 w-[30vw] bg-white shadow-xl rounded-lg p-4 z-50 flex flex-col justify-between h-[60vh]">
            <h2 className="flex justify-center text-primary text-lg font-semibold mb-3">
              Your AI Buddy
            </h2>
            {/* Chat messages section */}
            <div className="flex-grow overflow-y-auto p-2">
              {chatMessages.map((msg, index) => (
               <div className={`flex ${
                msg.isUser
                  ? "justify-start "
                  : " justify-end  "
              }`}>
                <span
                  key={index} // Use index as fallback for unique key
                  className={`mb-2 p-2 rounded-lg ${
                    msg.isUser
                      ? "bg-primary justify-start self-start p-3 text-white"
                      : "bg-gray-100 justify-end  self-end p-3"
                  }`}
                >
                  {msg.text}

                </span>
                </div>
              ))}
              {isLoading && (
                <div className="self-end p-2 text-primary">Loading...</div>
              )}
            </div>
            {/* Input Section */}
            <div className="flex items-center border-t pt-2">
              <input
                type="text"
                value={message}
                onChange={handleInputChange}
                
                  onKeyDown={(e) =>{
                    console.log(e)
                    if(e.key === "Enter") handleSendMessage();
                  }} 
                placeholder="Type your question..."
                className="flex-1 outline-none px-2 py-2"
              />
              {message ? (
                <FaPaperPlane
                  className="text-primary ml-2 cursor-pointer"
                  size={24}
                  
                />
              ) : (
                <FiMic className="text-primary ml-2 cursor-pointer" size={24} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
