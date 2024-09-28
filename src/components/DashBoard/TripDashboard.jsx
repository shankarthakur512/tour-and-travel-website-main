import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FindTripsByLocalGuide } from "../../Apihandle/Trips";
import { addTrip } from "../../Redux/Tripslice";
import { FaTrashAlt, FaStopCircle, FaPlusCircle } from "react-icons/fa"; // Import icons from react-icons
import { registerGuide } from "../../Apihandle/LocalGuide";

function TripDashboard({ GuideRegisterd }) {
 
  const [ error , setError] = useState(false)
  const GuideData = useSelector((state) => state.Guide?.userData);
  const trips = useSelector((state) => state.Trips.trips);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(GuideRegisterd)
  useEffect(() => {
    if (trips.length === 0 && GuideData) {
      const fetchTrips = async () => {
        try {
          const { data } = await axios.get(`${FindTripsByLocalGuide}/${GuideData._id}`);
          data.trips.forEach((tripData) => {
            dispatch(addTrip({ tripData }));
          });
        } catch (error) {
          console.error("Error fetching trips:", error);
        }
      };

      fetchTrips();
    }
  }, [GuideData, trips.length, dispatch]);

  const handleCancelTour = (tripId) => {
    console.log("Cancel Tour", tripId);
    // Add cancel logic here
  };

  const handleStopBooking = (tripId) => {
    console.log("Stop Taking Booking", tripId);
    // Add stop booking logic here
  };

  return (
    <div className="container mx-auto p-5 font-poppins">
      {trips.length === 0 ? (
        <div className="flex flex-col items-center text-center mt-10 gap-6">
          <h1 className="text-4xl font-bold text-primary font-serif">Start Hosting Your Trips!</h1>
          <p className="text-lg text-gray-600 max-w-md">
            Manage your trips, create new packages, and attract more tourists by creating unique experiences.
          </p>
          <button
            onClick={() => {
              if(!GuideRegisterd) {
                setError(true);
              }else {
                navigate("/tourPackage")
              
              }
            }}
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <FaPlusCircle /> Create Your First Trip
          </button>
          {error ? <p className="text-red-600 mt-3">You have to complete and verify account first</p> :""}

        </div>
      ) : (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-primary">Your Hosted Trips</h1>
            <button
              onClick={(e) => {
               
                  navigate("/tourPackage")
                
                
              }}
                
              //   // navigate("/tourPackage")
                

              // }}
              
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 "
            >
              <FaPlusCircle /> Create New Tour
            </button>
          </div>

          {/* Tabular format for displaying trips */}
          <div className="overflow-scroll h-[60vh]">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gradient-to-r from-primary to-secondary text-white">
                  <th className="py-3 px-4 text-left text-sm font-semibold">Trip Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Hotel Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Description</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Duration (days)</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Type</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
             
              <tbody>
                {trips.map((trip) => (
                  <tr
                    key={trip.id}
                    className="hover:bg-gray-100 transition-all duration-200 border-b border-gray-100"
                  >
                    <td className="py-3 px-4 text-sm text-gray-700">{trip.tripName || "Trip Name"}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{trip.name || "N/A"}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{trip.description}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{trip.duration} days</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{trip.type}</td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <button
                        onClick={() => handleCancelTour(trip.id)}
                        className="px-3 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600 transition-all duration-200 flex items-center gap-1"
                      >
                        <FaTrashAlt /> Cancel
                      </button>
                      <button
                        onClick={() => handleStopBooking(trip.id)}
                        className="px-3 py-1 bg-yellow-500 text-white text-xs rounded-full hover:bg-yellow-600 transition-all duration-200 flex items-center gap-1"
                      >
                        <FaStopCircle /> Stop Booking
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
             
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default TripDashboard;
