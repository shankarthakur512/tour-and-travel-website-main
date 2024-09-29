import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ onClose, tripData, navigateToPayment }) => {
  const [personDetails, setPersonDetails] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState({ name: '', govtId: '', age: '' });
  const [totalPersons, setTotalPersons] = useState(0);

  const navigate = useNavigate();


  const handlePersonDetailChange = (field, value) => {
    setCurrentPerson({
      ...currentPerson,
      [field]: value,
    });
  };

  const handleSavePerson = () => {
    setPersonDetails([...personDetails, currentPerson]);
    setCurrentPerson({ name: '', govtId: '', age: '' });
    setTotalPersons(totalPersons + 1);
    setIsPopupOpen(false); 
  };

  const totalCost = tripData.price * totalPersons;
  const discount = totalCost * 0.10; // 10% discount
  const finalCost = totalCost - discount;

  // Handle booking submission
  const handleBooking = () => {
    navigate('/payment', {
        state: { personDetails, totalCost, finalCost }, 
      });
    onClose();
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-gray-800 bg-opacity-90 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-4/5 max-w-4xl h-auto flex flex-col relative p-6">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 z-50 dark:text-gray-400 text-2xl font-bold">×</button>
        
        {/* Modal Header */}
        <div className="mb-6 bg-gradient-to-r from-primary to-secondary opacity-95 text-white px-10 py-5 rounded-lg">
          <h3 className="text-xl">Review Your Package</h3>
          <h2 className="text-3xl mt-2 font-extrabold">
            {tripData.tripName} - Book your amazing trip
          </h2>
          <p className="text-sm">
            {tripData.duration} nights - Price per person: ${tripData.price}
          </p>
        </div>

        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className='text-blue-600'>Important Instruction</h2>
          <p>Please enter details for each traveler. All fields are mandatory.</p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <button
              className="w-full py-3 bg-gradient-to-r  from-primary to-secondary text-white font-semibold rounded-lg shadow-md mb-4"
              onClick={() => setIsPopupOpen(true)}
            >
              Add Traveller
            </button>

            {/* Travellers List */}
            <div className="mb-6 flex gap-4 overflow-x-auto">
              {personDetails.map((person, index) => (
                <div key={index} className="p-4 bg-white dark:bg-gray-800 border-l-4 border-primary rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">Traveller {index + 1}</h3>
                  <p><strong>Name:</strong> {person.name}</p>
                  <p><strong>Government ID:</strong> {person.govtId}</p>
                  <p><strong>Age:</strong> {person.age}</p>
                </div>
              ))}
            </div>

            {/* Proceed to Payment Button */}
            <button
              className="w-full py-3 bg-gradient-to-r to-pink-500 from-indigo-600 text-white font-semibold rounded-lg shadow-md"
              onClick={handleBooking}
            >
              Proceed to Payment
            </button>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Price Summary</h2>

  {/* Price Breakdown */}
  <div className="border-b pb-4 mb-4">
    <div className="flex justify-between">
      <p className="text-gray-600 dark:text-gray-300">Base Price (per person):</p>
      <p className="text-gray-800 dark:text-white">${tripData.price}</p>
    </div>
    <div className="flex justify-between">
      <p className="text-gray-600 dark:text-gray-300">Total Travelers:</p>
      <p className="text-gray-800 dark:text-white">{totalPersons}</p>
    </div>
    <div className="flex justify-between">
      <p className="text-gray-600 dark:text-gray-300">Total Price (before discount):</p>
      <p className="text-gray-800 dark:text-white">${totalCost}</p>
    </div>
    <div className="flex justify-between">
      <p className="text-gray-600 dark:text-gray-300">Discount (10%):</p>
      <p className="text-green-500">-${discount}</p>
    </div>
    <div className="flex justify-between">
      <p className="text-gray-600 dark:text-gray-300">GST (10%):</p>
      <p className="text-gray-800 dark:text-white">${(finalCost * 0.1).toFixed(2)}</p>
    </div>
  </div>

  {/* Final Amount */}
  <div className="flex justify-between text-lg font-semibold">
    <p className="text-gray-900 dark:text-white">Total Payable:</p>
    <p className="text-gray-900 dark:text-white">${(finalCost * 1.1).toFixed(2)}</p>
  </div>

  {/* Terms and Conditions */}
  <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
    <input type="checkbox" id="terms" className="mr-2" />
    <label htmlFor="terms">
      I agree to the <span className="text-blue-500 cursor-pointer">Terms and Conditions</span>.
    </label>
  </div>
</div>

        </div>

        {/* Traveller Details Popup */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md relative">
              
              {/* Close Popup Button */}
              <button onClick={() => setIsPopupOpen(false)} className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 text-2xl font-bold">×</button>

              {/* Popup Header */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Enter Traveller Details</h3>

              {/* Traveller Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300">Name:</label>
                  <input
                    type="text"
                    value={currentPerson.name}
                    onChange={(e) => handlePersonDetailChange('name', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300">Government ID:</label>
                  <input
                    type="text"
                    value={currentPerson.govtId}
                    onChange={(e) => handlePersonDetailChange('govtId', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300">Age:</label>
                  <input
                    type="number"
                    value={currentPerson.age}
                    onChange={(e) => handlePersonDetailChange('age', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                className="w-full py-3 mt-6 bg-primary text-white font-semibold rounded-lg shadow-md"
                onClick={handleSavePerson}
                disabled={!currentPerson.name || !currentPerson.govtId || !currentPerson.age}
              >
                Save Traveller
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
