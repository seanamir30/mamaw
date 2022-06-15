import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getStorage } from 'firebase/storage';
import { getApp } from "firebase/app";


const firebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: 'gs://mamaw-party.appspot.com/'
}

//If an firebase app hasn't already been created
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseCredentials)
}

const firebaseApp = getApp()
export const storage = getStorage(firebaseApp, 'gs://mamaw-party.appspot.com/')
export default firebase;