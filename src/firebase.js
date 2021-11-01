import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBzM0uzX3CQhzXaaw6XzUPwpufvXVl3cAU",
    authDomain: "mancity-eac21.firebaseapp.com",
    projectId: "mancity-eac21",
    storageBucket: "mancity-eac21.appspot.com",
    messagingSenderId: "721437012391",
    appId: "1:721437012391:web:4049187bd2e27133758682",
    measurementId: "G-3XWE7Y1YTD"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export { firebase }