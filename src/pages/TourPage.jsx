import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaUser, FaHotel, FaInfoCircle, FaTag } from 'react-icons/fa';

const tourData = {
  guideDetails: {
    Govt_ID: "348493598349",
    aboutYourself: "Hello guys, how are you?",
    address: "Rajiv Nagar",
    city: "Akalkot",
    country: "Andorra",
    email: "skt48324@gmail.com",
    languages: [],
    mobileNo: 4352352234,
    native: "YES",
    picture: "http://res.cloudinary.com/dnencafjp/image/upload/v1723673903/llxyflzo6rtkrtmai1lr.jpg",
  },
  hotel: {
    name: "Radison",
    rating: 4,
    facilities: ['Free WiFi', 'Swimming Pool', 'Breakfast Included'],
  },
  itinerary: [
    "Visiting hotel",
    "Lal Kila visit",
    "Lotus Temple",
    "Akshardham",
    "Return",
  ],
  location: "Delhi",
  photos: [
    "http://res.cloudinary.com/dnencafjp/image/upload/v1725831757/lcyauqao4e8ob4ldoe7r.png",
    "http://res.cloudinary.com/dnencafjp/image/upload/v1725831759/uurshvnobvnwty4adsiv.png",
  ],
  price: 50,
  discount: 10, // 10% discount
  startingDate: "2024-10-23T18:30:00.000Z",
  status: "Upcoming",
  tripName: "Delhi Bharamn",
  type: "Honeymoon",
};

const TourPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(tourData.photos[0]);
  const [showPolicy, setShowPolicy] = useState(false);

  const discountedPrice = tourData.price - (tourData.price * tourData.discount) / 100;

  return (
    <div className="  bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Full-Width Tour Name and Details */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-3  rounded-lg">
        <h1 className="text-4xl font-bold mb-4">{tourData.tripName}</h1>
        <div className="flex flex-wrap items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <FaInfoCircle className="text-lg text-primary" />
            <span>Status: {tourData.status}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-lg" />
            <span>Location: {tourData.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-lg" />
            <span>Start Date: {new Date(tourData.startingDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaUser className="text-lg" />
            <span>Type: {tourData.type}</span>
          </div>
        </div>
        {/* Scrollable Image Section */}
       
      </div>
      <div className="overflow-y-scroll  space-y-4  bg-white dark:bg-gray-800 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="w-full h-64">
              <img
                src={selectedPhoto}
                alt="Selected Tour"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="border flex space-x-4 col-span-1">
              {tourData.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Tour ${index}`}
                  className={`w-32 h-32 object-cover rounded-lg shadow-lg cursor-pointer ${
                    selectedPhoto === photo ? 'border-4 border-primary' : ''
                  }`}
                  onClick={() => setSelectedPhoto(photo)}
                />
              ))}
            </div>
          </div>
        </div>

      {/* Main Content Section */}
      <div className="grid p-6 md:p-10 grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        {/* Itinerary or Policy Section */}
        <div className="md:col-span-2 bg-gradient-to-r from-primary to-secondary p-5 rounded-lg shadow-lg text-gray-900 dark:text-gray-200">
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
              {/* Itinerary List with Connected Markers */}
              <ul className="list-none relative ml-4 space-y-4">
                {tourData.itinerary.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-4 w-1 bg-white absolute left-[5px]"></div>
                    <div className="w-4 h-4 bg-white rounded-full mr-4"></div>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
              {/* Hotel Details */}
              <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Hotel Information</h3>
                <div className="flex items-center space-x-4">
                  <FaHotel className="text-2xl text-primary" />
                  <div>
                    <p className="font-semibold">{tourData.hotel.name}</p>
                    <p>Rating: {tourData.hotel.rating} Stars</p>
                    <p>Facilities: {tourData.hotel.facilities.join(', ')}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="whitespace-pre-wrap">Terms and Conditions: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          )}
        </div>

        {/* Right Side - Host Details and Booking Section */}
        <div className="space-y-6">
          {/* Hosted by Section */}
          <div className="bg-gradient-to-r from-primary to-secondary p-5 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Hosted by</h2>
            <div className="flex items-center mb-4">
              <img
                src={tourData.guideDetails.picture}
                alt="Guide"
                className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-600 mr-4"
              />
              <div>
                <p className="text-lg font-semibold">{tourData.guideDetails.aboutYourself}</p>
                <p className="text-md text-gray-700 dark:text-gray-300">
                  {tourData.guideDetails.city}, {tourData.guideDetails.country}
                </p>
                <p className="text-md text-gray-500 dark:text-gray-400">{tourData.guideDetails.email}</p>
                <p className="text-md text-gray-500 dark:text-gray-400">{tourData.guideDetails.mobileNo}</p>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="bg-gradient-to-r from-primary to-secondary p-5 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
            <div className="flex items-center mb-4">
              <span className="text-lg font-semibold">Price per person:</span>
              <span className="text-lg font-bold text-white ml-2">
                <FaDollarSign className="inline mr-1" /> {discountedPrice}
              </span>
              <span className="line-through text-sm text-gray-500 ml-2">
                <FaTag className="inline mr-1" /> {tourData.price}
              </span>
              <span className="text-sm text-green-500 ml-2">10% off</span>
            </div>
            <input
              type="text"
              placeholder="Use Code"
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 mb-4"
            />
            <button className="w-full py-2 bg-primary text-white font-semibold rounded-lg shadow-lg">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="space-y-4">
          {/* Example Review */}
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-md">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">"Amazing experience, would recommend!"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPage;
