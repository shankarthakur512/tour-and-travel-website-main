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
import { findGuideByUserId, registerGuide } from '../../Apihandle/LocalGuide.js';
import { addGuide } from '../../Redux/GuideSlice.js';
import { useNavigate } from 'react-router-dom';
import TripDashboard from './TripDashboard.jsx';
import { FaUserCheck, FaUserEdit, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons

const GuideDashboard = () => {
  const [verification, setVerification] = useState(false);
  const [profileComp, setProfileComp] = useState(false);
  const [verifyAddress, setVerifyAddress] = useState(false);
  const [GuideData, setGuideData] = useState(null);
  const [GuideAddress, setGuideAddress] = useState(null);
  const [GuideInfo, setGuideInfo] = useState(null);
  const [GuideRegisterd, setGuideRegisterd] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const GuideuserData = useSelector((state) => state.Guide.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          formData.append('languages', GuideData.Languages);

          if (GuideData.Photo) {
            formData.append('Photo', GuideData.Photo);
          }
          console.log(formData);
          const { data } = await axios.post(registerGuide, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log('Guide registered successfully:', data);
          dispatch(addGuide({ userData: data.guide }));
          setGuideRegisterd(true);
        } catch (error) {
          console.error('Error registering guide:', error);
        }
      }
    };

    RegisterGuide();
  }, [GuideAddress, GuideData, GuideInfo, userData, dispatch]);

  const handleVerification = (e) => {
    e.preventDefault();
    setVerification(!verification);
  };

  const handleProfileCompletion = (e) => {
    e.preventDefault();
    setProfileComp(!profileComp);
  };

  const handleAddressVerification = (e) => {
    e.preventDefault();
    setVerifyAddress(true);
  };

  useEffect(() => {
    if (!userData) {
      navigate('/login');
    } else {
      if (GuideuserData) {
        setGuideRegisterd(true);
      }
    }
  }, [userData, GuideuserData, navigate]);

  return (
    <div className="container mx-auto p-5">
      <div className="sticky top-0 z-50 bg-white shadow-lg">
        <DashboardNav />
      </div>

      {!verifyAddress ? (
        !verification ? (
          profileComp ? (
            <CompleteProfile setProfileComp={setProfileComp} setGuideData={setGuideData} />
          ) : (
            <div>
              <div className="flex flex-col md:flex-row p-5 justify-between items-start">
                <div className="mb-6 md:mb-0 ml-2">
                  <h1 className="text-3xl font-bold text-primary mb-4">Welcome, {userData ? userData.fullname : 'User'}!</h1>
                  {!GuideRegisterd ? (
                    <div className='flex flex-col gap-6 md:flex-row'>
                      {!GuideInfo ? (
                        <div
                          className="mt-6 border p-5 w-64 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 bg-white"
                          onClick={handleVerification}
                        >
                          <FaUserCheck className="text-2xl text-primary mb-3" />
                          <h1 className="text-xl font-bold text-primary">Verify your Account</h1>
                          <span className="text-sm text-gray-600">Verify your email, mobile number</span>
                        </div>
                      ) : (
                        <div
                          className="mt-6 border p-5 w-64 rounded-lg cursor-pointer border-primary bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={handleVerification}
                        >
                          <FaUserCheck className="text-2xl text-green-600 mb-3" />
                          <h1 className="text-xl font-bold text-green-600">Information Verified</h1>
                          <span className="text-sm text-secondary">Your details are verified</span>
                        </div>
                      )}
                      <div
                        className={`mt-6 border p-5 w-64 rounded-lg cursor-pointer ${GuideData ? "border-primary shadow-lg" : "hover:shadow-lg"} transition-all duration-300 bg-white`}
                        onClick={handleProfileCompletion}
                      >
                        <FaUserEdit className={`text-2xl mb-3 ${GuideData ? "text-primary" : "text-gray-600"}`} />
                        <h1 className={`text-xl font-bold ${GuideData ? "text-primary" : "text-gray-600"}`}>Complete your Profile</h1>
                        <span className="text-sm text-gray-500">Upload your picture, Languages</span>
                      </div>
                      <div
                        className={`mt-6 border p-5 w-64 rounded-lg cursor-pointer ${GuideAddress ? "border-primary shadow-lg" : "hover:shadow-lg"} transition-all duration-300 bg-white`}
                        onClick={handleAddressVerification}
                      >
                        <FaMapMarkerAlt className={`text-2xl mb-3 ${GuideAddress ? "text-primary" : "text-gray-600"}`} />
                        <h1 className={`text-xl font-bold ${GuideAddress ? "text-primary" : "text-gray-600"}`}>
                          {GuideAddress ? 'Address Verified' : 'Verify Your Address'}
                        </h1>
                        <span className="text-sm text-gray-500">{GuideAddress ? 'Your Address is Verified' : 'Provide your country, city details'}</span>
                      </div>
                    </div>
                  ) : (
                    <TripDashboard />
                  )}
                </div>
              </div>
              <div className="p-5 mt-5 gap-5">
                <div className="flex gap-5">
                  <span className="border p-2 rounded-lg hover:border-b-4 cursor-pointer bg-gradient-to-r from-secondary to-primary text-white">
                    Your upcoming bookings (0)
                  </span>
                  <span className="border p-2 rounded-lg hover:border-b-4 cursor-pointer bg-gradient-to-r from-secondary to-primary text-white">
                    Your past bookings
                  </span>
                </div>
                <div className="h-56 mt-5 border rounded-lg flex items-center justify-center bg-gray-200">
                  <span>No bookings yet. Update and verify your account first.</span>
                </div>
              </div>
              <div className="p-5 mt-5">
                <Guidelines />
              </div>
            </div>
          )
        ) : (
          <div className="p-10">
            <Verification setVerification={setVerification} setGuideInfo={setGuideInfo} />
          </div>
        )
      ) : (
        <Address setVerifyAddress={setVerifyAddress} setGuideAddress={setGuideAddress} />
      )}
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default GuideDashboard;
