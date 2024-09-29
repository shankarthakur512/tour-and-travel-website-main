import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { useSelector } from "react-redux";
import FounderImage from "../../assets/founder.jpg"
import ProfileImage from "./profile.png"
// import { VscAccount } from "";
import UserMenu from "./Usermenu";
import QueryModal from "./QueryModel"; // New component for the query modal

export const NavbarLinks = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Blogs", link: "/blogs" },
  { name: "Guide", link: "/local-guide" },
];

const DropdownLinks = [
  { name: "Our Services", link: "/#services" },
  { name: "Top Brands", link: "/#mobile_brands" },
  { name: "Location", link: "/#location" },
];

const Navbar = ({ handleSignUpPopup }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const status = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
//  console.log(userData.avatar)
  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-transparent backdrop-blur-sm text-black h-24 shadow-md">
        <div className="container py-3 mt-5 sm:py-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 font-bold text-2xl">
              <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
                <img src={Logo} alt="" className="h-16" />
              </Link>
            </div>

            <div className="hidden md:block">
              <ul className="flex items-center gap-6">
                {NavbarLinks.map((link) => (
                  <li key={link.name} className={`py-4 `}>
                    <NavLink to={link.link} activeClassName="active">
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                <li className="group relative cursor-pointer">
                  <a className="flex items-center gap-1">
                    Quick Links <FaCaretDown className="transition-transform duration-200 group-hover:rotate-180" />
                  </a>
                  <div className="absolute hidden group-hover:block bg-white p-2 shadow-lg rounded-md">
                    {DropdownLinks.map((link) => (
                      <a key={link.name} href={link.link} className="block py-2 px-4 hover:bg-gray-100">
                        {link.name}
                      </a>
                    ))}
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-4">
              {!status ? (
                <button
                  className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full"
                  onClick={handleSignUpPopup}
                >
                  Sign In
                </button>
              ) : (
                <div className="relative">
                  <img
                    src={ProfileImage || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  />
                  {showUserMenu && <UserMenu />}
                </div>
              )}

              <button
                className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full"
                onClick={() => setShowQueryModal(true)}
              >
                Query
              </button>

              <div className="md:hidden block">
                {showMenu ? (
                  <HiMenuAlt1 size={30} onClick={toggleMenu} className="cursor-pointer" />
                ) : (
                  <HiMenuAlt3 size={30} onClick={toggleMenu} className="cursor-pointer" />
                )}
              </div>
            </div>
          </div>
        </div>
        <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      </nav>

      {showQueryModal && <QueryModal setShowQueryModal={setShowQueryModal} />}
    </>
  );
};

export default Navbar;
