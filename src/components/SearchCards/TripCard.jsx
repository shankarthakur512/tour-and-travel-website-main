import React from 'react';
import { FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function TripCard({ trip }) {
  const tripStartDate = new Date(trip.startingDate);
  const currentDate = new Date();
  const navigate = useNavigate();
  
  if (tripStartDate <= currentDate) return null;
 console.log(trip)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105" onClick={(e)=>{
      navigate(`/search/tour/${trip._id}`)
    }}>
    <img src={trip.photos[0]} alt={"img"} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{trip.tripName}</h3>
      <p className="text-gray-600 mb-2"><FaCalendarAlt className="inline mr-2" />{trip.duration} Days</p>
      <p className="text-gray-600 mb-4"><FaDollarSign className="inline mr-2" />{trip.price}</p>
      <button className="bg-primary text-white py-2 px-4 rounded-full hover:bg-secondary transition-colors duration-300">Book Now</button>
    </div>
  </div>
  );
}

export default TripCard;
