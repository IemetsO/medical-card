import { useEffect, useState } from "react"

import { useAuth } from "@/contexts/auth/hooks"

import { getCardRecords } from "./service"
import { type CardRecord } from "./types"

export function useCardRecords(cardId: string): { records: CardRecord[] } {
  const { user } = useAuth()

  const [cardRecords, setCardRecords] = useState<CardRecord[]>([])

  useEffect(() => {
    async function loadCardRecords() {
      if (!user) {
        return
      }
      const cardRecords = await getCardRecords(cardId)
      setCardRecords(cardRecords)
    }

    loadCardRecords()
  }, [cardId, user])

  return { records: cardRecords }
}
