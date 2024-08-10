import React, { useState } from 'react';
import DashboardNav from './DashboardNav';
import { useSelector } from 'react-redux';
import { IoIosNotificationsOutline } from "react-icons/io";
import Footer from '../Footer/Footer';
import Guidelines from '../Guidlines/Guideline.jsx'; // Fixed the import path
import Verification from './GuideVerification';
import CompleteProfile from "./CompleteProfile.jsx";

const GuideDashboard = () => {
  const [verification, setVerification] = useState(false);
  const [profileComp, setProfileComp] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const GuideData =  useSelector((state) => state.Guide.userData)
  const handleVerification = (e) => {
    e.preventDefault();
    setVerification(!verification);
  }

  const handleProfileCompletion = (e) => {
    e.preventDefault();
    console.log(GuideData)
    console.log("aa rha hai");
    setProfileComp(!profileComp);
  }

  return (
    <div className="container mx-auto p-5">
      <div className="border-b-4 mb-5">
        <DashboardNav />
      </div>
      {!verification ? ( profileComp ? <CompleteProfile setProfileComp={setProfileComp} /> :
        <div>
          <div className="flex flex-col md:flex-row p-5 justify-between">
            <div className="mb-6 md:mb-0 ml-2 gap-10">
              <span className="text-2xl font-serif">Welcome, {GuideData ? GuideData.userName : 'User'}!</span>
              <div className='flex flex-col gap-10 md:flex-row'>
                <div className="mt-6 border p-5 w-72 rounded-md cursor-pointer" onClick={handleVerification}>
                  <h1 className="text-xl font-serif">Verify your Account</h1>
                  <span className="text-xs">Verify your identity, email, mobile number</span>
                </div>
                <div className="mt-6 border p-5 w-72 rounded-md cursor-pointer" onClick={handleProfileCompletion}>
                  <h1 className="text-xl font-serif">Complete your profile</h1>
                  <span className="text-xs">Upload your picture, Languages</span>
                </div>
              </div>
            </div>
            <div>
              <IoIosNotificationsOutline size={30} />
              {/* <sup className="rounded-full px-2 bg-red-500 text-white">1</sup> Example notification count */}
            </div>
          </div>
          <div className='p-5 mt-5 gap-5'>
            <span className='border p-2 rounded-lg hover:border-b-4 cursor-pointer bg-gradient-to-r from-secondary to-primary text-white'>Your upcoming bookings</span>
            <div className='h-56 mt-5 border rounded-lg flex items-center justify-center bg-slate-300'>
              <span>Here no any bookings. Update and Verify your Account first</span>
            </div>
          </div>
          <div className='p-5 mt-5'>
            <Guidelines />
          </div>
        </div>
      ) : (
         <Verification setVerification ={setVerification} />
      )}
      <div className='mt-5'>
        <Footer />
      </div>
    </div>
  );
};

export default GuideDashboard;
