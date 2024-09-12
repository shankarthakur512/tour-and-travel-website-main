import React from 'react';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

function GuideCard({ guide }) {
  console.log(guide)
  return (

    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      
      <img src={guide.picture} alt={guide.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{guide.userInfo.fullname
        }</h3>
        <p className="text-gray-600 mb-2"><FaMapMarkerAlt className="inline mr-2" />{guide.city}</p>
        {/* <p className="text-gray-600 mb-2">{guide.native}</p> */}
        <div className="flex items-center mb-4">
          <FaStar className="text-yellow-400 mr-1" />
          <span>{guide.rating ? guide.rating : "No reviews"}</span>
        </div>
        <button className="bg-primary text-white py-2 px-4 rounded-full hover:bg-secondary transition-colors duration-300">Learn More</button>
      </div>
    </div>
  );
}

export default GuideCard;
