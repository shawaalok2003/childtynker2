// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXyU3talgEz7Mb6-0HyLhIG6y864abjws",
  authDomain: "childtynker.firebaseapp.com",
  projectId: "childtynker",
  storageBucket: "childtynker.firebasestorage.app",
  messagingSenderId: "332654114896",
  appId: "1:332654114896:web:a0c36f59f8b03b1d97b955",
  measurementId: "G-5N0QM93VF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage }; 