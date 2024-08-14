import React, { useEffect, useRef } from "react";
import { IoIosArrowBack  ,IoIosArrowForward} from "react-icons/io";

import {IoClose} from "react-icons/io5"

function CapturePhoto({setImage , setShowCaptureImage , setImageCaptured}) {
const videoref = useRef();
useEffect(()=>{
  let stream;
  try { 
 
  const startCamera = async() =>{
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
    videoref.current.srcObject = stream;
  };
  startCamera();
}catch(error){
 console.log(error);
}
  return () =>{
    stream?.getTracks().forEach((track) => track.stop());
  };
},[])
const CapturePhoto = () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = videoref.current.videoWidth;
  canvas.height = videoref.current.videoHeight;
  context.drawImage(videoref.current, 0, 0, canvas.width, canvas.height);

  canvas.toBlob((blob) => {
    if (blob) {
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
      setImage(file);
      setImageCaptured(true);
      setShowCaptureImage(false);
    }
  }, "image/jpeg");
};
  return (

    <div className="top-1/4 gap-3 rounded-lg pt-2 flex flex-col md:flex-row items-center justify-center">
      <div className="flex flex-col gap-4 h-full w-full md:w-1/2">
        <div className="flex justify-center">
          <video id="video" className="rounded-lg w-full md:w-auto" autoPlay ref={videoref}></video>
        </div>
        <div className="flex justify-between w-full ]">
          <button
            className="flex border text-base p-2 rounded-full hover:scale-105 px-4 py-1 ml-0 md:ml-12 duration-200"
            onClick={() => setShowCaptureImage(false)}
          >
            <IoIosArrowBack size={24} /> Back
          </button>
          <button
            className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 px-4 py-1 rounded-full duration-200"
            onClick={CapturePhoto}
          >
            Take Photo
          </button>
        </div>
      </div>
    
      <div className="w-full md:w-1/2 p-5">
        <div className="mt-5 p-5 border rounded-lg mb-8">
          <h2 className="text-lg font-serif mb-3">Guidelines for Capturing Your Photo</h2>
          <ul className="list-disc pl-5">
            <li className="mb-2">Ensure the image is clean and clear.</li>
            <li className="mb-2">Make sure your face is fully visible and not obstructed.</li>
            <li className="mb-2">Avoid dim lighting; capture the photo in a well-lit area.</li>
            <li className="mb-2">Avoid using filters or editing tools that alter your appearance.</li>
            <li className="mb-2">Use a plain background to avoid distractions.</li>
            <li className="mb-2">Ensure the photo is up-to-date and represents your current appearance.</li>
          </ul>
        </div>
      </div>
    </div>
    
  
    );
}

export default CapturePhoto;
