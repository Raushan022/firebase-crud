import { initializeApp } from "firebase/app";

const firebaseConfig = {
   apiKey: "AIzaSyClbP6HOQ30yMwmupfa4PAcvuULkusqCkI",
   authDomain: "fir-crud-b73da.firebaseapp.com",
   projectId: "fir-crud-b73da",
   storageBucket: "fir-crud-b73da.firebasestorage.app",
   messagingSenderId: "1038087030426",
   appId: "1:1038087030426:web:9acce8630ee6bf9b9f8123",
   measurementId: "G-TCS0M65JJM"
};

// Initialize Firebase
const firebaseConfigApp = initializeApp(firebaseConfig);
export default firebaseConfigApp;
