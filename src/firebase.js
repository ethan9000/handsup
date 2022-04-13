import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

export { auth };
