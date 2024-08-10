import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyAwIR5UpaMS0m5LwDACfi1CeNjGTOWDKcY",
    authDomain: "travellogo-f4490.firebaseapp.com",
    projectId: "travellogo-f4490",
    storageBucket: "travellogo-f4490.appspot.com",
    messagingSenderId: "41990832915",
    appId: "1:41990832915:web:f15ada8d9882459aa2d0e6",
    measurementId: "G-LX70SGRNLF"
  };
  

  const app = initializeApp(firebaseConfig);
  export const firebaseAuth = getAuth(app);