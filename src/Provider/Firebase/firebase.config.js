// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABZKJHMQJIq2ao7NJujSDfGN1vGzxIIsE",
  authDomain: "buy-nest.firebaseapp.com",
  projectId: "buy-nest",
  storageBucket: "buy-nest.appspot.com",
  messagingSenderId: "153637755085",
  appId: "1:153637755085:web:d15f5cf8e3a4712421b184"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;