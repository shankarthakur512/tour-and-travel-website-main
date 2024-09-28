import React, { useState } from "react";
import axios from "axios";
import { IoCloseOutline } from "react-icons/io5";
import { FaApple, FaGoogle } from "react-icons/fa";
import { Bounce, Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";
import { CheckUser, registerUser } from "../../Apihandle/user";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebaseconf";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/authslice";

function SignUp ({signUpPopup ,setSignUpPopup}){

  const[email ,setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [confpassword , setconfPassword] = useState("");
  const[username , setUsername] = useState("");
  const [message,setMessage] = useState(false);
  const [register , setRegister] = useState(false);
  const[fullname , setFullname] = useState("");
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  function validateEmail(email) {
      var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
  }

  const handleEmailsignUp = async(e)=> {
      e.preventDefault();
      let res;
      if(validateEmail(email)) { 
          const {data} = await axios.post(CheckUser , {email});
          res = data;
      }
      if(res.statusCode === 200){
          toast("Email is Already exist", {
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
          Navigate('/login')
      } else {
          setRegister(true);
      }
  }

  const handleRegisterUser = async(e)=>{
      e.preventDefault();
      if(password !== confpassword) return;
      const user = await axios.post(registerUser , {email, username, password, fullname});
      dispatch(login({userData : user}));
      setRegister(!register);
      setSignUpPopup(false);
  }  

  const handlesingUp = async (e) =>{
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const {user} = await signInWithPopup(firebaseAuth , provider);
      const email = user.email;
      if (email) {
          const {data} = await axios.post(CheckUser,{email});
          if(!data.success){
              setEmail(user.email);
              setFullname(user.displayName);
              setRegister(true);
          } else {
              dispatch(login({userData  : data.data}));
              setSignUpPopup(false);
          }
      } 
    } catch(error) {
      console.log(error);
    }
  }

  return (
      <>
      {signUpPopup && (
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm border">
            
            
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[40vw]">
              <div className="flex items-center justify-between border-b border-gray-300">
                <div>
                  <h1 className="text-2xl text-primary font-serif font-semibold text-black/70">
                    {!register ? "SignIn" : "SignUp"} 
                  </h1>
                  <span className="text-xs">start your journey with Travellogo</span>
                </div>
                <div>
                  <IoCloseOutline className="text-2xl cursor-pointer"
                    onClick={() => {
                      setSignUpPopup(false);
                      setRegister(false);
                      setEmail("");
                    }}
                  />
                </div>
              </div>
              { !register ?  (
                <div>
                  <div className="mt-10">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); }}
                      placeholder="Enter your email"
                      className={`w-full h-12  rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4 ${validateEmail(email) ? "border border-green-800" : "border border-red-500"}`}
                    />
                    <div className="flex justify-center mt-5">
                      <button 
                        onClick={(e) => { handleEmailsignUp(e); }}
                        className="bg-gradient-to-r w-full p-2 h-10 from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full">
                        Continue
                      </button>
                    </div>
                    
                  </div>
                  <div className="mt-16 flex mx-10">
                    <div className="border h-0 border-gray-300 w-[40%] mt-3"></div>
                    <span className="text-xl mx-3">or</span>
                    <div className="border h-0 border-gray-300 w-[40%] mt-3"></div>
                  </div>
                  <div className="border border-gray-300 mt-4 flex gap-3 p-2 rounded-md justify-center items-center hover:bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 ">
                    <FaApple className="text-2xl" />
                    <span className="text-base"> Continue with Apple</span>
                  </div>
                  <div className="border border-gray-300 mt-4 flex gap-3 p-2 rounded-md justify-center items-center hover:bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200"
                    onClick={(e) => { handlesingUp(e); }}>
                    <FcGoogle className="text-2xl" />
                    <span className="text-base"> Continue with Google</span>
                  </div>
                  <div className="border border-gray-300 mt-4 flex gap-3 p-2 rounded-md justify-center items-center hover:bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 ">
                    <FcGoogle className="text-2xl" />
                    <span className="text-base"> Continue with Facebook</span>
                  </div>
                </div>
              ) : (
                <div className="mt-10">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); }}
                    placeholder="Enter your email"
                    className="w-full h-12  rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                  />
                  <input 
                    type="text"
                    value={fullname}
                    onChange={(e) => { setFullname(e.target.value); }}
                    placeholder="Full Name"
                    className="w-full h-12  rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                  />
                  <input 
                    type="text"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); }}
                    placeholder="Username"
                    className="w-full h-12  rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                  />
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); }}
                    placeholder="Enter your Password"
                    className="w-full h-12  rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                  />
                  <input 
                    type="password"
                    value={confpassword}
                    onChange={(e) => { setconfPassword(e.target.value); }}
                    placeholder="Confirm password"
                    className="w-full h-12  rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                  />
                  <button 
                    onClick={(e) => { handleRegisterUser(e); }}
                    className="bg-gradient-to-r w-full p-2 h-10 from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full">
                    Continue
                  </button>
                </div>
              )}
            </div>
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
          </div>
      )}
      </>
  )
}

export default SignUp;
