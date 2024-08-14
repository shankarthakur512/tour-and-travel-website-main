import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FcCheckmark } from "react-icons/fc";

import CapturePhoto from "./CapturePhoto";
import GuideQuestions from "./GuideQuestions";




function CompleteProfile ({setProfileComp , GuideData ,setGuideData }) {
    const [image , setImage] = useState(null);
    const [showCaptureImage , setShowCaptureImage] = useState(false);
    const  [imageCaptured , setImageCaptured] = useState(false);
    useEffect(()=>{
        if(image){
        setImageCaptured(!imageCaptured)
        }
      },[])
    return (
        <div className="  px-36 p-10">
       {!showCaptureImage ?( 
        <div>
        <div className={`border p-5 rounded-lg cursor-pointer   hover:translate-x-2 transition-all duration-300 ${imageCaptured ? "border-secondary":""}`}
        onClick={(e) =>{
       e.preventDefault();
       setShowCaptureImage(!showCaptureImage)
        }}
        >
          <div className="flex justify-between">
           {!imageCaptured ? <div>
              <h1 className="text-xl font-serif">Capture your Photo</h1>
              <span className="text-xs">For verification purposes, you have to take your picture</span>
            </div> : <div>
              <h1 className="text-xl font-serif text-primary">Your Photo is Captured</h1>
              <span className="text-xs text-secondary">If you want to change , click me again</span>
            </div>}
          {imageCaptured ? <FcCheckmark className="text-3xl mt-2 " />  :  <IoIosArrowForward className="text-3xl mt-2" />}
          </div>
          </div>
          {imageCaptured ? <div className=" flex justify-center py-3 ">
     <img  src={image}  alt="nothing" className="rounded-full h-40 w-40"/>
     </div> : <></>}
          <div className=" mt-5">
        <GuideQuestions setGuideData={setGuideData}  setProfileComp={setProfileComp}   imageCaptured={imageCaptured} image={image}/>
         </div>
          </div>
       
        ) : <CapturePhoto  setImage={setImage} setShowCaptureImage={setShowCaptureImage} setImageCaptured ={setImageCaptured}/>}
      
   
    

      </div>
    )
}

export default CompleteProfile