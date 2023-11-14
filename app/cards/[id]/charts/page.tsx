"use client"
import Link from "next/link"
import { Chart } from "@/components/chart"
import { useParams } from "next/navigation"
import { getCardById } from "@/domains/cards/services"
import { CardRecord } from "@/domains/cards/types"
import {
  HeightAndWeightForAgePlus3,
  HeightAndWeightForAgeMinus2,
  WeightForHeightMinus2,
  WeightForHeightPlus2,
} from "./constant"
import { Button } from "@/components/uikit/button"
import { useRouter } from "next/router"

export default function ChartsPage() {
  const { id: idParam } = useParams()
  const id = idParam as string
  const card = getCardById(id)
  if (!card) {
    return
  }
  const chartData: CardRecord[] = card.records

  const heightForAgeData = {
    datas: [chartData, HeightAndWeightForAgePlus3, HeightAndWeightForAgeMinus2],
    xKey: "height",
    yKey: "age",
  }

  const weightForAgeData = {
    datas: [chartData, HeightAndWeightForAgePlus3, HeightAndWeightForAgeMinus2],
    xKey: "weight",
    yKey: "age",
  }

  const weightForHeight = {
    datas: [chartData, WeightForHeightMinus2, WeightForHeightPlus2],
    xKey: "weight",
    yKey: "height",
  }
  function goBack() {
    window.history.back()
  }
  return (
    <div className="max-w-md m-auto text-center ">
      <div className="flex flex-row items-baseline gap-2">
        <Button className="mt-2 px-3" onClick={goBack}>
          ←
        </Button>
        <p className="text-xs ">назад до карточки</p>
      </div>
      <h2 className="text-sky-500 font-bold">
        Графік зріст/довжина тіла (см) до віку (м) дитини {card.name}
      </h2>
      <Chart {...heightForAgeData} />
      <h2 className="text-sky-500 font-bold">
        Графік вага (кг) до віку (м) дитини {card.name}
      </h2>
      <Chart {...weightForAgeData} />
      <h2 className="text-sky-500 font-bold">
        Графік вага (кг) до зросту (см) дитини {card.name}
      </h2>
      <Chart {...weightForHeight} />
    </div>
  )
}
