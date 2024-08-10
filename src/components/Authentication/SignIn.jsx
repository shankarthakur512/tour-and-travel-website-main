import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { FaApple, FaFacebook, FaGoogle, FaInstagramSquare, FaTwitter } from "react-icons/fa";
import {FcGoogle} from "react-icons/fc"
import axios from "axios";
import { loginUser } from "../../Apihandle/user";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/authslice";

function SignIn (){
const [email , setEmail] = useState("");
const [password , setPassword] = useState("");
const dispatch = useDispatch();
const navigate = useNavigate();

 const Handlelogin = async(e) =>{
try {
 e.preventDefault();
  // console.log("hi")
  // console.log(password)
  const {data} = await axios.post(loginUser,{email,password});
  const loggedInuser  = data.data.user
  // console.log(loggedInuser)
  dispatch(login({userData : loggedInuser}));
  navigate('/')
}catch(error){
  console.log(error)
}
 }

    return (
       <>
        <nav className="fixed top-0 right-0 w-full z-50 bg-white backdrop-blur-sm text-black shadow-md">
       
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4  font-bold text-2xl">
              <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
                <img src={Logo} alt="" className="h-16" />
              </Link>
              {/* <span>TCJ Tourism</span> */}
            </div>
          
            <div className="flex items-center gap-4">
             
              {/* Mobile Hamburger icon */}
             
              <button
                className="bg-gradient-to-r from-primary to-secondary hover:bg-bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3 py-1 rounded-full">
                Sign Up
              </button>
            </div>
          </div>
        </div>
        </nav>
      <div className="bg-login-page-bg h-[100vh] bg-cover  flex ">
      <div className=" w-[50vw]  flex justify-center items-center" >
        <div className=" p-10  w-[40vw]">
            <h2 className="text-5xl text-primary font-semibold ">Travel The world</h2>
            <span className="text-white text-sm mt-6">Experience the joy of travel with Travellgo – Your guide to the world's wonders.
            From dream destinations to real-life adventures – Travellgo makes it happen.
              </span>
        </div>
      </div>
      <div className="border gap-5 h-[100vh] p-10  mt-40 w-[45vw] bg-slate-100 shadow-md  rounded-md flex flex-col justify-center">
      <div className="  "> 
         <h1 className="text-3xl font-semibold">Sign In</h1>
        <span className="text-sm">to your account</span>
        </div>
        <form className=" flex flex-col mt-5 pl-6">
        <label htmlFor="email" className="text-lg">Email address </label>
        <input type="email" value={email} className="h-10 w-[80%] mt-2 p-4" placeholder="Enter your Email address" onChange={(e)=> setEmail(e.target.value)}/>
        <label htmlFor="email" value={password} className="text-lg" >Password </label>
        <input type="password" className="h-10 w-[80%] mt-2 p-4" placeholder="Enter your password" onChange={(e)=> setPassword(e.target.value)}/>
        <button
                className="bg-gradient-to-r h-10  w-[80%] mt-5 from-primary to-secondary hover:bg-bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3 py-1 rounded-full"
                onClick={(e)=>{Handlelogin(e)}}
                >
                Sign In
                
       </button>
        </form>
        <div className="mt-16 flex">
            <div className="border h-0 border-gray-300 w-[40%] mt-3"></div>
            <span className="text-xl mx-3">OR</span>
            <div className="border h-0 border-gray-300 w-[40%] mt-3"></div>

        </div>
        <div className="  flex rounded-md overflow-hidden ">
            <div className="border flex gap-2 px-3 w-[30%] hover:bg-slate-300">
                <FaApple  className=""/>
                <span className="text-sm">Apple</span>
            </div>
            <div className="border  flex gap-2 px-3 w-[30%] hover:bg-slate-300"
            >
                <FaFacebook className=""/>
                <span className="text-sm">Facebook</span>
            </div>
            <div className="border flex gap-2 px-3 w-[30%] rounded-md hover:bg-slate-300">
                <FaGoogle/>
                <span className="text-sm">Google</span>
            </div>
        </div>
        <div className="mt-5">
            <span className="text-primary   border-b border-primary hover:text-secondary hover:border-secondary mx-32"> forget Password ?</span>
        </div>
      </div>
      </div>
       <div className=" h-[30vh]"> </div>
      <div className=" border-b  border-gray-300 p-2 mt-5 mx-24 flex gap-5">
      <FaFacebook className="text-lg" />
      <FaInstagramSquare className="text-lg" />
      <FaTwitter className="text-lg"/>
      </div>
  
       <div className="flex gap-8 p-5 mx-24 text-base pt-3 font-light">
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
       </>
    )


}
export default SignIn;