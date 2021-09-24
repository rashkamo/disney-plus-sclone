// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnOm4FdLFrb_o8Ldrm-SVfpXdHDtx7648",
  authDomain: "disney-clone-28ea7.firebaseapp.com",
  projectId: "disney-clone-28ea7",
  storageBucket: "disney-clone-28ea7.appspot.com",
  messagingSenderId: "76923659755",
  appId: "1:76923659755:web:26a1218356dcf25146e5ae",
  measurementId: "G-JR2HG0KJ4J",
};
console.log("hello woeld");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
