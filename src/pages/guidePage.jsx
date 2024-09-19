import React, { useState, useEffect } from 'react';
import FounderImg from '../assets/founder.jpg';
import { FiMessageSquare } from "react-icons/fi";
import { IoCallSharp } from "react-icons/io5";
import ChatComponent from '../components/others/Chat';
import Testimonial from '../components/Testimonial/Testimonial';
import { FaStar } from 'react-icons/fa';

const GuidePage = () => {
  const [chatStarted, setChatStarted] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Mock online status (You can replace this with real-time data)
  useEffect(() => {
    const onlineStatus = Math.random() > 0.5;
    setIsOnline(onlineStatus);
  }, []);

  // Toggle Dark Mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Function to handle chat start
  const handleChatStart = () => {
    setChatStarted(true);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}  h-full transition-all duration-300 dark:bg-gray-900`}>
      {/* Chat Component */}
      {chatStarted && <ChatComponent darkMode={darkMode}

       setChatStarted={setChatStarted} />}
       <div className=' p-6 dark:bg-gray-900'>

      <div className='flex justify-between  items-center mb-6'>
        <h1 className='text-2xl font-semibold text-primary dark:text-white'>Guide Details</h1>
        <button 
          className='border px-4 py-2 rounded-lg hover:bg-secondary hover:text-white dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700' 
          onClick={toggleDarkMode}>
          Toggle Dark Mode
        </button>
      </div>

      {/* Guide Information and Image */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6  shadow-2xl p-6 rounded-lg dark:bg-gray-800 dark:text-gray-100'>
        <div className='flex justify-center'>
          <img src={FounderImg} alt='Profile_pic' loading='lazy' className='rounded-lg w-full h-auto max-w-sm' />
        </div>
        <section>
          <h1 className='text-xl font-semibold text-primary dark:text-gray-100'>About :</h1>
          <p className='p-3 text-justify text-base dark:text-gray-300'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor...
          </p>

          {/* Guide Details Section */}
          <div className='mt-6 text-base p-4 bg-white rounded-lg shadow-md dark:bg-gray-700'>
            <h2 className='text-lg text-primary font-semibold mb-3 dark:text-gray-200'>Guide Details</h2>

            <div className='space-y-2'>
              <p><strong className='text-secondary'>Name:</strong> John Doe</p>
              <p><strong>Address:</strong> 123 Main Street, City</p>
              <p><strong>Native Place:</strong> Hometown</p>
              <p><strong>Languages Known:</strong> English, Spanish</p>

              {/* Online/Offline Status */}
              <p className='flex items-center'>
                <strong>Status:</strong>
                <span className={`ml-2 font-semibold ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </p>

              {/* Rating Section */}
              <div className='flex items-center gap-2'>
                <strong>Rating:</strong> 
                <div className='flex'>
                  {[...Array(3)].map((_, i) => (
                    <FaStar key={i} className='text-yellow-500' />
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <FaStar key={i} className='text-gray-300' />
                  ))}
                </div>
                <span className='ml-2 text-sm text-gray-500 dark:text-gray-400'>(3.5/5)</span>
              </div>
            </div>
          </div>

          {/* Contact with Guide Section */}
          <div className=' mt-10 p-4 rounded-lg shadow-lg dark:bg-gray-700'>
            <h1 className='flex justify-center text-xl text-primary font-semibold dark:text-gray-200'>
              Contact your Guide
            </h1>
            <div className='flex gap-4 mt-5 justify-center'>
            <button
  onClick={handleChatStart}
  className='flex text-md border-2 border-primary text-secondary gap-2 px-3 py-2 rounded-lg hover:bg-secondary hover:text-white dark:text-gray-300 dark:hover:bg-primary 
  transition-transform duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1'
>
  <FiMessageSquare size={20} /> Chat With me
</button>

<button
  className='flex text-md border-2 border-primary text-secondary gap-2 px-3 py-2 rounded-lg hover:bg-secondary hover:text-white dark:text-gray-300 dark:hover:bg-primary 
  transition-transform duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1'
>
  <IoCallSharp size={20} /> Book a Call
</button>

    </div>
<p className='flex justify-center text-sm text-primary  mt-5 animate-pulse'>
  First five quieries are free
</p>
     {/* <span className='  '>
              Note<sup className='text-red-500'>*</sup> : Your can ask  5 queries  free on chat.
   </span> */}
   </div>
        </section>
      </div>

      {/* Testimonials Section */}
      <div className='mt-10 dark:bg-gr'>
        <Testimonial />
      </div>
      </div>
    </div>
  );
};

export default GuidePage;
