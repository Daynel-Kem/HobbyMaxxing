// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChbsHiNZCHNc4XUbLlxbH96dn4E8CU5F4",
  authDomain: "community-b28b4.firebaseapp.com",
  projectId: "community-b28b4",
  storageBucket: "community-b28b4.firebasestorage.app",
  messagingSenderId: "19126638940",
  appId: "1:19126638940:web:e4fd2b3ae4bd5275fac999",
  measurementId: "G-47SJ4K655F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app)