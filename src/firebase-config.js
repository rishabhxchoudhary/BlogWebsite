import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAj6XaAPWvzfO-DYccT0ONPddtWmshj8Kk",
  authDomain: "blog-website-77f8d.firebaseapp.com",
  projectId: "blog-website-77f8d",
  storageBucket: "blog-website-77f8d.appspot.com",
  messagingSenderId: "943549792094",
  appId: "1:943549792094:web:87e687df7e62321ae959cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()