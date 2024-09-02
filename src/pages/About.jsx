import React from "react";
import BlogsComp from "../components/Blogs/BlogsComp";
import Location from "../components/Location/Location";

// Import an image of yourself here
import founderImage from "../assets/founder.jpg"; // Replace with actual image path

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      <div className="container mx-auto py-16 px-6">
        
        {/* About Us Section */}
        <div className="py-16 bg-white rounded-lg shadow-md px-10 mb-16">
          <h1 className="text-4xl font-extrabold border-b-4 border-primary pb-4 mb-8 text-center text-primary">
            About Us
          </h1>
          <p className="text-lg leading-relaxed">
            At Travellogo, we are passionate about connecting travelers with local guides and hosts who can provide authentic and unique experiences. Our mission is to make travel more meaningful, personalized, and engaging by offering a platform that brings together people from all walks of life. Whether you're looking for a cultural immersion, an adventurous trek, or a relaxing retreat, we have something for everyone.
          </p>
        </div>

        {/* Our Founder Section */}
        <div className="py-16 bg-primary/10 rounded-lg shadow-md px-10 mb-16 flex flex-col lg:flex-row items-center lg:items-start">
          <img
            src={founderImage} // Your image
            alt="Founder"
            className="w-56 h-56 rounded-full mb-6 lg:mb-0 lg:mr-10 shadow-lg object-cover border-4 border-white"
          />
          <div className="lg:w-3/5">
            <h2 className="text-3xl font-bold mb-4 text-primary">Meet Our Founder</h2>
            <h3 className="text-2xl font-semibold mb-2">Shankar</h3>
            <p className="text-lg leading-relaxed">
              Hi, I'm Shankar, an engineer with a passion for technology and travel. I founded Travellogo to bridge the gap between local guides and travelers. I believe that the best way to explore a place is through the eyes of a local. With my experience in web development and my love for travel, I have created this platform to offer unique and personalized experiences for everyone.
            </p>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="py-16 bg-white rounded-lg shadow-md px-10 mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Example team member card */}
            {[
              { name: "John Doe", role: "Marketing Specialist", quote: "Passionate about connecting with people and creating meaningful travel experiences." },
              { name: "Jane Smith", role: "Product Designer", quote: "I love designing intuitive and beautiful interfaces that our users enjoy." },
              { name: "Samuel Green", role: "Full Stack Developer", quote: "Building scalable and efficient solutions to bring our vision to life." }
            ].map((member, index) => (
              <div key={index} className="bg-primary/5 p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary font-semibold">{member.role}</p>
                <p className="text-gray-600 mt-4 italic">"{member.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* About Our Website Section */}
        <div className="py-16 bg-primary/10 rounded-lg shadow-md px-10 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-primary">About Our Website</h2>
          <p className="text-lg leading-relaxed mb-6">
            Travellogo is a platform designed to make traveling easier and more personal. Whether you are a traveler looking for a local experience or a local wanting to share your culture and knowledge, our platform connects you directly with guides or hosts. Here’s how it works:
          </p>
          <ul className="list-disc list-inside text-lg mb-6 space-y-4">
            <li>
              <strong>Become a Guide or Host:</strong> Share your knowledge, culture, and favorite spots by becoming a guide. Simply register, complete your profile, and start offering trips.
            </li>
            <li>
              <strong>Book a Trip:</strong> Browse through various experiences offered by local guides. Select the one that suits you, book directly through the platform, and get ready for an adventure.
            </li>
            <li>
              <strong>Interactive Dashboard:</strong> Manage your trips, connect with travelers, and grow your business through our intuitive guide dashboard.
            </li>
          </ul>
          <p className="text-lg leading-relaxed">
            We strive to create a community of travelers and locals that fosters mutual respect, learning, and unforgettable memories.
          </p>
        </div>

        {/* Location Component with Improved Styling */}
        <div className="py-16 bg-white rounded-lg shadow-md px-10 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-primary">Our Locations</h2>
          <Location />
        </div>

        {/* Other Components */}
        <div className="py-16">
          <BlogsComp />
        </div>
      </div>
    </div>
  );
};

export default About;
