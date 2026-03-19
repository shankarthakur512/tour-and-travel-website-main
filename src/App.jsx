import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import NoPage from "./pages/NoPage";
import About from "./pages/About";
import Localguide from "./pages/Localguide";
import BlogsDetails from "./pages/BlogsDetails";
import GuidePage from "./features/guides/pages/GuidePage.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
//  from "./components/Authentication/SignIn";
import GuideDashboard from "./components/DashBoard/GuideDashboard";
import TourPackageCreation from "./features/trips/components/TourPackageCreation";
import AuthForm from "./features/auth/components/AuthForm";
import Search from "./features/search/pages/SearchPage";
import TourPage from "./features/trips/pages/TourPage.jsx";
import PaymentPage from "./features/trips/pages/PaymentCheckoutPage.jsx";
import SignUp from "./features/auth/components/SignUpPage.jsx";

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
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<AuthForm />} />
            <Route path="dashboard" element={<GuideDashboard />} />
            <Route path="tourPackage" element={<TourPackageCreation />} />
            <Route path="search" element ={<Search />} />
            <Route path="search/:guideId" element={<GuidePage />} />
            <Route path="search/tour/:TripId" element={<TourPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
