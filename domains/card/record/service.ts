import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore"

import { getCardsCollection } from "../services"

import { documentSnapshotToCardRecord } from "./helpers"
import { type CreateCardRecordData, type UpdateCardRecordData } from "./types"
import { type CardRecord } from "./types"

export function getCardRecordsCollection(cardId: string) {
  return collection(getCardsCollection(), cardId, "records")
}

export function getCardRecordDocument(cardId: string, cardRecordId: string) {
  return doc(getCardRecordsCollection(cardId), cardRecordId)
}

export async function createCardRecord(
  cardId: string,
  data: CreateCardRecordData,
): Promise<CardRecord> {
  const collection = getCardRecordsCollection(cardId)
  const docRef = await addDoc(collection, data)

  return getCardRecordById(cardId, docRef.id)
}

export async function getCardRecords(cardId: string): Promise<CardRecord[]> {
  const collection = getCardRecordsCollection(cardId)
  const snapshot = await getDocs(collection)

  return snapshot.docs.map(documentSnapshotToCardRecord)
}

export async function getCardRecordById(
  cardId: string,
  cardRecordId: string,
): Promise<CardRecord> {
  const snapshot = await getDoc(getCardRecordDocument(cardId, cardRecordId))

  return documentSnapshotToCardRecord(snapshot)
}

export async function updateCardRecord(
  cardId: string,
  cardRecordId: string,
  data: UpdateCardRecordData,
): Promise<CardRecord> {
  await updateDoc(getCardRecordDocument(cardId, cardRecordId), data)

  return getCardRecordById(cardId, cardRecordId)
}

export async function deleteCardRecord(
  cardId: string,
  cardRecordId: string,
): Promise<void> {
  return deleteDoc(getCardRecordDocument(cardId, cardRecordId))
}
