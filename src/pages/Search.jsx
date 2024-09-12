import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';
import GuideCard from '../components/SearchCards/GuideCard';
import TripCard from '../components/SearchCards/TripCard';
import { FaFilter, FaSearch } from 'react-icons/fa';

function Search() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const Trips = useSelector((state) => state.TripsArray.tripsArray);
  const Guides = useSelector((state) => state.searchedGuides.guides);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-4">
              Find Your Perfect Search
            </h1>
            {/* <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search for a destination"
                className="w-full py-3 px-4 pr-12 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-600">
                <FaSearch size={24} />
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Filter and Search Results Section */}
      <div className="relative -mt-32 z-20 max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
        {/* Filters Section */}
        <div className="md:w-1/4 p-4 bg-gray-50 rounded-lg shadow-md">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-primary text-white py-2 px-4 rounded-full hover:bg-purple-700 transition-colors duration-300 flex items-center"
            >
              <FaFilter className="mr-2" /> Filters
            </button>
          </div>

          {showFilters && (
           <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300">
           <h2 className="text-xl font-semibold mb-4">Filter Options</h2>
           
           {/* Filter for Guides or Trips */}
           <div className="flex justify-between items-center mb-4">
             <label className="font-medium">Apply Filters To:</label>
             <div className="flex items-center space-x-4">
               <div>
                 <input type="radio" id="guides" name="filterType" className="mr-2" />
                 <label htmlFor="guides">Guides</label>
               </div>
               <div>
                 <input type="radio" id="trips" name="filterType" className="mr-2" />
                 <label htmlFor="trips">Trips</label>
               </div>
             </div>
           </div>
           
           {/* Location Filter */}
           <div className="mb-4">
             <label className="block mb-2 font-medium">Location</label>
             <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter location" />
           </div>
           
           {/* Price Range Filter */}
           <div className="mb-4">
             <label className="block mb-2 font-medium">Price Range</label>
             <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
               <option>Any</option>
               <option>$0 - $500</option>
               <option>$501 - $1000</option>
               <option>$1001+</option>
             </select>
           </div>
           
           {/* Rating Filter */}
           <div className="mb-4">
             <label className="block mb-2 font-medium">Rating</label>
             <div className="flex items-center space-x-4">
               <div>
                 <input type="checkbox" id="rating4" className="mr-2" />
                 <label htmlFor="rating4">4+ Stars</label>
               </div>
               <div>
                 <input type="checkbox" id="rating3" className="mr-2" />
                 <label htmlFor="rating3">3+ Stars</label>
               </div>
               <div>
                 <input type="checkbox" id="rating2" className="mr-2" />
                 <label htmlFor="rating2">2+ Stars</label>
               </div>
             </div>
           </div>
         
           {/* Trip Type Filter */}
           <div className="mb-4">
             <label className="block mb-2 font-medium">Trip Type</label>
             <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
               <option>Any</option>
               <option>Adventure</option>
               <option>Leisure</option>
               <option>Cultural</option>
               <option>Wildlife</option>
             </select>
           </div>
         
           {/* Checkboxes for Other Filters */}
           <div className="mb-4">
             <label className="block mb-2 font-medium">Additional Filters</label>
             <div className="flex flex-wrap gap-4">
               <div>
                 <input type="checkbox" id="guideAvailable" className="mr-2" />
                 <label htmlFor="guideAvailable">Guide Available</label>
               </div>
               <div>
                 <input type="checkbox" id="privateTrip" className="mr-2" />
                 <label htmlFor="privateTrip">Private Trip</label>
               </div>
               <div>
                 <input type="checkbox" id="groupTrip" className="mr-2" />
                 <label htmlFor="groupTrip">Group Trip</label>
               </div>
             </div>
           </div>
         
           {/* Apply Filters Button */}
           <button className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300">
             Apply Filters
           </button>
         </div>
         
          )}
        </div>

        {/* Search Results Section */}
        <div className="md:w-3/4 md:ml-6 mt-6 md:mt-0">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Guides?.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Trips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Trips?.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Search;
