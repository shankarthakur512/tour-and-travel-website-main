import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaUpload, FaCalendarAlt, FaHotel, FaMapMarkerAlt, FaDollarSign, FaImage } from 'react-icons/fa';
import BannerPic2 from '../BannerPic/BannerPic2';
import TourImg from './TourPackage.jpg'
import BannerPic from '../BannerPic/BannerPic';
// import Navbar from './Navbar'; // Import your Navbar component

const tourTypeOptions = [
  "Cultural",
  "Religious",
  "Honeymoon",
  "Solo Trip",
  "Adventure",
  "Luxury",
  "Eco Tour",
  "Family",
  "Group Tour",
];

const TourPackageCreation = () => {
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [photos, setPhotos] = useState([]);

  const watchPhotos = watch('photos');

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos([...photos, ...files]);
    setValue('photos', files); // Update react-hook-form value
  };

  const onSubmit = (data) => {
    console.log(data);
    console.log('Photos:', photos);
    // Handle form submission logic
  };
  const title = "Create Your Tour Package";
    const description =
      "Ensure That your package and Trip Hosting Must follow our policy";
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <Navbar /> Ensure Navbar component is implemented */}
      <BannerPic img={TourImg} title={title} description={description}/>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create a Tour Package</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="tourType">
              <FaMapMarkerAlt className="inline mr-2" /> Tour Type
            </label>
            <Controller
              name="tourType"
            //   className="bg-white"
              control={control}
              defaultValue=""
              rules={{ required: 'Tour type is required' }}
              render={({ field }) => (
                <select
                  id="tourType"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="" disabled>Select tour type</option>
                  {tourTypeOptions.map((option) => (
                    <option  className='bg-white' key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
            />
            {errors.tourType && <p className="text-red-500 text-xs">{errors.tourType.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="days">
              <FaCalendarAlt className="inline mr-2" /> Duration (Days)
            </label>
            <Controller
              name="days"
              control={control}
              defaultValue=""
              rules={{ required: 'Duration is required' }}
              render={({ field }) => (
                <input
                  type="number"
                  id="days"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Number of days"
                />
              )}
            />
            {errors.days && <p className="text-red-500 text-xs">{errors.days.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="hotel">
              <FaHotel className="inline mr-2" /> Hotel
            </label>
            <Controller
              name="hotel"
              control={control}
              defaultValue=""
              rules={{ required: 'Hotel details are required' }}
              render={({ field }) => (
                <input
                  type="text"
                  id="hotel"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Hotel name or details"
                />
              )}
            />
            {errors.hotel && <p className="text-red-500 text-xs">{errors.hotel.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="itinerary">
              <FaMapMarkerAlt className="inline mr-2" /> Daily Itinerary
            </label>
            <Controller
              name="itinerary"
              control={control}
              defaultValue=""
              rules={{ required: 'Itinerary is required' }}
              render={({ field }) => (
                <textarea
                  id="itinerary"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Describe the itinerary for each day"
                  rows="6"
                />
              )}
            />
            {errors.itinerary && <p className="text-red-500 text-xs">{errors.itinerary.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="price">
              <FaDollarSign className="inline mr-2" /> Price
            </label>
            <Controller
              name="price"
              control={control}
              defaultValue=""
              rules={{ required: 'Price is required' }}
              render={({ field }) => (
                <input
                  type="number"
                  id="price"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Price of the tour package"
                />
              )}
            />
            {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              <FaImage className="inline mr-2" /> Destination Photos
            </label>
            <input
              type="file"
              multiple
              onChange={handlePhotoUpload}
              className="block w-full text-gray-700"
              accept="image/*"
            />
            <div className="mt-2">
              {watchPhotos && watchPhotos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
                      <img src={URL.createObjectURL(photo)} alt="Destination" className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TourPackageCreation;
