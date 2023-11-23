import { useEffect, useState } from "react"

import { useAuth } from "@/contexts/auth/hooks"
import { type Card } from "@/domains/card/types"

import { getCardById, getCards } from "./services"

export function useCards(): { cards: Card[] } {
  const { user } = useAuth()

  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    async function loadCards() {
      if (!user) {
        return
      }
      const cards = await getCards()
      setCards(cards)
    }

    loadCards()
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
    async function loadCard() {
      if (!user) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const card = await getCardById(cardId)
        setCard(card)
      } finally {
        setIsLoading(false)
      }
    }

    loadCard()
  }, [cardId, user])

  return { card, isLoading }
}
