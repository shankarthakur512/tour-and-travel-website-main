import React, { useState, useEffect } from 'react';
import { FiMessageSquare } from "react-icons/fi";
import { IoCallSharp } from "react-icons/io5";
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';  // Import CSS for DatePicker
import { findGuide } from '../Apihandle/LocalGuide';
import ChatComponent from '../components/others/Chat';
import Testimonial from '../components/Testimonial/Testimonial';

const GuidePage = () => {
  const [chatStarted, setChatStarted] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [guideData, setGuideData] = useState(null);
  const [showBooking, setShowBooking] = useState(false); // For showing booking modal
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]); // Time slots for the day
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { guideId } = useParams();

  // Mock online status (replace with real-time logic later)
  useEffect(() => {
    const onlineStatus = Math.random() > 0.5;
    setIsOnline(onlineStatus);
  }, []);

  // Fetch guide data
  useEffect(() => {
    const getGuideData = async () => {
      try {
        const res = await axios.get(`${findGuide}/${guideId}`);
        console.log(res.data.guide);
        setGuideData(res.data.guide);
      } catch (error) {
        console.error(error);
      }
    };
    getGuideData();
  }, [guideId]);

  // Toggle Dark Mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Function to handle chat start
  const handleChatStart = () => setChatStarted(true);

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Generate time slots from 8 AM to 7 PM (with 1-hour slots)
    const slots = [];
    for (let i = 8; i <= 18; i++) {
      slots.push(`${i}:00`);
    }
    setTimeSlots(slots);
  };

  // Handle slot selection
  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  // Handle modal close
  const closeModal = () => setShowBooking(false);

  // Render Booking Modal
  const renderBookingModal = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/3 p-6">
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-lg font-semibold mb-4 text-primary dark:text-gray-200">Book a Call</h2>

          {/* DatePicker Component */}
          <div className="mb-4">
            <label className="block mb-2 dark:text-gray-200">Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat='yyyy/MM/dd'
              className="p-2 border rounded w-full dark:bg-gray-600 dark:border-gray-500"
              placeholderText='Click to select a date'
            />
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <>
              <label className="block mb-2 dark:text-gray-200">Available Slots:</label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlotClick(slot)}
                    className={`p-2 rounded-lg border dark:border-gray-600 ${selectedSlot === slot ? 'bg-red-500 text-white' : 'bg-white dark:bg-gray-800'} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300`}>
                    {slot}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Show selected time and Save button */}
          {selectedSlot && (
            <div className="mt-4">
              <p className="mb-2 dark:text-gray-200">Selected Time Slot: {selectedSlot}</p>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300">
                Confirm and Save
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} h-full transition-all duration-300 dark:bg-gray-900`}>
      {/* Chat Component */}
      {chatStarted && <ChatComponent darkMode={darkMode} setChatStarted={setChatStarted} />}

      <div className='p-6 dark:bg-gray-900'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-semibold text-primary dark:text-white'>Guide Details</h1>
          <button 
            className='border px-4 py-2 rounded-lg hover:bg-secondary hover:text-white dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
            onClick={toggleDarkMode}>
            Toggle Dark Mode
          </button>
        </div>

        {/* Guide Information and Image */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 shadow-2xl p-6 rounded-lg dark:bg-gray-800 dark:text-gray-100'>
          <div className='flex justify-center'>
            <img 
              src={guideData?.picture || guideData?.userDetails?.avatar || 'default_avatar.jpg'} 
              alt='Profile_pic' 
              loading='lazy' 
              className='rounded-lg w-full h-auto max-w-sm' 
            />
          </div>
          <section>
            <h1 className='text-xl font-semibold text-primary dark:text-gray-100'>About :</h1>
            <p className='p-3 text-justify text-base dark:text-gray-300'>
              {guideData?.aboutYourself || 'Guide information not available.'}
            </p>

            {/* Guide Details Section */}
            <div className='mt-6 text-base p-4 bg-white rounded-lg shadow-md dark:bg-gray-700'>
              <h2 className='text-lg text-primary font-semibold mb-3 dark:text-gray-200'>Guide Details</h2>
              <div className='space-y-2'>
                <p><strong className='text-secondary'>Name:</strong> {guideData?.userDetails?.fullname || 'Not provided'}</p>
                <p><strong>Address:</strong> {guideData?.address || 'Not provided'}</p>
                <p><strong>Native Place:</strong> {guideData?.native || 'Not provided'}</p>
                <p><strong>Languages Known:</strong> {guideData?.languages?.join(', ') || 'Not provided'}</p>

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
                  <span className='ml-2 text-sm text-gray-500 dark:text-gray-400'>(3/5)</span>
                </div>
              </div>

              {/* Booking and Chat Buttons */}
              <div className='flex gap-3 mt-4'>
                <button
                  className='px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300'
                  onClick={() => setShowBooking(true)}>
                  <IoCallSharp className='inline mr-1' /> Book a Call
                </button>
                <button
                  className='px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300'
                  onClick={handleChatStart}>
                  <FiMessageSquare className='inline mr-1' /> Chat
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && renderBookingModal()}

      {/* Testimonials Section */}
      <Testimonial />
    </div>
  );
};

export default GuidePage;
