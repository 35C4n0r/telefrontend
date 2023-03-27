// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDD7uCM8D8AP_N2L-eveEqp9YxFmbQZwH8",
    authDomain: "teleboard-c46f4.firebaseapp.com",
    projectId: "teleboard-c46f4",
    storageBucket: "teleboard-c46f4.appspot.com",
    messagingSenderId: "45842287004",
    appId: "1:45842287004:web:b1af3914e7ccb4f5606059",
    measurementId: "G-14BJVFB6NW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


