import React from "react";
import FooterLogo from "../../assets/logo.png";
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Best Places",
    link: "/best-places",
  },
  {
    title: "Blogs",
    link: "/blogs",
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 text-black py-10 relative">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5 lg:px-0">
        {/* Left Section */}
        <div>
          <h1 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold">
            <img src={FooterLogo} alt="Logo" className="max-h-[60px]" />
           
          </h1>
          <p className="text-sm mt-4 text-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
            facere ab hic accusamus omnis dolor voluptatibus illo, tempore eum
            tenetur.
          </p>
          <div className="mt-6">
            <div className="flex items-center gap-3 text-black">
              <FaLocationArrow />
              <p>Madhubani, Bihar</p>
            </div>
            <div className="flex items-center gap-3 mt-3 text-black">
              <FaMobileAlt />
              <p>+91 123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <a href="#" className="hover:text-primary">
              <FaInstagram className="text-3xl" />
            </a>
            <a href="#" className="hover:text-primary">
              <FaFacebook className="text-3xl" />
            </a>
            <a href="#" className="hover:text-primary">
              <FaLinkedin className="text-3xl" />
            </a>
          </div>
        </div>

        {/* Center and Right Sections */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h1 className="text-lg font-semibold mb-4">Tours</h1>
            <ul className="flex flex-col gap-3 text-black">
              {FooterLinks.map((link) => (
                <li key={link.title} className="hover:text-primary">
                  <Link to={link.link} onClick={() => window.scrollTo(0, 0)}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h1 className="text-lg font-semibold mb-4">Features</h1>
            <ul className="flex flex-col gap-3 text-black">
              {FooterLinks.map((link) => (
                <li key={link.title} className="hover:text-primary">
                  <Link to={link.link} onClick={() => window.scrollTo(0, 0)}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h1 className="text-lg font-semibold mb-4">Support</h1>
            <ul className="flex flex-col gap-3 text-black">
              {FooterLinks.map((link) => (
                <li key={link.title} className="hover:text-primary">
                  <Link to={link.link} onClick={() => window.scrollTo(0, 0)}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-primary text-center py-4">
        <p className="text-black">© 2024 All rights reserved || TravelloGo</p>
      </div>
    </footer>
  );
};

export default Footer;
