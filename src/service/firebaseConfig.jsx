// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEiolm7yK9hOhEjIPrdTNGmzLQp9BTyCg",
  authDomain: "tourit-f8440.firebaseapp.com",
  projectId: "tourit-f8440",
  storageBucket: "tourit-f8440.firebasestorage.app",
  messagingSenderId: "342207683703",
  appId: "1:342207683703:web:64e7d89f0d843518be3a72",
  measurementId: "G-6VG85GBP7Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=  getFirestore()
// const analytics = getAnalytics(app);