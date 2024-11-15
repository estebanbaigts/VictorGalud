import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB9UvV8IxdqenQVZODyoHNbgFTlzrpG1Jc",
  authDomain: "victor-galud.firebaseapp.com",
  projectId: "victor-galud",
  storageBucket: "victor-galud.firebasestorage.app",
  messagingSenderId: "36097889414",
  appId: "1:36097889414:web:0917d8a35da208e9eeed07",
  measurementId: "G-XGJXEWYX3C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);