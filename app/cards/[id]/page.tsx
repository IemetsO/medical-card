"use client"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

import { Form } from "@/components/form"
import { IndicatorsTable } from "@/components/indicatorsTable"
import { Button } from "@/components/uikit/button"
import { calculateAge, deleteCard, getCardById } from "@/domains/cards/services"

export default function CardItem() {
  const { id: idParam } = useParams()
  const router = useRouter()
  const id = idParam as string
  const card = getCardById(id)

  useEffect(() => {
    if (!card) {
      toast.error("Карточка не знайдена")

      router.replace("/cards")
    }
  }, [card, router])

  function handleDelete() {
    toast.success("Карточку видалено!")
    deleteCard(id)
    router.push("/cards")
  }

  function goToChart() {
    router.push(`/cards/${id}/charts`)
  }
  if (!card) {
    return null
  }

  return (
    <div className="m-auto max-w-md rounded-md border-slate-400 bg-gray-50 p-8 text-center ">
      <div className="flex flex-row place-content-between items-baseline">
        <div className="flex flex-row items-baseline gap-2">
          <Link href="/cards">
            <Button className="mt-2 px-3">←</Button>
          </Link>
          <p className="text-xs ">назад до карток</p>
        </div>
        <div className="flex flex-row items-baseline">
          <p className="mr-2 text-xs">видалити картку</p>
          <Button onClick={handleDelete}>🗑</Button>
        </div>
      </div>

      <section>
        <h2 className="font-bold text-sky-500">{card?.name}</h2>
        <h2>{calculateAge(card.dateOfBirth)}</h2>
        <h2>{card?.gender}</h2>
      </section>
      <h2 className="text-grey mt-10 ">
        Вкажіть вагу та зріст Вашої дитини по місяцям для побудови графіку
      </h2>
      <Form id={id} card={card} />
      <IndicatorsTable id={id} card={card} />
      <Button type="submit" className="mb-6 mt-5" onClick={goToChart}>
        Побудувати графік
      </Button>
    </div>
  )
}
