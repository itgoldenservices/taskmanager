import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyD1ESBTaeN5qHLnXHELnpSuX6LVWmDgluk",
  authDomain: "task-manager-cd8af.firebaseapp.com",
  projectId: "task-manager-cd8af",
  storageBucket: "task-manager-cd8af.appspot.com",
  messagingSenderId: "80589073746",
  appId: "1:80589073746:web:41956cff3bf10522371e8b",
  measurementId: "G-2T5YHNPJQC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getFirestore(app);

export { db, auth };
