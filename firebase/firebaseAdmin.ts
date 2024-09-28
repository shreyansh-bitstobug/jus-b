import admin from "firebase-admin";
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";

const serviceAccount = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_ACCOUNT_KEY_PATH;

// Check if Firebase Admin is already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert(serviceAccount as string), // Or use your specific credentials
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`, // Replace with your Firestore URL
  });
}

const db = admin.firestore(); // Initialize Firestore for FireORM

export { db };
