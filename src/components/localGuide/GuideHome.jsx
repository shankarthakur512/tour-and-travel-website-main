import React, { useEffect, useState } from "react";

import GuideHomePage from "./GuideHomePage";
import Address from "./Address";



const GuideHome = () => {
 const [setUp , setSetUp] = useState(false)

  return (
    <>
      {!setUp ? (
       <GuideHomePage setSetup={setSetUp} />
      ) : (
          <Address />
          
      )}
    </>
  );
};

export default GuideHome;
