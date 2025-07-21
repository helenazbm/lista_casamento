// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAr9uFinjmynotJQh36p5QajaPfSiNR5nM",
    authDomain: "lista-casamento-3ede8.firebaseapp.com",
    projectId: "lista-casamento-3ede8",
    storageBucket: "lista-casamento-3ede8.firebasestorage.app",
    messagingSenderId: "752859409179",
    appId: "1:752859409179:web:1cd9f842eab3fd9afcc1be"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);