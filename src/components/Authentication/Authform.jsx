import React, { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import 'react-toastify/dist/ReactToastify.css';
import { FaApple, FaFacebook, FaGoogle, FaInstagramSquare, FaTwitter } from "react-icons/fa";
import axios from "axios";
import "./QuotesSlider.css"; 
import { CheckUser, loginUser } from "../../Apihandle/user";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/authslice";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup , getAuth } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebaseconf";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

const auth = getAuth();

useEffect(() => {
  const auth = getAuth();

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const email = user.email;

      if (email) {
        const { data } = await axios.post(CheckUser, { email });
        if (data) {
          dispatch(login({ userData: data.data }));

          const previousRoute = location.state?.from || '/';
          navigate(previousRoute);  
        }
      }
    }
  });

  // Cleanup subscription on component unmount
  return () => unsubscribe();
}, [auth, dispatch, location, navigate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); 

    return () => clearInterval(intervalId);
  }, []);
  const quotes = [
    "Experience the joy of travel with Travellgo – Your guide to the world's wonders.",
    "From dream destinations to real-life adventures – Travellgo makes it happen.",
    "Explore new horizons and create unforgettable memories with Travellgo.",
    "Discover hidden gems and travel with the best guides – only with Travellgo."
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(loginUser, { email, password });
      const loggedInUser = data.data.user;
      dispatch(login({ userData: loggedInUser }));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGmailLogin = async (e) =>
  {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const {user} = await signInWithPopup(firebaseAuth , provider);
      const email = user.email;
      if (email) {
          const {data} = await axios.post(CheckUser,{email});
          if(!data.success){
            toast.error("No any account .", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
              // setEmail(user.email);
              // setFullname(user.displayName);
              // setRegister(true);
          } else {
              dispatch(login({userData  : data.data}));
              navigate('/')
          }
      } 
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-white text-black shadow-md">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
              <img src={Logo} alt="Logo" className="h-12" />
            </Link>
            <button
              className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-600 text-white px-6 py-2 rounded-full"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <div className="bg-login-page-bg h-[100vh] bg-cover flex justify-center items-center">
      <ToastContainer  
                     position="bottom-right"
                     autoClose={5000}
                     hideProgressBar={false}
                     newestOnTop={false}
                     closeOnClick
                     rtl={false}
                     pauseOnFocusLoss
                     draggable
                     pauseOnHover
                     theme="light"
                     transition={Bounce}
                    />
        <div className="flex mt-20  w-full max-w-5xl shadow-lg rounded-lg overflow-hidden">
        <div className="w-full bg-primary opacity-70 text-white flex flex-col justify-center p-10 relative overflow-hidden">
      <h2 className="text-5xl opacity-100 font-semibold mb-4">Travel The World</h2>
      <div className="quote-container">
        <p className="quote-text">{quotes[currentQuoteIndex]}</p>
      </div>
    </div>

          <div className="w-1/2 bg-white flex flex-col p-10">
            <h1 className="text-3xl font-semibold">Sign In</h1>
            <span className="text-sm text-gray-500 mb-6">to your account</span>

            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
              <label htmlFor="email" className="text-lg">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                className="h-12 px-4 border rounded-md"
                placeholder="Enter your email address"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password" className="text-lg">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                className="h-12 px-4 border rounded-md"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="h-12 w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:from-secondary hover:to-primary transition-all duration-500"
              >
                Sign In
              </button>
            </form>

            <div className="flex justify-between items-center mt-8">
              <span className="text-primary hover:text-secondary cursor-pointer">Forgot Password?</span>
              <div className="flex gap-4">
                <FaApple className="text-2xl cursor-pointer" />
                <FaFacebook className="text-2xl cursor-pointer" />
                <FaGoogle onClick={(e)=>handleGmailLogin(e)} className="text-2xl cursor-pointer" />
              </div>
            </div>

            <div className="mt-10">
              <div className="flex gap-6">
                <FaFacebook className="text-lg" />
                <FaInstagramSquare className="text-lg" />
                <FaTwitter className="text-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-primary text-white py-6 text-center">
      <div className="flex gap-8 p-5 mx-44 text-base pt-3 font-light">
        <span className=""> cookie Notice</span>
        <span> your privacy choices</span>
        <span>Do not sell my info</span>
        <span>General policy</span>
        <span>Privacy policy</span>
        <span>IP rights</span>
       </div>
       
       
       <div className="text-center py-5   bg-primary text-white">
              @copyright 2024 All rights reserved || 
            </div>
      </footer>
    </>
  );
}

export default AuthForm;
