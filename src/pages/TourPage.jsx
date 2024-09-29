import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaUser, FaHotel, FaInfoCircle, FaTag, FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { FindtripDetail } from '../Apihandle/Trips';
import BookingModal from '../components/Booking/BookingModal.jsx'; // Separate booking component for modal

const TourPage = () => {
  const [tourData, setTourData] = useState(null); // State for fetched trip data
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [showPolicy, setShowPolicy] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false); // State to show/hide booking modal
  const { TripId } = useParams();

  useEffect(() => {
    const getTripData = async () => {
      try {
        const res = await axios.get(`${FindtripDetail}/${TripId}`);
        const trip = res.data.trips[0]; // Access the first trip in the array
        setTourData(trip); 
        console.log(trip)// Set the trip data
        setSelectedPhoto(trip.photos[0]); // Set the first photo as the default
      } catch (error) {
        console.log(error);
      }
    };

    getTripData();
  }, [TripId]);

  if (!tourData) {
    return <div>Loading...</div>; // Show loading state if no data
  }

  const discountedPrice = tourData.price - (tourData.price * 10) / 100; // Assuming 10% discount

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Tour Name and Details */}
      <div className="bg-white dark:bg-gray-800 p-4 sticky top-0 z-10">
        <h1 className="text-3xl font-bold mb-2">{tourData.tripName}</h1>
        <div className="flex flex-wrap items-center space-x-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <FaInfoCircle className="mr-2 text-primary" />
            <span>Status: {tourData.status}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            <span>{tourData.location}</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" />
            <span>{new Date(tourData.startingDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <FaUser className="mr-2" />
            <span>Type: {tourData.type}</span>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="overflow-y-auto space-y-4 bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full h-80">
            <img
              src={selectedPhoto}
              alt="Selected Tour"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex space-x-4 overflow-x-auto  justify-center items-center">
            {tourData.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Tour ${index}`}
                className={`w-32 h-32 object-cover rounded-lg shadow-lg cursor-pointer ${
                  selectedPhoto === photo ? 'border-2 border-primary' : ''
                }`}
                onClick={() => setSelectedPhoto(photo)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="grid p-6 md:p-8 grid-cols-1 md:grid-cols-3 gap-8">
        {/* Itinerary or Policy Section */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-gray-900 dark:text-gray-200">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-semibold">
              {showPolicy ? 'Terms and Conditions' : 'Itinerary & Hotel Details'}
            </h2>
            <button
              className="text-sm text-blue-500 underline"
              onClick={() => setShowPolicy(!showPolicy)}
            >
              {showPolicy ? 'Show Itinerary' : 'Show Policy'}
            </button>
          </div>

          {!showPolicy ? (
            <>
              {/* Itinerary List */}
              <ul className="list-disc pl-6 space-y-2 text-sm">
                {tourData.itinerary.split(',').map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>

              {/* Hotel Details */}
              <div className="mt-6 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Hotel Information</h3>
                <div className="flex items-center space-x-4">
                  <FaHotel className="text-2xl text-primary" />
                  <div>
                    <p className="font-semibold">{tourData.hotel.name}</p>
                    <p className="flex items-center">
                      <FaStar className="text-yellow-500 mr-1" /> {tourData.hotel.rating} Stars
                    </p>
                    <p>Facilities:</p>
                    <ul className="list-disc pl-6 text-sm">
                      {/* {tourData.hotel.facilities.map((facility, index) => (
                        <li key={index}>{facility}</li>
                      ))} */}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {tourData.policy}
            </p>
          )}
        </div>

        {/* Right Side - Host Details and Booking Section */}
        <div className="space-y-6">
          {/* Hosted by Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Hosted by</h2>
            <div className="flex items-center">
              <img
                src={tourData.guideDetails.picture}
                alt="Guide"
                className="w-14 h-14 rounded-full border-2 border-gray-300 dark:border-gray-600 mr-4"
              />
              <div>
                <p className="font-semibold">{tourData.userDetails.fullName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {tourData.guideDetails.city}, {tourData.guideDetails.country}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tourData.guideDetails.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tourData.guideDetails.mobileNo}</p>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
            <div className="flex items-center justify-between mb-4 text-lg">
              <span>Price per person:</span>
              <span className="font-bold text-green-500">
                <FaDollarSign className="inline mr-1" /> {discountedPrice}
              </span>
              <span className="line-through text-sm text-gray-500">
                <FaTag className="inline mr-1" /> {tourData.price}
              </span>
            </div>
            <button
              className="w-full py-2 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-secondary"
              onClick={() => setShowBookingModal(true)} // Open modal on click
            >
              Book Now
            </button>
          </div>

          {/* Review Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <p>No reviews yet. Be the first to leave a review!</p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal onClose={() => setShowBookingModal(false)} tripData={tourData} />
      )}
    </div>
  );
};

export default TourPage;
