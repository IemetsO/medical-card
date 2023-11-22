import { collection, doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firestore } from "@/services/firebase";
import {auth} from "@/services/firebase"
import { CreateUserData, User } from './types';



const userCollection = collection(firestore, "users")


export async function signUp(data: CreateUserData) {
	const { password, ...dataWithoutPassword } = data

	const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
	// here we should create user in database

	const userDoc = doc(userCollection, userCredential.user.uid)
	
	const savedUser = await setDoc(userDoc, dataWithoutPassword)
	
	return savedUser
}


export async function login(email: string, password: string) {
  try {
    const authUser = await signInWithEmailAndPassword(auth, email, password)
    const user = await getUser(authUser.user.uid)

    return user
  } catch (error) {
    return null
  }
}


export async function getUser(uid: string) {
  const userDocRef = doc(userCollection, uid)
  const userSnapshot = await getDoc(userDocRef)

  return {
    id: userSnapshot.id,
    ...userSnapshot.data(),
  } as User
}