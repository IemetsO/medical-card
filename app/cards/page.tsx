"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Card } from "../../domains/cards/types"
import { Button } from "@/components/uikit/button"
import { CardsTable } from "@/components/cardsTable"
import { getCards } from "@/domains/cards/services"
import toast from "react-hot-toast"
import { useCards } from "@/domains/card/hooks"
import { deleteCard } from "@/domains/cards/services"
import { useAuth } from "@/contexts/auth/hooks"

export default function Cards() {
  const cards = useCards()

  function handleDelete(id: string) {
    deleteCard(id)
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
