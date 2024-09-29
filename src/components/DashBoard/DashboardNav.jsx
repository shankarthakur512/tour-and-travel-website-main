import React, { useState } from 'react';
import Logo from "../../assets/logo.png";
import { FaBars, FaUser, FaCog, FaSignOutAlt, FaBell } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

const DashboardNav = (
  {notify,setNotify}
) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
   const NavbarLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Blogs", link: "/blogs" },
    { name: "Guide", link: "/local-guide" },
  ];
  return (
    <div className="relative flex justify-between items-center p-4 bg-white ">
       <div className="flex items-center gap-4 font-bold text-2xl">
              <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
                <img src={Logo} alt="" className="h-12" />
              </Link>
            </div>
            <ul className="flex items-center gap-7">
  {NavbarLinks.map((link) => (
    <li key={link.name} className="py-4">
      <NavLink
        to={link.link}
        className={({ isActive }) =>
          isActive ? 'text-primary' : 'text-black'
        }
      >
        {link.name}
      </NavLink>
    </li>
  ))}
</ul>

      {/* Icons Section */}
      <div className="flex items-center gap-4">
        {/* Bell Icon */}
        <div className="cursor-pointer p-2 rounded-full hover:bg-gray-100">
          <FaBell size={20} onClick={()=>{setNotify(!notify)}}/>
        </div>

        {/* Menu Toggle */}
        <div className="cursor-pointer p-2 border rounded-full hover:bg-gray-100" onClick={toggleMenu}>
          <FaBars size={20}  />
        </div>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-0 top-16 bg-white text-black w-48 shadow-md rounded-md">
          <div className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
            <FaUser className="mr-2" /> Account
          </div>
          <div className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
            <FaCog className="mr-2" /> Settings
          </div>
          <div className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
            <FaSignOutAlt className="mr-2" /> Sign Out
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardNav;
