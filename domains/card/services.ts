import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite"
import { CreateCardData, UpdateCardData } from "./types"
import { Card } from "@/domains/card/types"
import { firestore } from "@/services/firebase"

const userCollection = collection(firestore, "users")

export const getCardCollection = (userId: string) =>
  collection(userCollection, userId, "cards")

export async function createCard(
  userId: string,
  data: CreateCardData,
): Promise<Card> {
  const collection = getCardCollection(userId)
  const docRef = await addDoc(collection, data)
  return getCardById(userId, docRef.id)
}

export async function getCards(userId: string): Promise<Card[]> {
  const collection = getCardCollection(userId)
  const snapshot = await getDocs(collection)
  console.log("GGG")
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Card,
  )
}

export async function getCardById(
  userId: string,
  cardId: string,
): Promise<Card> {
  const collection = getCardCollection(userId)
  const snapshot = await getDoc(doc(collection, cardId))

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Card
}

export async function updateCard(
  userId: string,
  cardId: string,
  data: UpdateCardData,
): Promise<Card> {
  const collection = getCardCollection(userId)

  await updateDoc(doc(collection, cardId), data)

  return getCardById(userId, cardId)
}

export async function deleteCard(
  userId: string,
  cardId: string,
): Promise<void> {
  const collection = getCardCollection(userId)

  await deleteDoc(doc(collection, cardId))
}
