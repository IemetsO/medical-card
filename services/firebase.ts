import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

import { env } from '../env.mjs';



const firebaseConfig = {
  apiKey: env.client.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.client.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.client.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.client.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.client.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.client.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: env.client.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const  firestore = getFirestore(app)


// const firebaseConfig = {
//   apiKey: "AIzaSyD4STA5fRhtGEzmDyq7b7GooJAEyI036Hc",
//   authDomain: "medical-card-96b09.firebaseapp.com",
//   projectId: "medical-card-96b09",
//   storageBucket: "medical-card-96b09.appspot.com",
//   messagingSenderId: "908186369662",
//   appId: "1:908186369662:web:fa779d1fed39f68016222f",
//   measurementId: "G-0SKKE7EXG5",
// }
