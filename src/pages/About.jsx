import React from "react";
import BlogsComp from "../components/Blogs/BlogsComp";
import Location from "../components/Location/Location";
import founderImage from "../assets/founder.jpg"; // Replace with actual image path
import { FaUsers, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 font-sans">
      <div className="container mx-auto py-16 px-6">

        {/* About Us Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 mb-16">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-primary border-b-4 border-primary pb-4 mb-4">Our Journey</h1>
            <p className="text-lg leading-relaxed">
              Travellogo started with a simple idea: to connect travelers with locals for authentic experiences. 
              Over time, we’ve built a community of people who share a passion for meaningful travel.
              From cultural tours to adventurous trips, our platform brings people together to discover the world.
            </p>
          </div>
          <img 
            src={founderImage} 
            alt="Founder" 
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        </section>

        {/* Meet the Founder */}
        <section className="py-16 bg-primary/10 rounded-lg px-10 mb-16 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <img
              src={founderImage}
              alt="Founder"
              className="w-56 h-56 rounded-full mb-6 mx-auto lg:mb-0 lg:mx-0 shadow-lg object-cover border-4 border-white"
            />
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">Meet Our Founder</h2>
              <h3 className="text-2xl font-semibold mb-2">Shankar</h3>
              <p className="text-lg leading-relaxed">
                Hi, I'm Shankar, an engineer with a passion for technology and travel. 
                Travellogo is my vision to bridge the gap between local guides and travelers, offering personalized experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Our Impact Section */}
        <section className="py-16 bg-white rounded-lg mb-16 text-center grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <FaUsers className="mx-auto text-5xl text-primary mb-4" />
            <h3 className="text-3xl font-bold">50K+</h3>
            <p className="text-lg">Users</p>
          </div>
          <div>
            <FaMapMarkerAlt className="mx-auto text-5xl text-primary mb-4" />
            <h3 className="text-3xl font-bold">5K+</h3>
            <p className="text-lg">Guides</p>
          </div>
          <div>
            <FaBriefcase className="mx-auto text-5xl text-primary mb-4" />
            <h3 className="text-3xl font-bold">10K+</h3>
            <p className="text-lg">Trips Hosted</p>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="py-16 bg-primary/10 rounded-lg px-10 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Get In Touch</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                className="p-4 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                className="p-4 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                placeholder="Your Email"
                required
              />
            </div>
            <textarea
              rows="4"
              className="w-full p-4 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              placeholder="Your Message"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-primary text-white p-4 rounded-lg hover:bg-secondary transition duration-300"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Our Locations Section */}
        <section className="py-16 bg-white rounded-lg px-10 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-primary">Our Locations</h2>
          <Location />
        </section>

        {/* Other Sections */}
        <section className="py-16">
          <BlogsComp />
        </section>
      </div>
    </div>
  );
};

export default About;
