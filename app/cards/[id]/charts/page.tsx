"use client"
import { useParams, useRouter } from "next/navigation"

import { Chart } from "@/components/chart"
import { Button } from "@/components/uikit/button"
import { useCard } from "@/domains/card/hooks"
import { useCardRecords } from "@/domains/card/record/hooks"
import { type CardRecord } from "@/domains/card/record/types"

import {
  HeightAndWeightForAgeMinus2,
  HeightAndWeightForAgePlus3,
  WeightForHeightMinus2,
  WeightForHeightPlus2,
} from "./constant"

export default function ChartsPage() {
  const { id: idParam } = useParams()
  const cardId = idParam as string

  const { card } = useCard(cardId)
  const { records } = useCardRecords(cardId)

  const router = useRouter()

  if (!card) {
    return
  }

  const chartData: CardRecord[] = records

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
    router.back()
  }

  return (
    <div className="m-auto w-full max-w-6xl text-center">
      <div className="flex flex-row items-baseline gap-2">
        <Button className="mt-2 px-3" onClick={goBack}>
          ←
        </Button>
        <p className="text-xs ">назад до карточки</p>
      </div>
      <h2 className="font-bold text-sky-500">
        Графік зріст/довжина тіла (см) до віку (м) дитини {card.name}
      </h2>
      <Chart {...heightForAgeData} />
      <h2 className="font-bold text-sky-500">
        Графік вага (кг) до віку (м) дитини {card.name}
      </h2>
      <Chart {...weightForAgeData} />
      <h2 className="font-bold text-sky-500">
        Графік вага (кг) до зросту (см) дитини {card.name}
      </h2>
      <Chart {...weightForHeight} />
    </div>
  )
}
