import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore/lite"

import { getCurrentUserIdOrThrow } from "../auth/services"
import { type Card } from "@/domains/card/types"
import { firestore } from "@/services/firebase"

import { type CreateCardData, type UpdateCardData } from "./types"

const userCollection = collection(firestore, "users")

export const getCardCollection = (userId: string) =>
  collection(userCollection, userId, "cards")

export async function createCard(data: CreateCardData): Promise<Card> {
  const currentUserId = getCurrentUserIdOrThrow()

  const collection = getCardCollection(currentUserId)
  const docRef = await addDoc(collection, data)
  return getCardById(docRef.id)
}

export async function getCards(): Promise<Card[]> {
  const currentUserId = getCurrentUserIdOrThrow()

  const collection = getCardCollection(currentUserId)
  const snapshot = await getDocs(collection)
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Card,
  )
}

export async function getCardById(cardId: string): Promise<Card> {
  const currentUserId = getCurrentUserIdOrThrow()

  const collection = getCardCollection(currentUserId)
  const snapshot = await getDoc(doc(collection, cardId))

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Card
}

export async function updateCard(
  cardId: string,
  data: UpdateCardData,
): Promise<Card> {
  const currentUserId = getCurrentUserIdOrThrow()

  const collection = getCardCollection(currentUserId)

  await updateDoc(doc(collection, cardId), data)

  return getCardById(cardId)
}

export async function deleteCard(cardId: string): Promise<void> {
  const currentUserId = getCurrentUserIdOrThrow()

  const collection = getCardCollection(currentUserId)

  await deleteDoc(doc(collection, cardId))
}
