import React from 'react';

const Guidelines = () => {
  const guidelines = [
    "Ensure timely arrival for all scheduled trips.",
    "Maintain professionalism and courteous behavior at all times.",
    "Provide accurate and detailed information about the destinations.",
    "Prioritize the safety and well-being of all participants.",
    "Be prepared for any emergencies and have necessary contact information.",
    "Keep communication open with participants and address any concerns promptly.",
  ];

  return (
    <div className="bg-white p-5 rounded-md shadow-md mt-5">
      <h2 className="text-2xl font-serif mb-4">Guidelines for Local Guides</h2>
      <ul className="list-disc pl-5 space-y-2">
        {guidelines.map((guideline, index) => (
          <li key={index} className="text-gray-700 text-sm">{guideline}</li>
        ))}
      </ul>
    </div>
  );
};

export default Guidelines;
