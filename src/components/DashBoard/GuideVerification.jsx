import React, { useState } from 'react';
import { FaMobileAlt, FaEnvelope, FaIdCard, FaCheckCircle } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';

const Verification = ({setVerification}) => {
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    setOtpSent(true);
    console.log('OTP sent to mobile and email');
  };

  const handleVerify = () => {
    console.log('Verified:', { mobile, email, aadhaar, otp });
  };

  return (
    <div className=" p-6 rounded-lg py-10 shadow-lg mt-5 px-24 ">
      <div className=" flex justify-end"> <IoCloseCircle className='text-xl' onClick={()=>setVerification(false)} /></div>
      
      <h2 className="  text-3xl font-serif mb-6  text-center">Account Verification</h2>
      <div className="mb-4  mt-5 flex items-center">
        <FaMobileAlt className=" mr-3" />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-2 rounded-md shadow-inner focus:outline-none"
        />
      </div>
      <div className="mb-4 mt-10 flex items-center">
        <FaEnvelope className=" mr-3" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded-md shadow-inner focus:outline-none"
        />
      </div>
      <div className="mb-4 mt-10 flex items-center">
        <FaIdCard className=" mr-3" />
        <input
          type="text"
          placeholder="Aadhaar Card Number"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          className="w-full p-2 rounded-md shadow-inner focus:outline-none"
        />
      </div>
      {otpSent && (
        <div className="mb-4 mt-10 flex items-center">
          <FaCheckCircle className="text-white mr-3 mt-10" />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 rounded-md shadow-inner focus:outline-none"
          />
        </div>
      )}
      <div className="flex items-center mt-10 justify-between">
        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            className="bg-button  text-white text-base py-2 px-4 rounded shadow hover:bg-gray-100 hover:text-black  transition duration-300"
          >
            Send OTP
          </button>
        ) : (
          <button
            onClick={handleVerify}
            className="bg-white text-green-500 font-bold py-2 px-4 rounded shadow hover:bg-gray-100 transition duration-300"
          >
            Verify
          </button>
        )}
      </div>
    </div>
  );
};

export default Verification;
