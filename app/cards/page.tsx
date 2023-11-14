"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import { CardsTable } from "@/components/cardsTable"
import { Button } from "@/components/uikit/button"
import { deleteCard, getCards } from "@/domains/cards/services"
import { type Card } from "@/domains/cards/types"

export default function Cards() {
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    const allCardsData = getCards()
    setCards(allCardsData)
  }, [])

  function handleDelete(id: string) {
    deleteCard(id)
    const allCardsData = getCards()
    setCards(allCardsData)
    toast.success("Карточку видалено!")
  }

  let sectionNode

  if (cards?.length < 1) {
    sectionNode = <section>Ви не створили жодної картки</section>
  } else {
    sectionNode = (
      <section>
        <h2 className="mt-10 font-bold">Ваші діти</h2>
        <div>
          <CardsTable cards={cards} handleDelete={handleDelete} />
        </div>
      </section>
    )
  }

  return (
    <div className="mt-10 text-center">
      {sectionNode}

      <div className="mt-6">
        <Link href="cards/create">
          <Button>Додати дитину</Button>
        </Link>
      </div>
    </div>
  )
}
