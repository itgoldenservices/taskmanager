import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyD1ESBTaeN5qHLnXHELnpSuX6LVWmDgluk",
    authDomain: "task-manager-cd8af.firebaseapp.com",
    projectId: "task-manager-cd8af",
    storageBucket: "task-manager-cd8af.appspot.com",
    messagingSenderId: "80589073746",
    appId: "1:80589073746:web:41956cff3bf10522371e8b",
    measurementId: "G-2T5YHNPJQC"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);
app.analytics();

const db = app.firestore();
const auth = app.auth();

export { db, auth };