import React, { useState } from "react";
import Hero from "../components/Hero/Hero";
import NatureVid from "../assets/video/main.mp4";
import BlogsComp from "../components/Blogs/BlogsComp";
import Places from "../components/Places/Places";
import Testimonial from "../components/Testimonial/Testimonial";
import Banner from "../components/Banner/Banner";
import BannerPic from "../components/BannerPic/BannerPic";
import BannerImg from "../assets/places/Banner1.jpg";
import Banner2 from "../assets/places/Banner2.jpg";
import OrderPopup from "../components/OrderPopup/OrderPopup";
import SignUp from "../components/registerUser/registerUser";
import BannerPic2 from "../components/BannerPic/BannerPic2";
const Home = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  const title = "Discover the Beauty of the Himalayas";
  const description =
    "Join us on an unforgettable journey to the majestic Himalayas. Experience breathtaking views, serene landscapes, and a rich cultural heritage like never before.";
  return (
    <>
      <div>
        <div className="h-[700px] relative">
          <video
            autoPlay
            loop
            muted
            className="absolute right-0 top-0 h-[700px] w-full object-cover z-[-1]"
          >
            <source src={NatureVid} type="video/mp4" />
          </video>
          <Hero />
        </div>
        <Places handleOrderPopup={handleOrderPopup} />
        <BannerPic img={BannerImg} title={title} description ={description} />
        <BlogsComp />
        <Banner />
        <BannerPic2 img={Banner2}  />
        <Testimonial />
        <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
      </div>
    </>
  );
};

export default Home;
