import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FindTripsByLocalGuide } from "../../Apihandle/Trips";
import { addTrip } from "../../Redux/Tripslice";

function TripDashboard() {
  const GuideData = useSelector((state) => state.Guide?.userData);
  const trips = useSelector((state) => state.Trips.trips);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (trips.length === 0 && GuideData) {
      const fetchTrips = async () => {
        try {
          console.log(GuideData._id);
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
  }, [trips, GuideData, dispatch]);

  const handleCancelTour = (tripId) => {
    console.log("Cancel Tour", tripId);
    // Add cancel logic here
  };

  const handleStopBooking = (tripId) => {
    console.log("Stop Taking Booking", tripId);
    // Add stop booking logic here
  };

  return (
    <div className="container mx-auto p-5">
      {trips.length === 0 ? (
        <div className="flex text-center mt-10 gap-10">
          <div className="flex flex-col">
            <h1 className="text-3xl font-serif font-bold">Want to start your Trip Hosting?</h1>
            <p className="text-xl text-gray-600">Manage your trips and create new packages.</p>
          </div>
          <button
            onClick={() => navigate("/tourPackage")}
            className="px-8 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all"
          >
            Create Your First Trip
          </button>
        </div>
      ) : (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-3xl font-serif font-bold">Your Trips</h1>
            <button
              onClick={() => navigate("/tourPackage")}
              className="px-6 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-all"
            >
              Create New Tour
            </button>
          </div>
          <div className="overflow-x-auto h-96 overflow-y-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-primary text-white sticky top-0">
                <tr>
                  <th className="w-1/4 py-3 px-4 text-left">Trip Name</th>
                  <th className="w-1/4 py-3 px-4 text-left">Hotel Name</th>
                  <th className="w-1/4 py-3 px-4 text-left">Description</th>
                  <th className="w-1/4 py-3 px-4 text-left">Duration (days)</th>
                  <th className="w-1/4 py-3 px-4 text-left">Type</th>
                  <th className="w-1/4 py-3 px-4 text-left">Status</th>
                  <th className="w-1/4 py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => (
                  <tr key={trip.id} className="hover:bg-gray-100 transition-all">
                    <td className="py-3 px-4 border-b">{trip.name || "Nothing"}</td>
                    <td className="py-3 px-4 border-b">{trip.hotelName || "N/A"}</td>
                    <td className="py-3 px-4 border-b">{trip.description}</td>
                    <td className="py-3 px-4 border-b">{trip.duration}</td>
                    <td className="py-3 px-4 border-b">{trip.type}</td>
                    <td className="py-3 px-4 border-b">{trip.status || "Upcoming"}</td>
                    <td className="py-3 px-4 border-b flex gap-2">
                      <button
                        onClick={() => handleCancelTour(trip.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-full shadow-sm hover:bg-red-600 transition-all"
                      >
                        Cancel Tour
                      </button>
                      <button
                        onClick={() => handleStopBooking(trip.id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-full shadow-sm hover:bg-yellow-600 transition-all"
                      >
                        Stop Taking Booking
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
