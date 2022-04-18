import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbdpZRKedzeZ2oAFH9-_9jiOHdbQ7vHBY",
  authDomain: "handsup-88a86.firebaseapp.com",
  projectId: "handsup-88a86",
  storageBucket: "handsup-88a86.appspot.com",
  messagingSenderId: "826638463277",
  appId: "1:826638463277:web:1ba57a046967b2346c23a4",
  measurementId: "G-D1EGXDJVT1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export { auth, storage, db };
