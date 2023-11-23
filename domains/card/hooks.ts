import { onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"

import { useAuth } from "@/contexts/auth/hooks"
import { type Card } from "@/domains/card/types"

import {
  documentSnapshotToCard,
  getCardDocument,
  getCardsCollection,
} from "./services"

export function useCards(): { cards: Card[] } {
  const { user } = useAuth()

  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(getCardsCollection(), (snapshot) => {
      const cards = snapshot.docs.map(documentSnapshotToCard)
      setCards(cards)
    })

    return unsubscribe
  }, [user])

  return { cards }
}

export function useCard(cardId: string): {
  card: Card | undefined
  isLoading: boolean
} {
  const { user } = useAuth()

  const [card, setCard] = useState<Card>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      getCardDocument(cardId),
      (snapshot) => {
        const card = documentSnapshotToCard(snapshot)
        setCard(card)
        setIsLoading(false)
      },
      () => {
        setIsLoading(false)
      },
    )

    return unsubscribe
  }, [cardId, user])

  return { card, isLoading }
}
