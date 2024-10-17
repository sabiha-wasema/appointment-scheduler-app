// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARK3rfcl4J8Wap4hdGLu4wPIrbzYsbWhk",
  authDomain: "appointment-scheduler-ap-8b0dc.firebaseapp.com",
  projectId: "appointment-scheduler-ap-8b0dc",
  storageBucket: "appointment-scheduler-ap-8b0dc.appspot.com",
  messagingSenderId: "567972151648",
  appId: "1:567972151648:web:c07df00e039eeca94cde05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);