import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBtAIgCRVRRRq1b01_sRyOsGZpJGj6GFOk",
  authDomain: "haval-86ee7.firebaseapp.com",
  projectId: "haval-86ee7",
  storageBucket: "haval-86ee7.appspot.com",
  messagingSenderId: "317570813342",
  appId: "1:317570813342:web:d66ba4237bfd8fc794da8f",
  measurementId: "G-0Z18H35MZX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
