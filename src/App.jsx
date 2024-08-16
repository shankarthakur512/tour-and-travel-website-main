import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import NoPage from "./pages/NoPage";
import About from "./pages/About";
import Localguide from "./pages/Localguide";
import BlogsDetails from "./pages/BlogsDetails";
import AOS from "aos";
import "aos/dist/aos.css";
//  from "./components/Authentication/SignIn";
import GuideDashboard from "./components/DashBoard/GuideDashboard";
import TourPackageCreation from "./components/TourPackage/TourPackegeMain";
import AuthForm from "./components/Authentication/Authform";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 900,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:id" element={<BlogsDetails />} />
            <Route path="local-guide" element={<Localguide />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NoPage />} />
          </Route>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/dashboard" element={<GuideDashboard />} />
          <Route path="/tourPackage" element={<TourPackageCreation />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
