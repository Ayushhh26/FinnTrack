// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPruZDj-uM__sp6Ip9V6mdg1Uhr85XkoU",
  authDomain: "finance-tracker-b104a.firebaseapp.com",
  projectId: "finance-tracker-b104a",
  storageBucket: "finance-tracker-b104a.appspot.com",
  messagingSenderId: "1040979330820",
  appId: "1:1040979330820:web:1f342de82da62a9023b251"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app,db, auth}