import { collection, doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firestore } from "@/services/firebase";
import {auth} from "@/services/firebase"
import { CreateUserData } from './types';



const userCollection = collection(firestore, "users")


export async function signUp(data: CreateUserData) {
	const { password, ...dataWithoutPassword } = data

	const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
	// here we should create user in database

	const userDoc = doc(userCollection, userCredential.user.uid)
	
	const savedUser = await setDoc(userDoc, dataWithoutPassword)
	
	return savedUser
}


export function login (email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    return user
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  })};


export async function getUser (uid){
    const userDocRef = doc(userCollection, uid)
    const userDoc = await getDoc(userDocRef);
   return userDoc
   
}