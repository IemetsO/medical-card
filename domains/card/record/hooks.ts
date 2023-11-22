import {useAuth} from "@/contexts/auth/hooks"
import { useState, useEffect } from "react"
import { CardRecord } from "./types"
import { getCardRecords } from "./service"

export function useCardRecords(cardId: string) {
    const { user } = useAuth()
  
    const [cardRecords, setCardRecords] = useState<CardRecord[]>([])
  
    useEffect(() => {
      async function loadCardRecords() {
        if (!user) {
          return
        }
        const cardRecords = await getCardRecords(user.uid, cardId)
        setCardRecords(cardRecords)
      }
  
      loadCardRecords()
    }, [cardId, user])
  
    return cardRecords
  }