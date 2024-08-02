// Import necessary functions from the Firebase SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Ensure correct import
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDKzZ51CpC_5XE6XtP1IcMlWSDIRck0PBI',
  authDomain: 'hsproject-4d0ca.firebaseapp.com',
  projectId: 'hsproject-4d0ca',
  storageBucket: 'hsproject-4d0ca.appspot.com',
  messagingSenderId: '688250472177',
  appId: '1:688250472177:web:8c2a60419a7563f27f8b50',
  measurementId: 'G-111233HJN0'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app); // Firestore initialization

// Initialize Auth
const auth = getAuth(app);
const storage = getStorage(app);
// Verify Firestore Initialization
console.log('Firestore DB:', db);

// Export the necessary modules
export { db, auth,storage, createUserWithEmailAndPassword, signInWithEmailAndPassword };
