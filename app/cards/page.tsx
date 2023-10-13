"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Card } from "../../domains/cards/types"
import { Button } from "@/components/uikit/button"
import { deleteCard, getCards } from "@/domains/cards/services"
import toast from "react-hot-toast"

export default function Cards(card: Card) {
  const [cards, setCards] = useState([])

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
          <table className="border border-slate-400 min-w-full mt-5">
            <thead>
              <tr>
                <th className="border border-slate-400">ім'я</th>
                <th className="border border-slate-400">дата народження</th>
                <th className="border border-slate-400">стать</th>
                <th className="border border-slate-400"></th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card: Card) => (
                <tr key={card?.id}>
                  <td className="border border-slate-400">
                    <Link
                      href={`cards/${card.id}`}
                      className="text-sky-500 font-bold"
                    >
                      {card?.name}
                    </Link>
                  </td>
                  <td className="border border-slate-400">
                    {card?.dateOfBirth}
                  </td>
                  <td className="border border-slate-400"> {card?.gender}</td>
                  <td className="border border-slate-400">
                    <button
                      type="button"
                      className="place-items-end min-w-max h-50 rounded-md text-sky-500 rounded-md border-grey"
                      onClick={() => handleDelete(card.id)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
