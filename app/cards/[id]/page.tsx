"use client"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

import { Form } from "@/components/form"
import { IndicatorsTable } from "@/components/indicatorsTable"
import { Button } from "@/components/uikit/button"
import { calculateAge } from "@/domains/card/helpers"
import { useCard } from "@/domains/card/hooks"
import { useCardRecords } from "@/domains/card/record/hooks"
import { deleteCard } from "@/domains/card/services"

export default function CardItem() {
  const { id: idParam } = useParams()
  const router = useRouter()
  const cardId = idParam as string

  const { card, isLoading: isCardLoading } = useCard(cardId)
  const { records } = useCardRecords(cardId)

  useEffect(() => {
    if (!card && !isCardLoading) {
      toast.error("Карточка не знайдена")

      router.replace("/cards")
    }
  }, [card, isCardLoading, router])

  async function handleDelete() {
    await deleteCard(cardId)
    toast.success("Карточку видалено!")
    router.push("/cards")
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
      <Form id={cardId} records={records} />

      {records.length > 0 && (
        <div>
          <IndicatorsTable id={cardId} records={records} />
          <Link href={`/cards/${cardId}/charts`} className="mb-6 mt-5">
            <Button>Побудувати графік</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
