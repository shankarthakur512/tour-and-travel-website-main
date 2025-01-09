import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';
import GuideCard from '../components/SearchCards/GuideCard.jsx';
import TripCard from '../components/SearchCards/TripCard.jsx';
import { FaFilter } from 'react-icons/fa';

function Search() {
  const [showFilters, setShowFilters] = useState(false);

  const Trips = useSelector((state) => state.TripsArray.tripsArray);
  const Guides = useSelector((state) => state.searchedGuides.guides);
  const darkMode = useSelector((state) => state.darkMode.isDarkmode);
console.log(Trips)
  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen p-8`}>
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
              Discover New Experiences
            </h1>
            <p className="text-lg md:text-2xl font-light">Guides and trips curated just for you</p>
          </div>
        </div>
      </div>

      <div className="relative -mt-32 z-20 max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
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
              {/* Add Filter options here */}
            </div>
          )}
        </div>

        <div className="md:w-3/4 md:ml-6 mt-6 md:mt-0">
          {Guides?.length === 0 && Trips?.length === 0 && (
            <div className="text-center py-20">
              <div className="animate-bounce">
                <h2 className="text-3xl font-bold mb-4">Oops! 😕</h2>
                <p className="text-lg">We have no guides or trips available at the moment.</p>
              </div>
              <p className="text-md mt-4 text-blue-500">Try searching for something else!</p>
            </div>
          )}

          {Guides?.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {console.log("yha thik hai")}
                {Guides?.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} className="hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden" />
                ))}
              </div>
            </section>
          )}

          {Trips?.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-6">Trips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
                {Trips?.map((trip,index) => (
               
                <div key={index} className='border'><TripCard  trip={trip}  /></div>   
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
