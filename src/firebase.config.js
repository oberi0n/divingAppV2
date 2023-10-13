import { getAuth  } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbKahCGhQNRoiBn2iYebNEKJ7Gw92txds",
  authDomain: "shoshone-9d593.firebaseapp.com",
  projectId: "shoshone-9d593",
  storageBucket: "shoshone-9d593.appspot.com",
  messagingSenderId: "567679969152",
  appId: "1:567679969152:web:ace2f269f5956ed1744365"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
