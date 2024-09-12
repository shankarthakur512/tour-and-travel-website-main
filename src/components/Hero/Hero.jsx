import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { FindTripsByLocation } from "../../Apihandle/Trips";
import { useDispatch } from "react-redux";
import { setTripsArray } from "../../Redux/Tripslice";
import { findGuideByCity } from "../../Apihandle/LocalGuide";
import { addSearchedGuide } from "../../Redux/GuideSlice";

const Hero = () => {
  const [priceValue, setPriceValue] = useState(30);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
const [destination , setDestination] = useState("")

const dispatch = useDispatch();
const navigate = useNavigate();

const handleSearch = async (e) =>{
e.preventDefault();
try {
const data = await axios.post(FindTripsByLocation , {location : destination})
const res = await axios.post(findGuideByCity , {city : destination})
const trips = data.data.trips
console.log(data.data.trips)
dispatch(setTripsArray({ trips }))
// console.log(data);
// console.log(res);
const guides = res.data.guides
dispatch(addSearchedGuide({guides}))
navigate('/search')

} catch (error) {
  console.log(error)
}
}

  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        src="/path-to-your-video.mp4"
        autoPlay
        muted
        loop
      ></video>

      <div className="h-full flex justify-center items-center p-4 bg-black/40">
        <div className="container grid grid-cols-1 gap-6">
          <div className="text-white text-center">
            <p data-aos="fade-up" className="text-sm font-medium uppercase tracking-wider">
              Our Packages
            </p>
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="font-extrabold text-4xl sm:text-5xl"
            >
              Explore Your Next Destination
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="space-y-6 bg-white bg-opacity-90 rounded-xl shadow-lg p-8 relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {/* Destination Input */}
              <div>
                <label htmlFor="destination" className="opacity-70 text-gray-600">
                  Search Your Destination
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e)=>{setDestination(e.target.value)}}
                  name="destination"
                  id="destination"
                  placeholder="Enter your destination"
                  className="w-full bg-gray-100 my-2 rounded-full p-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Date Pickers */}
              <div>
                <label htmlFor="startDate" className="opacity-70 text-gray-600">
                  Start Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select start date"
                  className="w-full bg-gray-100 my-2 rounded-full p-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  minDate={new Date()}
                />
              </div>
              <div>
                <label htmlFor="endDate" className="opacity-70 text-gray-600">
                  End Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="Select end date"
                  className="w-full bg-gray-100 my-2 rounded-full p-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Price Range */}
              <div>
                <label htmlFor="price" className="opacity-70 text-gray-600">
                  <div className="w-full flex justify-between items-center">
                    <p>Max Price</p>
                    <p className="font-bold text-xl">$ {priceValue}</p>
                  </div>
                </label>
                <div className="relative w-full">
                  <input
                    type="range"
                    name="price"
                    id="price"
                    className="appearance-none w-full h-1 rounded-full bg-gray-300 my-2"
                    min="30"
                    max="1000"
                    value={priceValue}
                    step="10"
                    onChange={(e) => setPriceValue(e.target.value)}
                    style={{
                      background: `linear-gradient(to right, #ff7e5f ${((priceValue - 30) / (1000 - 30)) * 100}%, #ddd ${((priceValue - 30) / (1000 - 30)) * 100}%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>$30</span>
                    <span>$1000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:scale-105 px-5 py-3 rounded-full duration-200 shadow-md absolute -bottom-6 left-1/2 transform -translate-x-1/2"
            onClick={handleSearch}
            >
              Search Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
