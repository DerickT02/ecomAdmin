// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1BCr3zikGp705QH8YBbr01OxISO3ImAQ",
  authDomain: "ecommerceproject-416fd.firebaseapp.com",
  projectId: "ecommerceproject-416fd",
  storageBucket: "ecommerceproject-416fd.appspot.com",
  messagingSenderId: "71973758576",
  appId: "1:71973758576:web:1b160343d5c21d606936b5",
  measurementId: "G-H6MQ6MZNC4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)


//const analytics = getAnalytics(app);

