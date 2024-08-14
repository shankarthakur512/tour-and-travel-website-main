import React, { useState, useEffect } from "react";
import GoogleMap from "../GoogleMap/GoogleMap";
import axios from "axios";
import { useForm } from "react-hook-form";
import GuideHomePage from "./GuideHomePage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addGuide } from "../../Redux/GuideSlice";

const MAP_API_KEY = "AIzaSyA98Ne9CIOFbqeXZ_hbxhWkIUMDX1r4T6k";
const CSC_API_KEY = "SVRwWk9YS1luWUxsc1RGa3ZiS212TlFTeGU2bm16NUVvSWVWZ29HRw==";

const axiosInstance = axios.create({
  headers: {
    "X-CSCAPI-KEY": CSC_API_KEY,
  },
});

function Address({ setVerifyAddress,setGuideAddress}) {
  const [setUp, setSetUp] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [country, setCountry] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
const dispatch = useDispatch();
  const handleForm = (data) => {
    console.log(data);
   setGuideAddress({...data})
   setVerifyAddress(false);
 };

  useEffect(() => {
    const fetchCountriesAndCities = async () => {
      try {
        const countryResponse = await axiosInstance.get(
          "https://api.countrystatecity.in/v1/countries"
        );
        setCountry(countryResponse.data);

        const cityResponse = await axiosInstance.get(
          "https://api.countrystatecity.in/v1/countries/IN/states/MH/cities"
        );
        setCities(cityResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountriesAndCities();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }, []);

  return (
    <div className="h-full my-20 mx-4 lg:mx-10">
      <div>
        <h1 className="border-l-4 border-primary/50 py-2 pl-2 mb-5 text-xl font-bold sm:text-3xl">
          Confirm Your Location
        </h1>
        <GoogleMap apiKey={MAP_API_KEY} longitude={longitude} latitude={latitude} />
      </div>
      <div className="mt-8">
        <h1 className="border-l-4 border-primary/50 py-2 pl-2 mb-4 text-xl font-bold sm:text-3xl">
          Enter Your Address Details
        </h1>
        <form onSubmit={handleSubmit(handleForm)} className="flex flex-col items-center w-full lg:w-[70vw] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium">Country</label>
              <select {...register("country")} className="h-10 border p-2 rounded">
                {country.map((country) => (
                  <option key={country.id} value={country.name} className="bg-slate-200">
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium">City</label>
              <select {...register("city")} className="h-10 border p-2 rounded">
                {cities.map((city) => (
                  <option key={city.id} value={city.name} className="bg-slate-200">
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium">House No/Street</label>
              <input
                {...register("street")}
                className="h-10 w-full lg:w-[30vw] border p-2 rounded"
                placeholder="Enter House no / street"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium">Pincode</label>
              <input
                type="number"
                {...register("pincode")}
                className="h-10 w-full lg:w-[24vw] border p-2 rounded"
                placeholder="Enter your Pincode"
              />
            </div>
          </div>
          <button
            className="bg-gradient-to-r mt-4 from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-600 text-white h-12 px-3 py-1 w-full lg:w-[30vw] rounded-full"
            type="submit"
            
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Address;
