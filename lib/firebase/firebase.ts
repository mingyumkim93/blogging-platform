import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    appID: process.env.APP_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
} else {
  firebase.app();
}

export default firebase;
