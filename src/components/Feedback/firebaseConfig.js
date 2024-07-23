import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY_P,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN_P,
  projectId: process.env.FIREBASE_PROJECT_ID_P,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET_P,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID_P,
  appId: process.env.FIREBASE_APP_ID_P,
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); 
export { app, firestore};