import React ,{useState}from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import OrderPopup from "../components/OrderPopup/OrderPopup";
import SignUp from "../components/registerUser/registerUser";

const Layout = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [signUpPopup , setSignUpPopup] = useState(false)
  const handleSignUpPopup =() =>{
    setSignUpPopup(!signUpPopup);
  }
  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  return (
    <>
      <Navbar handleOrderPopup={handleOrderPopup} handleSignUpPopup={handleSignUpPopup}  />
      <Outlet />
      <Footer />
      <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
      <SignUp signUpPopup={signUpPopup} setSignUpPopup={setSignUpPopup} />
    </>
  );
};

export default Layout;
