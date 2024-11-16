// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1Z-zSp-f87MgyLdJIgfvcTaGn0Rf8FQ8",
  authDomain: "nuxt-reviews-app.firebaseapp.com",
  projectId: "nuxt-reviews-app",
  storageBucket: "nuxt-reviews-app.firebasestorage.app",
  messagingSenderId: "264976637340",
  appId: "1:264976637340:web:ab55801790ef231da6bc59",
  measurementId: "G-ZP9WRZQ1BS"
};
// Ensure Firebase is initialized only once
if (!firebase.apps.length) {
    initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
const analytics = getAnalytics(app);