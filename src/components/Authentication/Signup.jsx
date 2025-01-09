import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CheckUser, registerUser } from "../../Apihandle/user"; // Ensure these are API URLs
import { login } from "../../Redux/authslice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("signup");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      // Check if the email already exists
      const { data } = await axios.post(CheckUser, { email });
      if (data.success) {
        toast.error("Email already exists. Please sign in.", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
        return navigate('/login');
      }

      // Prepare form data for signup
      const formData = new FormData();
      formData.append('avatar', avatar);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('fullname', fullname);
      formData.append('username', username);

      // Register user with formData
      const response = await axios.post(registerUser, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.user) {
        dispatch(login({ userData: response.data.user }));
        navigate("/");
      } else {
        toast.error("Something went wrong.", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      console.error(error);
    }
  };

  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-white text-black shadow-md">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
              <img src={Logo} alt="Logo" className="h-12" />
            </Link>
            <Link to="/login">
              <button className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-600 text-white px-6 py-2 rounded-full">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="bg-login-page-bg h-screen bg-cover flex justify-center items-center px-4">
        <ToastContainer autoClose={5000} theme="light" transition={Bounce} />
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
          <div className="flex flex-col bg-white p-8 lg:p-12 shadow-lg rounded-lg w-full lg:w-1/2">
            <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
            <span className="text-sm text-gray-500 mb-6">Create your account</span>

            <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 px-4 border rounded-md w-full"
                />
                <input
                  type="text"
                  value={fullname}
                  placeholder="Full Name"
                  onChange={(e) => setFullname(e.target.value)}
                  className="h-10 px-4 border rounded-md w-full"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-10 px-4 border rounded-md w-full"
                />
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 px-4 border rounded-md w-full"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-10 px-4 border rounded-md w-full"
                />

                <input
                  type="file"
                  onChange={handleAvatarChange}
                  className="h-10 px-4 w-full rounded-md"
                />
              </div>

              {avatarPreview && (
                <div className="mt-4">
                  <img src={avatarPreview} alt="Avatar Preview" className="w-16 h-16 rounded-full object-cover" />
                </div>
              )}

              <button
                type="submit"
                className="h-10 w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:from-secondary hover:to-primary transition-all duration-500"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-6">
              <div className="flex gap-6">
                <FaFacebook className="text-lg" />
                <FaInstagramSquare className="text-lg" />
                <FaTwitter className="text-lg" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-primary opacity-80 p-8 rounded-lg text-white w-full lg:w-1/2">
            <h1 className="text-4xl font-bold mb-4">Travel the World</h1>
            <p className="text-center">You visit, we guide</p>
          </div>
        </div>
      </div>

      <footer className="bg-primary text-white py-6 text-center mt-8">
        <div className="flex justify-center gap-6 text-sm">
          <span>Cookie Notice</span>
          <span>Your Privacy Choices</span>
          <span>Do Not Sell My Info</span>
          <span>General Policy</span>
          <span>Privacy Policy</span>
          <span>IP Rights</span>
        </div>
        <div className="mt-4">
          &copy; 2024 All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default SignUp;
