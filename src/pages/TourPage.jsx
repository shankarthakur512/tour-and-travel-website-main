import React, { useState } from 'react';
import { FaHotel } from 'react-icons/fa';

// Sample data for the tour
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
  },
  itinerary: "Day 1: Visiting hotel,\nDay 2: Lal Kila visit,\nDay 3: Lotus Temple,\nDay 4: Akshardham,\nDay 5: Return",
  location: "Delhi",
  photos: [
    "http://res.cloudinary.com/dnencafjp/image/upload/v1725831757/lcyauqao4e8ob4ldoe7r.png",
    "http://res.cloudinary.com/dnencafjp/image/upload/v1725831759/uurshvnobvnwty4adsiv.png",
  ],
  price: 50,
  startingDate: "2024-10-23T18:30:00.000Z",
  status: "Upcoming",
  tripName: "Delhi Bharamn",
  type: "Honeymoon",
};

const TourPage = () => {
    const photoUrl = tourData.photos[0]
    const[selectedPhoto , setSelectedPhoto] = useState(photoUrl)
  return (
    <div className="p-5 md:p-10 bg-gray-100 dark:bg-gray-900">
      {/* Tour Header */}
      <div className="bg-white grid grid-cols-3 dark:bg-gray-800 rounded-lg shadow-lg p-5 mb-8">
        <div className='  flex flex-col items-center justify-center'>
        <h1 className="text-2xl font-bold mb-1">{tourData.tripName}</h1>
        <p className="text-md text-gray-700 dark:text-gray-300">{tourData.type}</p>
        <p className="text-md text-gray-500 dark:text-gray-400 mt-2">location :{tourData.location}</p>
        <p className="text-md text-green-600 dark:text-gray-400"><span className='text-gray-500'>status : </span>{tourData.status}</p>
      
        </div>
      {/* Photos */}
      <div className="container col-span-2 mx-auto p-5">
      <div className="mb-8  h-full p-2">
        <h2 className="text-xl font-semibold mb-4">Tour Photos</h2>
        <div className='border  justify-center flex'>
          <img
            src={selectedPhoto}
            alt="Selected Tour"
            className=' h-72 w-full object-fill md:w-1/2 lg:w-1/3 flex-1 rounded-lg shadow-lg'
          />
        </div>
        <div className="flex justify-center  mt-4 gap-4 overflow-x-auto py-2">
            
          {tourData.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Tour Photo ${index + 1}`}
              className="w-20 h-12 object-cover rounded-lg shadow-md cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            />
          ))}
        </div>
      </div>
      
      {/* Rest of your TourPage content goes here */}
      
    </div>
      </div>
      {/* Guide Details */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 mb-8">
        <h2 className="text-xl font-semibold mb-4">Hosted by {tourData.guideDetails.aboutYourself}</h2>
        <div className="flex items-center mb-4">
          <img src={tourData.guideDetails.picture} alt="Guide" className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-600 mr-4" />
          <div>
            <p className="text-lg font-semibold">{tourData.guideDetails.aboutYourself}</p>
            <p className="text-md text-gray-700 dark:text-gray-300">{tourData.guideDetails.city}, {tourData.guideDetails.country}</p>
            <p className="text-md text-gray-500 dark:text-gray-400">{tourData.guideDetails.email}</p>
            <p className="text-md text-gray-500 dark:text-gray-400">{tourData.guideDetails.mobileNo}</p>
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 mb-8">
        <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
        <pre className="text-gray-700 dark:text-gray-300">{tourData.itinerary}</pre>
      </div>

      {/* Booking Section */}
      <div className="bg-white grid grid-cols-2 dark:bg-gray-800 rounded-lg shadow-lg p-5 mb-8">
        <div className=''>
        <div className=' rounded-lg p-5 mb-8 shadow-lg'>
        <h2 className="text-xl font-semibold mb-4 flex gap-2"> <FaHotel size={30} />Hotel Details</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Hotel Info */}
          <div className="flex-1  p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-semibold mb-2">Hotel: {tourData.hotel.name}</h3>
            <p className="text-gray-700 mb-1">Rating: {tourData.hotel.rating} / 5</p>
            <p className="text-gray-700">Location: {tourData.location}</p>
          </div>
          
          {/* Facilities */}
          <div className="flex-1 border p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-semibold mb-2">Other Facilities</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Free Wi-Fi</li>
              <li>Breakfast Included</li>
              <li>Swimming Pool</li>
              <li>24/7 Room Service</li>
            </ul>
          </div>
        </div>
      </div>
        </div>
        <div className='border  flex flex-col justify-center items-center'>
        
        <h2 className="text-xl w-full flex justify-center border font-semibold mb-4">Booking Details</h2>
        <div className="flex items-center mb-4">
          <span className="text-lg font-semibold">Price per person:</span>
          <span className="text-lg font-bold text-primary ml-2">${tourData.price}</span>
        </div>
        <div className="mb-4">
          <label htmlFor="numPersons" className="block text-md font-medium text-gray-700 dark:text-gray-300">Number of Persons:</label>
          <input type="number" id="numPersons" name="numPersons" min="1" defaultValue="1" className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-300" />
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary-dark transition-colors">Book Now</button>
      </div>
      </div>
      {/* Reviews Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        {/* Sample review */}
        <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
          <p className="text-gray-700 dark:text-gray-300">No reviews yet. Be the first to review!</p>
        </div>
      </div>
    </div>
  );
};

export default TourPage;
