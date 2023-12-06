import { onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"

import { useAuth } from "@/contexts/auth/hooks"

import {
  documentSnapshotToCardRecord,
  getCardRecordsCollection,
} from "./service"
import { type CardRecord } from "./types"

export function useCardRecords(cardId: string): { records: CardRecord[] } {
  const { user } = useAuth()

  const [cardRecords, setCardRecords] = useState<CardRecord[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      getCardRecordsCollection(cardId),
      (snapshot) => {
        const newCardRecords = snapshot.docs.map(documentSnapshotToCardRecord)

        setCardRecords(newCardRecords)
      },
    )

    return unsubscribe
  }, [cardId, user])

  return { records: cardRecords }
}
