import React from "react";
import { IoLocationOutline , IoWalletOutline,IoPeopleOutline,IoGlobeOutline } from "react-icons/io5";

function WorkwithUs () {
return(
    <div className="mt-20 h-auto bg-secondary pt-10 pb-10">
    <div className="text-3xl sm:text-4xl lg:text-5xl flex font-semibold text-white justify-center items-center mb-10 px-4 text-center">
      Why Work with Travellogo <IoLocationOutline className="ml-2" />?
    </div>
    
    <div className="mx-5 sm:mx-10 lg:mx-20 p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      
      <div className="border rounded-lg p-5 bg-white shadow-lg">
        <div className="flex items-center mb-4">
          <IoWalletOutline className="text-primary text-3xl sm:text-4xl mr-3" />
          <h1 className="text-lg sm:text-xl font-sans text-primary">Hassle-Free Payments</h1>
        </div>
        <p className="text-gray-700 text-sm sm:text-base">
          Experience seamless and secure payments through our platform. We ensure that all transactions are quick, transparent, and protected, giving you peace of mind.
        </p>
      </div>
  
      <div className="border rounded-lg p-5 bg-white shadow-lg">
        <div className="flex items-center mb-4">
          <IoPeopleOutline className="text-primary text-3xl sm:text-4xl mr-3" />
          <h1 className="text-lg sm:text-xl font-sans text-primary">Connect with a Global Audience</h1>
        </div>
        <p className="text-gray-700 text-sm sm:text-base">
          By partnering with Travellogo, you gain access to a global network of travelers eager to explore new destinations. Expand your reach and grow your business.
        </p>
      </div>
  
      <div className="border rounded-lg p-5 bg-white shadow-lg">
        <div className="flex items-center mb-4">
          <IoGlobeOutline className="text-primary text-3xl sm:text-4xl mr-3" />
          <h1 className="text-lg sm:text-xl font-sans text-primary">24/7 Support</h1>
        </div>
        <p className="text-gray-700 text-sm sm:text-base">
          We offer round-the-clock support to ensure that you and your clients have the best experience possible. Whether it's resolving issues or answering questions, we are always here to help.
        </p>
      </div>
  
    </div>
  </div>
  

)

}

export default WorkwithUs