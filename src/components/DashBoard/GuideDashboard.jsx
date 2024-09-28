import React, { useEffect, useState } from 'react';
import DashboardNav from './DashboardNav';
import { useDispatch, useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { IoIosNotificationsOutline } from "react-icons/io";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Import chart elements
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
import ChatComponent from '../others/Chat.jsx';
import GuideChatComponent from '../others/guideChat.jsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { login } from '../../Redux/authslice.js';
import { CheckUser } from '../../Apihandle/user.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const GuideDashboard = () => {
  const [verification, setVerification] = useState(false);
  const [profileComp, setProfileComp] = useState(false);
  const [verifyAddress, setVerifyAddress] = useState(false);
  const [GuideData, setGuideData] = useState(null);
  const [GuideAddress, setGuideAddress] = useState(null);
  const [GuideInfo, setGuideInfo] = useState(null);
  const [GuideRegisterd, setGuideRegisterd] = useState(false);
  const [notify , setNotify] = useState(false)
  const userData = useSelector((state) => state.auth.userData);
  const GuideuserData = useSelector((state) => state.Guide.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const incomeData = {
    labels: ['Calls', 'Chats', 'Trips'],
    datasets: [{
      data: [10, 100, 1000], 
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }],
  };


  // useEffect(() => {
  //   const auth = getAuth();
  
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const email = user.email;
  
  //       if (email) {
  //         const { data } = await axios.post(CheckUser, { email });
  //         if (data) {
  //           dispatch(login({ userData: data.data }));
  
  //           // const previousRoute = location.state?.from || '/';
  //           // navigate(previousRoute);  
  //         }
  //       }
  //     }
  //   });
  
  //   // Cleanup subscription on component unmount
  //   return () => unsubscribe();
  // }, [auth, dispatch, location, navigate]);




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
      // const auth = getAuth();
      //   console.log("here")
      // onAuthStateChanged(auth, async (user) => {
      //     if (user) {
      //       console.log(user)
      //       const email = user.email;
      
      //       if (email) {
      //         const { data } = await axios.post(CheckUser, { email });
      //         if (data) {
      //           dispatch(login({ userData: data.data }));
      //           setGuideRegisterd(true);
      //           // const previousRoute = location.state?.from || '/';
      //           // navigate(previousRoute);  
      //         }
      //       }
      //     }
          
      //   });
      // navigate('/login');
    } else {
      if (GuideuserData) {
        setGuideRegisterd(true);
      }
    }
  }, [userData, GuideuserData, navigate]);

  return (
    <div className="container mx-auto p-5">
     <div className=" top-0 z-50 bg-white shadow-lg sticky">
  <DashboardNav notify={notify} setNotify={setNotify} />

  {/* "Hello" notification div */}
  {notify && (
    <div className="absolute h-[40vh] w-[30vw] right-24 top-12 bg-white border border-gray-300 shadow-lg rounded-md p-3">
      <h2 className='flex justify-center'>Notifications</h2>
      <div className='h-full flex items-center justify-center'>
        <span>No notifiction here </span>
         </div>
    </div>
  )}
</div>


      {!verifyAddress ? (
        !verification ? (
          profileComp ? (
            <CompleteProfile setProfileComp={setProfileComp} setGuideData={setGuideData} />
          ) : (
            <>
              <div className="flex   md:flex-row p-5 ">
                <div className="mb-6 flex-1  md:mb-0 ml-2">
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
                  <div className=' w-full flex gap-3'>
             <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Income Overview</h3>
            <Doughnut data={incomeData} />
            <p className=" mt-4 text-justify w-[30vw] p-2 shadow-lg">
  Above is an overview of your income from various sources, including call bookings, trip hosting, and chats. This data provides valuable insights into your earnings performance over time, allowing you to track your progress and make informed decisions. Stay updated to maximize your potential and grow your business as a local guide.
</p>

          </div>
          <div className='shadow-lg w-full'> 
          <h3 className="text-2xl flex justify-center text-primary  font-semibold mb-4 ">Query section</h3>
         <div className='sticky'> <GuideChatComponent /> </div> 
          </div>
          </div>
                  )}
                </div>
              </div>
              <div className="p-5 mt-5 gap-5">
                <div className="flex gap-5">
                  <span className="border p-2 rounded-lg hover:border-b-4 cursor-pointer bg-gradient-to-r from-secondary to-primary text-white">
                    Your upcoming call bookings (0)
                  </span>
                  <span className="border p-2 rounded-lg hover:border-b-4 cursor-pointer bg-gradient-to-r from-secondary to-primary text-white">
                    Your past bookings
                  </span>
                </div>
                <div className={`h-56 mt-5 border-2 rounded-lg flex items-center justify-center ${GuideRegisterd ? "bg-white" :"bg-gray-200"}`}>
                  {GuideRegisterd ? <span className=''>No calls booking</span> : <span>Update and verify your account first.</span>}
                </div>
              </div>
              <div>
              <TripDashboard GuideRegisterd={ GuideRegisterd }   />   
              </div>
              <div className='border '>
                <h3 className='text-xl font-semibold mb-4 flex justify-center'>Your customers reviews</h3>
              </div>
              <div className="p-5 mt-5">
                <Guidelines />
              </div>
            </>
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
