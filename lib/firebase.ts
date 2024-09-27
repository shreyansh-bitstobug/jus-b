// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initialize as initializeFireorm } from "fireorm";
import { firebaseConfig } from "@/lib/utils";

// Firebase config
firebaseConfig;

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Initialize FireORM with Firestore
initializeFireorm(firestore);

export { firestore };
