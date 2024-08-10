import React, { useState } from 'react';
import { FaBars, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const DashboardNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative   flex justify-between items-center p-4">
      <div className="text-xl font-semi-bold">My Logo</div>
      <div className="cursor-pointer p-2 border rounded-full" onClick={toggleMenu}>
        <FaBars size={20} />
      </div>
      {menuOpen && (
        <div className="absolute right-0 top-16 bg-white text-black w-48 shadow-md rounded-md">
          <div className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
            <FaUser className="mr-2" /> Account
          </div>
          <div className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
            <FaCog className="mr-2" /> Settings
          </div>
          <div className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
            <FaSignOutAlt className="mr-2" /> Profile
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardNav;
