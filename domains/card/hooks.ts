import {useAuth} from "@/contexts/auth/hooks"
import { useState, useEffect } from "react"
import {Card} from "@/domains/card/types"
import { getCardById, getCards } from "./services"


export function useCards(): Card[] {
    const { user } = useAuth()
  console.log(user)
    const [cards, setCards] = useState<Card[]>([])
  
    useEffect(() => {
      async function loadCards() {
        if (!user) {
          return
        }
        const cards = await getCards(user.uid)
        setCards(cards)
      }
  
      loadCards()
    }, [user])
  
    return cards
  }
  
  export function useCard(cardId: string): Card | undefined {
    const { user } = useAuth()
  
    const [card, setCard] = useState<Card>()
  
    useEffect(() => {
      async function loadCard() {
        if (!user) {
          return
        }
        const card = await getCardById(user.uid, cardId)
        setCard(card)
      }
  
      loadCard()
    }, [cardId, user])
  
    return card
  }