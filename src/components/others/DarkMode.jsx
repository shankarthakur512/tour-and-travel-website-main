import React, { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../Redux/Darkmode';

const DarkModeToggle = () => {
    const isDarkMode = useSelector((state) => state.darkMode.isDarkMode); // Get dark mode state from Redux
    const dispatch = useDispatch();

  const toggleDarkModehere = () => {
    if (!isDarkMode) {
        document.body.classList.add("dark");
        dispatch(toggleDarkMode());
      } else {
        document.body.classList.remove("dark");
        dispatch(toggleDarkMode());
      }
    
  };

  return (
    <button
      onClick={toggleDarkModehere}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};

export default DarkModeToggle;
