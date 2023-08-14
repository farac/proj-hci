// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNVv8ueW9W6obo2SxNvdeG3CMhkgWkvB4",
  authDomain: "count-me-in-ffb07.firebaseapp.com",
  projectId: "count-me-in-ffb07",
  storageBucket: "count-me-in-ffb07.appspot.com",
  messagingSenderId: "137810737582",
  appId: "1:137810737582:web:3640d5a5735dfe455e303f",
  databaseURL:
    "https://count-me-in-ffb07-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
