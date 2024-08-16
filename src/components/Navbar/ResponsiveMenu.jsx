import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NavbarLinks } from "./Navbar";
import { useSelector } from "react-redux";

const ResponsiveMenu = ({ showMenu, setShowMenu }) => {
  const userData = useSelector((state) => state.auth.userData) || { fullname: 'User' };

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 h-screen w-[75%] flex flex-col bg-white text-black transition-all duration-300 rounded-r-xl shadow-lg p-6`}
    >
      <div className="flex items-center gap-3">
        <FaUserCircle size={40} />
        <div>
          <h1 className="text-xl font-semibold">{userData.fullname}</h1>
          <p className="text-sm text-gray-500">Premium user</p>
        </div>
      </div>

      <nav className="mt-10">
        <ul className="space-y-4 text-lg">
          {NavbarLinks.map((data) => (
            <li key={data.name}>
              <Link to={data.link} onClick={() => setShowMenu(false)}>
                {data.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ResponsiveMenu;
