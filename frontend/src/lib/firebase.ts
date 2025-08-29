import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC9Exo2dfYYph7J9cLV7R4_hfrsvaCrOdE",
    authDomain: "lifesnaps-6a0bf.firebaseapp.com",
    projectId: "lifesnaps-6a0bf",
    storageBucket: "lifesnaps-6a0bf.firebasestorage.app",
    messagingSenderId: "320867038921",
    appId: "1:320867038921:web:f2703edd2f3dfaf5d6ff18",
    measurementId: "G-DNDTFW67D9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);