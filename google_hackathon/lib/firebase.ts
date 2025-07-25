// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjUa8RvsTkyBoCyjYdDLsXdnO38IMlfUw",
  authDomain: "drishti2-5022b.firebaseapp.com",
  databaseURL: "https://drishti2-5022b-default-rtdb.firebaseio.com",
  projectId: "drishti2-5022b",
  storageBucket: "drishti2-5022b.firebasestorage.app",
  messagingSenderId: "434868659248",
  appId: "1:434868659248:web:be69fa19f8e4a96aad79f5",
  measurementId: "G-N8FB6HV8PZ"
};

const app = initializeApp(firebaseConfig);

let analytics = null;

if (typeof window !== "undefined") {
  // Analytics is only initialized on client-side
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app as firebaseApp, analytics };
