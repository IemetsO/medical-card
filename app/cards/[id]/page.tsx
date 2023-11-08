"use client"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/uikit/button"
import { Form } from "@/components/form"
import { IndicatorsTable } from "@/components/indicatorsTable"
import { getCardById, deleteCard, calculateAge } from "@/domains/cards/services"
import toast from "react-hot-toast"
import { useEffect } from "react"

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
    <div className="max-w-md m-auto bg-gray-50 p-8 rounded-md border-slate-400 text-center ">
      <div className="flex flex-row place-content-between items-baseline">
        <div className="flex flex-row items-baseline gap-2">
          <Link href="/cards">
            <Button className="mt-2 px-3">←</Button>
          </Link>
          <p className="text-xs ">назад до карток</p>
        </div>
        <div className="flex flex-row items-baseline">
          <p className="text-xs mr-2">видалити картку</p>
          <Button onClick={handleDelete}>🗑</Button>
        </div>
      </div>

      <section>
        <h2 className="text-sky-500 font-bold">{card?.name}</h2>
        <h2>{calculateAge(card.dateOfBirth)}</h2>
        <h2>{card?.gender}</h2>
      </section>
      <h2 className="mt-10 text-grey ">
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
