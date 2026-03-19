import React, { useState } from "react";
import axios from "axios"; // Import axios for API calls
import Hero from "../components/Hero/Hero";
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
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAhfu1ColdszhaVGqMs974LB3IUEHK_z38`,
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
      <div className="bg-cream">
        <Hero />
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
          className="fixed bottom-6 right-6 z-50 flex rounded-full border border-sand-dark bg-warm-white px-5 py-4 text-sm font-semibold text-forest shadow-soft transition hover:-translate-y-0.5 hover:bg-sand"
        >
          Ai Guide
        </button>

       
        {chatOpen && (
          <div className="fixed bottom-20 right-6 z-50 flex h-[60vh] w-[30vw] min-w-[320px] flex-col justify-between rounded-[28px] border border-sand-dark bg-warm-white p-4 shadow-luxury dark:bg-slate-800">
            <h2 className="mb-3 flex justify-center text-lg font-semibold text-forest">
              Your AI Buddy
            </h2>
            <div className="flex-grow overflow-y-auto p-2">
              {chatMessages.map((msg, index) => (
               <div className={`flex ${
                msg.isUser
                  ? "justify-start "
                  : " justify-end text-black "
              }`}>
                <span
                  key={index}
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
                <div className="self-end p-2 text-forest">Loading...</div>
              )}
            </div>
            {/* Input Section */}
            <div className="flex items-center border-t border-sand-dark pt-2">
              <input
                type="text"
                value={message}
                onChange={handleInputChange}
                
                  onKeyDown={(e) =>{
                    if(e.key === "Enter") handleSendMessage();
                  }} 
                placeholder="Type your question..."
                className="flex-1 rounded-lg px-2 py-2 outline-none dark:bg-gray-700"
              />
              {message ? (
                <FaPaperPlane
                  className="ml-2 cursor-pointer text-forest"
                  size={24}
                  
                />
              ) : (
                <FiMic className="ml-2 cursor-pointer text-forest" size={24} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
