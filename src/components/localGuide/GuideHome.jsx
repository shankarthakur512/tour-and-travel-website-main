import React, { useEffect, useState } from "react";

import GuideHomePage from "./GuideHomePage";
import Address from "./Address";



const GuideHome = () => {
 const [setUp , setSetUp] = useState(false)



  return (
    <>
       
   <GuideHomePage setSetup={setSetUp} />
   </>
  );
};

export default GuideHome;
