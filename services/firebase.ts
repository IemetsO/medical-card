import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD4STA5fRhtGEzmDyq7b7GooJAEyI036Hc",
  authDomain: "medical-card-96b09.firebaseapp.com",
  projectId: "medical-card-96b09",
  storageBucket: "medical-card-96b09.appspot.com",
  messagingSenderId: "908186369662",
  appId: "1:908186369662:web:fa779d1fed39f68016222f",
  measurementId: "G-0SKKE7EXG5",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const firestore = getFirestore(app)
