import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc, getDocs  } from "firebase/firestore/lite"
import { getCardCollection } from "../services"
import { CreateCardRecordData, UpdateCardRecordData } from "./types"
import { CardRecord } from "./types"

export const getCardRecordCollection = (userId: string, cardId: string) =>
  collection(getCardCollection(userId), cardId, "records")

export async function createCardRecord(
  userId: string,
  cardId: string,
  data: CreateCardRecordData,
): Promise<CardRecord> {
  const collection = getCardRecordCollection(userId, cardId)
  const docRef = await addDoc(collection, data)

  return getCardRecordById(userId, cardId, docRef.id)
}

export async function getCardRecords(
  userId: string,
  cardId: string,
): Promise<CardRecord[]> {
  const collection = getCardRecordCollection(userId, cardId)
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
  userId: string,
  cardId: string,
  cardRecordId: string,
): Promise<CardRecord> {
  const collection = getCardRecordCollection(userId, cardId)
  const snapshot = await getDoc(doc(collection, cardRecordId))

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as CardRecord
}

export async function updateCardRecord(
  userId: string,
  cardId: string,
  cardRecordId: string,
  data: UpdateCardRecordData,
): Promise<CardRecord> {
  const collection = getCardRecordCollection(userId, cardId)

  await updateDoc(doc(collection, cardRecordId), data)

  return getCardRecordById(userId, cardId, cardRecordId)
}

export async function deleteCardRecord(
  userId: string,
  cardId: string,
  cardRecordId: string,
): Promise<void> {
  const collection = getCardRecordCollection(userId, cardId)

  await deleteDoc(doc(collection, cardRecordId))
}