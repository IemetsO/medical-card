import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  type DocumentSnapshot,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore"

import { getCurrentUserIdOrThrow, getUserCollection } from "../auth/services"
import { type Card } from "@/domains/card/types"

import { type CreateCardData, type UpdateCardData } from "./types"

export function getCardsCollection() {
  const userId = getCurrentUserIdOrThrow()
  return collection(getUserCollection(), userId, "cards")
}

export function getCardDocument(cardId: string) {
  return doc(getCardsCollection(), cardId)
}

export function documentSnapshotToCard(snapshot: DocumentSnapshot) {
  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Card
}

export async function createCard(data: CreateCardData): Promise<Card> {
  const collection = getCardsCollection()
  const docRef = await addDoc(collection, data)
  return getCardById(docRef.id)
}

export async function getCards(): Promise<Card[]> {
  const collection = getCardsCollection()
  const snapshot = await getDocs(collection)
  return snapshot.docs.map(documentSnapshotToCard)
}

export async function getCardById(cardId: string): Promise<Card> {
  const snapshot = await getDoc(getCardDocument(cardId))

  return documentSnapshotToCard(snapshot)
}

export async function updateCard(
  cardId: string,
  data: UpdateCardData,
): Promise<Card> {
  await updateDoc(getCardDocument(cardId), data)

  return getCardById(cardId)
}

export async function deleteCard(cardId: string): Promise<void> {
  return deleteDoc(getCardDocument(cardId))
}
