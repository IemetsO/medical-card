import { type DocumentSnapshot } from "firebase/firestore"

import { type CardRecord } from "./types"

export function calculateBMI(weight: number, height: number) {
  return Math.round(weight / ((height / 100) * (height / 100)))
}

export function documentSnapshotToCardRecord(snapshot: DocumentSnapshot) {
  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as CardRecord
}
