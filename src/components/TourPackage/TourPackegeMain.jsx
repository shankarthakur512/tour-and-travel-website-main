import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaUpload, FaCalendarAlt, FaHotel, FaMapMarkerAlt, FaDollarSign, FaImage, FaStar, FaClock, FaTag, FaLocationArrow } from 'react-icons/fa'; // Added icons for trip name and location
import BannerPic from '../BannerPic/BannerPic';
import TourImg from './TourPackage.jpg';
import { RegisterTour } from '../../Apihandle/Trips';
import { useNavigate } from 'react-router-dom';

const tourTypeOptions = [
  "Cultural", "Religious", "Honeymoon", "Solo Trip", "Adventure",
  "Luxury", "Eco Tour", "Family", "Group Tour"
];

const statusOptions = ["Upcoming", "Ongoing", "Completed", "Cancelled"];

const TourPackageCreation = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [hotelRating, setHotelRating] = useState(0);
  const GuideData = useSelector((state) => state.Guide.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!GuideData) {
      navigate('/login');
    }
  }, [GuideData, navigate]);

  const handlePhotoUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newPhotoPreviews = selectedFiles.map(file => URL.createObjectURL(file));

    setPhotos((prevPhotos) => [...prevPhotos, ...selectedFiles]);
    setPhotoPreviews((prevPreviews) => [...prevPreviews, ...newPhotoPreviews]);
    setValue('photos', [...photos, ...selectedFiles]);
  };

  const handleRatingChange = (rating) => {
    setHotelRating(rating);
    setValue('hotelRating', rating);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('createdBy', GuideData._id);
      formData.append('tripName', data.tripName);
      formData.append('Location', data.location);
      formData.append('type', data.tourType);
      formData.append('hotel', data.hotel);
      formData.append('hotelRating', hotelRating);
      formData.append('itinerary', data.itinerary);
      formData.append('price', data.price);
      formData.append('startingDate', data.startingDate);
      formData.append('duration', data.duration);
    

      photos.forEach((photo) => {
        formData.append('photos', photo);
      });

      const response = await axios.post(RegisterTour, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    navigate('/dashboard')
      console.log('Tour Package Registered:', response.data);
    } catch (error) {
      console.error('Error registering tour package:', error);
    }
  };

  const title = "Create Your Tour Package";
  const description = "Ensure that your package and Trip Hosting follows our policy";

  return (
    <div className="bg-gray-100 min-h-screen">
      <BannerPic img={TourImg} title={title} description={description} />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create a Tour Package</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md">
          {/* Trip Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="tripName">
              <FaTag className="inline mr-2" /> Trip Name <span className="text-red-500">*</span>
            </label>
            <Controller
              name="tripName"
              control={control}
              defaultValue=""
              rules={{ required: 'Trip name is required' }}
              render={({ field }) => (
                <input
                  type="text"
                  id="tripName"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter the name of the trip"
                />
              )}
            />
            {errors.tripName && <p className="text-red-500 text-xs">{errors.tripName.message}</p>}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="location">
              <FaLocationArrow className="inline mr-2" /> Location <span className="text-red-500">*</span>
            </label>
            <Controller
              name="location"
              control={control}
              defaultValue=""
              rules={{ required: 'Location is required' }}
              render={({ field }) => (
                <input
                  type="text"
                  id="location"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter the trip location"
                />
              )}
            />
            {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
          </div>

          {/* Tour Type */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="tourType">
              <FaMapMarkerAlt className="inline mr-2" /> Tour Type <span className="text-red-500">*</span>
            </label>
            <Controller
              name="tourType"
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
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
            />
            {errors.tourType && <p className="text-red-500 text-xs">{errors.tourType.message}</p>}
          </div>

          {/* Hotel */}
          <div className="mb-4 flex items-center space-x-4">
            <div className="w-2/3">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="hotel">
                <FaHotel className="inline mr-2" /> Hotel <span className="text-red-500">*</span>
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

            {/* Hotel Rating */}
            <div className="w-1/3">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${star <= hotelRating ? 'text-yellow-500' : 'text-gray-400'}`}
                    onClick={() => handleRatingChange(star)}
                  />
                ))}
              </div>
              {errors.hotelRating && <p className="text-red-500 text-xs">Hotel rating is required</p>}
            </div>
          </div>

          {/* Starting Date */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="startingDate">
              <FaCalendarAlt className="inline mr-2" /> Starting Date <span className="text-red-500">*</span>
            </label>
            <Controller
              name="startingDate"
              control={control}
              defaultValue=""
              rules={{ required: 'Starting date is required' }}
              render={({ field }) => (
                <input
                  type="date"
                  id="startingDate"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              )}
            />
            {errors.startingDate && <p className="text-red-500 text-xs">{errors.startingDate.message}</p>}
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="duration">
              <FaClock className="inline mr-2" /> Duration <span className="text-red-500">*</span>
            </label>
            <Controller
              name="duration"
              control={control}
              defaultValue=""
              rules={{ required: 'Duration is required' }}
              render={({ field }) => (
                <input
                  type="number"
                  id="duration"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter duration in days"
                />
              )}
            />
            {errors.duration && <p className="text-red-500 text-xs">{errors.duration.message}</p>}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="price">
              <FaDollarSign className="inline mr-2" /> Price <span className="text-red-500">*</span>
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
                  placeholder="Enter price"
                />
              )}
            />
            {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
          </div>

          {/* Itinerary */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="itinerary">
              Itinerary <span className="text-red-500">*</span>
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
                  placeholder="Enter trip itinerary"
                />
              )}
            />
            {errors.itinerary && <p className="text-red-500 text-xs">{errors.itinerary.message}</p>}
          </div>

          {/* Photos Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              <FaImage className="inline mr-2" /> Photos
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <div className="flex flex-wrap mt-2">
              {photoPreviews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded mr-2 mb-2"
                />
              ))}
            </div>
          </div>

         

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Create Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default TourPackageCreation;
