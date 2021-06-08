import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

console.log(process.env.FIREBASE_API_KEY);
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    appID: process.env.FIREBASE_APP_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
} else {
  firebase.app();
}

export default firebase;
