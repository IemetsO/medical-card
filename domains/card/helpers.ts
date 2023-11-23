import { type DocumentSnapshot } from "firebase/firestore"

import { type Card } from "./types"

export function calculateAge(dateOfBirth: string) {
  const today = new Date()
  const years = today.getFullYear() - new Date(dateOfBirth).getFullYear()

  const months = today.getMonth() - new Date(dateOfBirth).getMonth()

  const days = Math.round(
    (today.getTime() - new Date(dateOfBirth).getTime()) / 86400000,
  )

  if (years === 0 && months === 0) {
    return `вік ${days} днів`
  } else {
    return `вік ${years} років ${months} місяців`
  }
}

export function documentSnapshotToCard(snapshot: DocumentSnapshot) {
  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Card
}
