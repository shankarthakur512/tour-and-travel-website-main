import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1">
        <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Account
        </Link>
        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Settings
        </Link>
        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Profile
        </Link>
        <Link to="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Help
        </Link>
      </div>
    </div>
  );
};

export default UserMenu;
