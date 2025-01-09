import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../Redux/authslice";
import { useDispatch } from "react-redux";

const UserMenu = () => {
const dispatch = useDispatch();
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
        <button onClick={() => {dispatch(logout())
          persistor.purge();
        }} className="block border w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
  Logout
</button>
      </div>
    </div>
  );
};

export default UserMenu;
