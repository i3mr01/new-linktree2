import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional, for Analytics
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

if (typeof window !== "undefined") {
  // Only initialize on client-side
  // Validate all required fields are present
  const requiredFields = [
    firebaseConfig.apiKey,
    firebaseConfig.authDomain,
    firebaseConfig.projectId,
    firebaseConfig.storageBucket,
    firebaseConfig.messagingSenderId,
    firebaseConfig.appId,
  ];

  const missingFields = requiredFields
    .map((field, index) => (!field ? Object.keys(firebaseConfig)[index] : null))
    .filter(Boolean);

  if (missingFields.length > 0) {
    console.error(
      `Firebase configuration is incomplete. Missing: ${missingFields.join(", ")}. ` +
      "Please set all NEXT_PUBLIC_FIREBASE_* environment variables in Vercel."
    );
  } else {
    try {
      app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      auth = getAuth(app);
    } catch (error) {
      console.error("Firebase client initialization error:", error);
    }
  }
}

export { app, auth };

