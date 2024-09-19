import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";

const ChatComponent = ({ darkMode, setChatStarted }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  // Start the timer on component mount
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timerInterval); // Cleanup on unmount
  }, []);

  // Timer format function
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-1/3 p-4 rounded-lg transition-transform duration-500 ease-in-out transform translate-x-0 border-primary border-r ml-4 shadow-lg ${
        darkMode ? 'dark bg-gray-800 text-white' : 'bg-white text-black'
      }`}
    >
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-semibold'>
          {darkMode ? 'Dark Mode Chat' : 'Chat with your Guide'}
        </h2>
        <div className={`text-sm px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-primary text-white'}`}>
          Time Left: {formatTime(timeLeft)}
        </div>
        <IoClose
          size={24}
          onClick={() => {
            setChatStarted(false);
          }}
          className={`cursor-pointer ${darkMode ? 'text-white' : 'text-gray-500'} hover:text-gray-700`}
        />
      </div>
      <div className='flex flex-col h-full'>
        {/* Chat Messages Section */}
        <div className={`h-[80vh] border p-4 mb-4 overflow-y-scroll ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200'}`}>
          Chat messages will appear here...
        </div>
        {/* Message Input */}
        <div className='flex items-center gap-2'>
          <input
            type='text'
            placeholder='Type a message...'
            className={`flex-1 border px-4 py-2 rounded-lg ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'}`}
          />
          <button className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-secondary text-white'}`}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
