import React, { useEffect, useState } from 'react';
import DashboardNav from './DashboardNav';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosNotificationsOutline } from "react-icons/io";
import Footer from '../Footer/Footer';
import Guidelines from '../Guidlines/Guideline.jsx'; // Fixed the import path
import Verification from './GuideVerification';
import CompleteProfile from "./CompleteProfile.jsx";
import Address from '../localGuide/Address.jsx';
import axios from 'axios';
import { registerGuide } from '../../Apihandle/LocalGuide.js';
import { addGuide } from '../../Redux/GuideSlice.js';
 // Import the Address component

const GuideDashboard = () => {
  const [verification, setVerification] = useState(false);
  const [profileComp, setProfileComp] = useState(false);
  const [verifyAddress, setVerifyAddress] = useState(false); // State for address verification
  const [GuideData, setGuideData] = useState(null);
  const [GuideAddress ,  setGuideAddress] =  useState(null)
  const [GuideInfo , setGuideInfo] = useState(null)
  const userData = useSelector((state) => state.auth.userData);
 const dispatch = useDispatch();

//Sending LocalGuideInfo to Backend
useEffect(() => {
  const RegisterGuide = async () => {
    if (GuideAddress && GuideData && GuideInfo) {
      try {
        const formData = new FormData();
        formData.append('user', userData?._id);
        formData.append('address', GuideAddress.street);
        formData.append('city', GuideAddress.city);
        formData.append('country', GuideAddress.country);
        formData.append('aboutYourself', GuideData.aboutYourself);
        formData.append('native', GuideData.placeBelonging);
        formData.append('mobileNo', GuideInfo.mobile);
        formData.append('email', GuideInfo.email);
        formData.append('Govt_ID', GuideInfo.aadhaar);
  
        if (GuideData.Photo) {
          formData.append('Photo', GuideData.Photo);
        }
       console.log(formData)
        const { data } = await axios.post(registerGuide, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('Guide registered successfully:', data);
        dispatch(addGuide({userData : data.guide}))
      } catch (error) {
        console.error('Error registering guide:', error);
      }
    }
  };
  

  RegisterGuide();
}, [GuideAddress, GuideData, GuideInfo, userData]);




  const handleVerification = (e) => {
    e.preventDefault();
    setVerification(!verification);
  }

  const handleProfileCompletion = (e) => {
    e.preventDefault();
    setProfileComp(!profileComp);
  }

  const handleAddressVerification = (e) => {
    e.preventDefault();
    setVerifyAddress(true);
  }

  useEffect(() => {
    console.log(userData);
    console.log(GuideAddress);
    console.log(GuideData);
    console.log(GuideInfo)
  });

  return (
    <div className="container mx-auto p-5">
      <div className="border-b-4 mb-5">
        <DashboardNav />
      </div>

      {!verifyAddress ? (
        !verification ? (
          profileComp ? (
            <CompleteProfile setProfileComp={setProfileComp} setGuideData={setGuideData} />
          ) : (
            <div>
              <div className="flex flex-col md:flex-row p-5 justify-between">
                <div className="mb-6 md:mb-0 ml-2 gap-10">
                  <span className="text-2xl font-serif">Welcome, {userData ? userData.fullname : 'User'}!</span>
                  {<div className='flex flex-col gap-10 md:flex-row '>
                  { !GuideInfo ? <div className="mt-6 border p-5 w-64 rounded-md cursor-pointer" onClick={handleVerification}>
                      <h1 className="text-xl font-serif">Verify your Account</h1>
                      <span className="text-xs">Verify your email, mobile number</span>
                    </div> :<div className="mt-6 border p-5 w-64 rounded-md cursor-pointer border-primary" onClick={handleVerification}>
                      <h1 className="text-xl font-serif text-primary"> Information  Verified</h1>
                      <span className="text-xs text-secondary">your details is verified</span>
                    </div> }
                    <div className={`mt-6 border p-5 w-64 rounded-md cursor-pointer ${GuideData ? "border-primary border-2" : ""}`} onClick={handleProfileCompletion}>
                      <h1 className={`text-xl font-serif ${GuideData ? "text-primary" : ""}`}>Complete your profile</h1>
                      <span className={`text-xs ${GuideData ? "text-secondary" : ""}`}>Upload your picture, Languages</span>
                    </div>
                    <div className={`mt-6 border p-5 w-64 rounded-md cursor-pointer ${GuideAddress? "border-primary border-2" : ""}`} onClick={handleAddressVerification}>
{ !GuideAddress ?   <div>  <h1 className={`text-xl font-serif `}>Verify Your Address</h1>
                     <span className={`text-xs`}>Give your country, city details</span>
                     </div> :<div>  <h1 className={`text-xl font-serif text-primary`}>Address get Verified</h1>
                      <span className={`text-xs text-secondary`}>Your Adress get Verified</span>
                      </div>
}                  </div>
                  </div> }
                </div>
                
              </div>
              <div className='p-5 mt-5 gap-5'>
                <div className="flex gap-5">
                  <span className='border p-2 rounded-lg hover:border-b-4 cursor-pointer bg-gradient-to-r from-secondary to-primary text-white'>Your upcoming bookings (0)</span>
                  <span className='border p-2 rounded-lg hover:border-b-4 cursor-pointer bg-gradient-to-r from-secondary to-primary text-white'>Your upcoming bookings</span>
                </div>
                <div className='h-56 mt-5 border rounded-lg flex items-center justify-center bg-slate-300'>
                  <span>Here no any bookings. Update and Verify your Account first</span>
                </div>
              </div>
              <div className='p-5 mt-5'>
                <Guidelines />
              </div>
            </div>
          )
        ) : (
          <div className=' p-10'>
          <Verification setVerification={setVerification} setGuideInfo={setGuideInfo} />
          </div>
        )
      ) : (
<Address setVerifyAddress={setVerifyAddress} setGuideAddress = {setGuideAddress} />      )}
      <div className='mt-5'>
        <Footer />
      </div>
    </div>
  );
};

export default GuideDashboard;
