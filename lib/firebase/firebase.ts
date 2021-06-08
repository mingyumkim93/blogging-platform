import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const fibaseConfig =
  process.env.NODE_ENV === "production"
    ? {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        appID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
      }
    : {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        appID: process.env.FIREBASE_APP_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET
      };
if (!firebase.apps.length) {
  firebase.initializeApp(fibaseConfig);
} else {
  firebase.app();
}

export default firebase;
