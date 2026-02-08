// firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDR0F-iDW7HEzMq-063NFi41oktBO-Hbts",
  authDomain: "ar-sgn.web.app",               
  projectId: "ar-sgn",
  storageBucket: "ar-sgn.firebasestorage.app",
  messagingSenderId: "996638215104",
  appId: "1:996638215104:web:b5bd060f84fce504419625",
  measurementId: "G-BYT8LPD4MP"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence);

googleProvider.setCustomParameters({
  prompt: "select_account"
});