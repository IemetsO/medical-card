import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore/lite"

import { getCardCollection } from "../services"
import { getCurrentUserIdOrThrow } from "@/domains/auth/services"

import { type CreateCardRecordData, type UpdateCardRecordData } from "./types"
import { type CardRecord } from "./types"

const getCardRecordCollection = (currentUserId: string, cardId: string) =>
  collection(getCardCollection(currentUserId), cardId, "records")

export async function createCardRecord(
  cardId: string,
  data: CreateCardRecordData,
): Promise<CardRecord> {
  const currentUserId = getCurrentUserIdOrThrow()

  const collection = getCardRecordCollection(currentUserId, cardId)
  const docRef = await addDoc(collection, data)

  return getCardRecordById(cardId, docRef.id)
}

export async function getCardRecords(cardId: string): Promise<CardRecord[]> {
  const currentUserId = getCurrentUserIdOrThrow()

  const collection = getCardRecordCollection(currentUserId, cardId)
  const snapshot = await getDocs(collection)

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as CardRecord,
  )
}

export async function getCardRecordById(
  cardId: string,
  cardRecordId: string,
): Promise<CardRecord> {
  const currentUserId = getCurrentUserIdOrThrow()

  const collection = getCardRecordCollection(currentUserId, cardId)
  const snapshot = await getDoc(doc(collection, cardRecordId))

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as CardRecord
}

export async function updateCardRecord(
  cardId: string,
  cardRecordId: string,
  data: UpdateCardRecordData,
): Promise<CardRecord> {
  const currentUserId = getCurrentUserIdOrThrow()

  const collection = getCardRecordCollection(currentUserId, cardId)

  await updateDoc(doc(collection, cardRecordId), data)

  return getCardRecordById(cardId, cardRecordId)
}

export async function deleteCardRecord(
  cardId: string,
  cardRecordId: string,
): Promise<void> {
  const currentUserId = getCurrentUserIdOrThrow()

  const collection = getCardRecordCollection(currentUserId, cardId)

  await deleteDoc(doc(collection, cardRecordId))
}
