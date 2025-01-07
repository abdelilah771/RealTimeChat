// Import the required Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKIUrgDDmXg50VKLfQMi_TcZhNmmDs9_8",
  authDomain: "realtimechat-18b81.firebaseapp.com",
  projectId: "realtimechat-18b81",
  storageBucket: "realtimechat-18b81.appspot.com",
  messagingSenderId: "787803199487",
  appId: "1:787803199487:web:61dc33a9abca18b16379ca",
  measurementId: "G-T7RP9ZSK6Z",
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null; // Prevent analytics error in non-browser environments
const auth = getAuth(app);
const storage = getStorage(app);

// Export initialized services
export { app, analytics, auth, storage };
