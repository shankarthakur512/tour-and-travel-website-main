import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WorkwithUs from "./Workwithus";

function GuideHomePage ({setSetup}){
    const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    if (status) {
     navigate('/dashboard')
    } else {
      navigate('/login');
    }
  };


    return (
        <div className="h-full w-full ">
        <div className="h-[70vh] bg-local-guide-bg bg-cover flex items-center justify-start ">
          <div className="flex flex-col ml-24 w-[36vw] p-5">
            <h1 className="mr-32 text-5xl font-semibold text-primary">
              Be A Local Guide
            </h1>
            <span className="text-white">
              Start your earning by becoming our guide partner
            </span>
            <button
              className="bg-gradient-to-r mt-4 from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-white h-12 px-3 py-1 rounded-full"
              onClick={handleCreateAccount}
            >
              Create Your Account
            </button>
          </div>
        </div>
     <WorkwithUs />
        <div className="flex flex-col justify-center">
        <div className=" flex justify-center">
          <div className="flex flex-col  p-4">
            <h1 className="text-4xl font-semibold pt-6 text-primary">
              Be our Local Guide in 4 easy steps
            </h1>
            
            {["Sign Up", "Verify Account", "Complete Profile", "Start Guiding"].map(
              (step, index) => (
                <div
                  key={index}
                  className="border-2 mt-6 rounded-2xl p-5 h-24 w-[52vw] border-secondary"
                >
                  <h2 className="text-xl font-medium">{step}</h2>
                  <span className="text-sm">
                    {index === 0
                      ? "Register yourself on our website and create your ID"
                      : `Step ${index + 1} description`}
                  </span>
                </div>
              )
            )}
            </div>
          </div>
        </div>
      </div>
    )
}

export default GuideHomePage;