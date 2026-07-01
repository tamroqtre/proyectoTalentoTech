import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDLfnufhAzxSfrSHHArbzLSzLjCHbpevHQ",
    authDomain: "akiba-crew-ecomerce.firebaseapp.com",
    projectId: "akiba-crew-ecomerce",
    storageBucket: "akiba-crew-ecomerce.firebasestorage.app",
    messagingSenderId: "676534068463",
    appId: "1:676534068463:web:da803fb158d5241916a71a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
