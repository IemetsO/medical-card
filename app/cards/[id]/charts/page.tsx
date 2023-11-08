"use client"
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

export default function ChartItem() {
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

  return (
    <div className="max-w-md m-auto text-center ">
      <h2 className="text-sky-500 font-bold">
        Графік зріст/довжина тіла (см) до віку (м) дитини {card.name}
      </h2>
      <Chart data={heightForAgeData} />
      <h2 className="text-sky-500 font-bold">
        Графік вага (кг) до віку (м) дитини {card.name}
      </h2>
      <Chart data={weightForAgeData} />
      <h2 className="text-sky-500 font-bold">
        Графік вага (кг) до зросту (см) дитини {card.name}
      </h2>
      <Chart data={weightForHeight} />
    </div>
  )
}
