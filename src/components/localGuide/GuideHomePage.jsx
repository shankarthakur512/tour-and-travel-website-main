import React ,{useEffect} from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WorkwithUs from "./Workwithus";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addGuide } from "../../Redux/GuideSlice";
import { findGuideByUserId } from "../../Apihandle/LocalGuide";

function GuideHomePage({ setSetup }) {
  const status = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
 const dispatch  = useDispatch();
  const handleCreateAccount = () => {
    if (status) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if(!userData) {
      navigate('/login')

    }else{
      const FindGuide = async () =>
      {
        const {data} = await axios.post(findGuideByUserId , {user : userData._id})
        if(data){
          dispatch(addGuide({userData : data.guide}))
          navigate('/dashboard')
        }
      }
      FindGuide();
    } },[userData])

  return (
    <div className="h-full w-full ">
      <div className="h-[70vh] bg-local-guide-bg bg-cover flex items-center justify-start ">
        <div className="flex flex-col ml-24 w-[36vw] p-5">
          <h1 className="mr-32 text-5xl font-semibold text-primary drop-shadow-lg">
            Be A Local Guide
          </h1>
          <span className="text-white mt-4 text-lg">
            Start your earning by becoming our guide partner
          </span>
          <button
            className="bg-gradient-to-r mt-8 from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-500 text-white h-12 px-8 py-2 rounded-full shadow-lg"
            onClick={handleCreateAccount}
          >
            Create Your Account
          </button>
        </div>
      </div>

      <WorkwithUs />

      <div className="flex flex-col justify-center py-16 bg-gray-50">
        <div className="flex justify-center">
          <div className="flex flex-col p-4 items-center">
            <h1 className="text-4xl font-semibold text-primary">
              Be our Local Guide in 4 Easy Steps
            </h1>

            {["Sign Up", "Verify Account", "Complete Profile", "Start Guiding"].map(
              (step, index) => (
                <div
                  key={index}
                  className="border-2 mt-8 rounded-2xl p-6 h-28 w-[90vw] max-w-xl border-secondary bg-white shadow-md"
                >
                  <h2 className="text-2xl font-medium text-primary">{step}</h2>
                  <span className="text-sm text-gray-600">
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

      {/* Reviews Section */}
      <div className="py-16 bg-gradient-to-b from-white to-gray-100">
        <h2 className="text-4xl font-semibold text-center text-primary">
          What Our Guides Say
        </h2>
        <div className="flex flex-wrap justify-center mt-10 space-y-8 md:space-y-0 md:space-x-8">
          {[
            {
              name: "John Doe",
              review:
                "Being a local guide has been an amazing experience! I get to meet new people and share my love for my hometown.",
              image: "https://via.placeholder.com/150",
            },
            {
              name: "Jane Smith",
              review:
                "Working with this platform has given me the freedom to work on my own terms while helping tourists discover hidden gems.",
              image: "https://via.placeholder.com/150",
            },
            {
              name: "Carlos Rivera",
              review:
                "The support from the team is great, and the flexibility of the job allows me to explore new places while earning money.",
              image: "https://via.placeholder.com/150",
            },
          ].map((guide, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4"
            >
              <img
                src={guide.image}
                alt={guide.name}
                className="rounded-full w-24 h-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-medium text-center text-primary">
                {guide.name}
              </h3>
              <p className="text-sm text-gray-600 text-center mt-2">
                "{guide.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GuideHomePage;
