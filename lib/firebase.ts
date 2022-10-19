import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEqMYOzhsZx5H1sFjMQhS5mXm4ErPKS4o",
  authDomain: "nextfire-app-5d683.firebaseapp.com",
  projectId: "nextfire-app-5d683",
  storageBucket: "nextfire-app-5d683.appspot.com",
  messagingSenderId: "697032585858",
  appId: "1:697032585858:web:a6a5f9d8008cd0fb8e7a9b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
