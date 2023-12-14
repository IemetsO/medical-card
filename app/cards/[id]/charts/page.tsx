"use client"
import { differenceInMonths, parseISO } from "date-fns"
import { useParams, useRouter } from "next/navigation"

import { Chart } from "@/components/chart"
import { Button } from "@/components/uikit/button"
import { useCard } from "@/domains/card/hooks"
import { useCardRecords } from "@/domains/card/record/hooks"
import { useStaticCSV } from "@/hooks/csv"
import { type HeightForAgeCSVData, type WeightForAgeCSVData } from "@/types/csv"

import { WeightForHeightMinus2, WeightForHeightPlus2 } from "./constant"

export default function ChartsPage() {
  const { id: idParam } = useParams()
  const cardId = idParam as string

  const { card } = useCard(cardId)
  const { records } = useCardRecords(cardId)
  const weightForAgeData = useStaticCSV<WeightForAgeCSVData>(
    "/csv/zscore/zwtageinf.csv",
    {
      header: true,
      transform: (value) => Number(value),
    },
  )

  const heightForAgeData = useStaticCSV<HeightForAgeCSVData>(
    "/csv/zscore/zlenageinf.csv",
    {
      header: true,
      transform: (value) => Number(value),
    },
  )

  const router = useRouter()

  if (!card) {
    return
  }

  if (!weightForAgeData || !heightForAgeData) {
    return
  }

  const weightForAgeDataPlus2 = weightForAgeData.map((data) => {
    return {
      date: data.Agemos,
      weight: data[2],
    }
  })

  const weightForAgeDataMinus2 = weightForAgeData.map((data) => {
    return {
      date: data.Agemos,
      weight: data[-2],
    }
  })

  const heightForAgeDataPlus2 = heightForAgeData.map((data) => {
    return {
      date: data.Agemos,
      height: data[2],
    }
  })

  const heightForAgeDataMinus2 = heightForAgeData.map((data) => {
    return {
      date: data.Agemos,
      height: data[-2],
    }
  })

  const recordsWithMonths = records.map((record) => {
    const dateOfBirth = parseISO(card.dateOfBirth)
    const dateOfMeasurement = new Date(record.date)
    const months = differenceInMonths(dateOfMeasurement, dateOfBirth)

    return {
      ...record,
      date: months,
    }
  })

  const heightForAgeDataForChart = {
    datas: [recordsWithMonths, heightForAgeDataPlus2, heightForAgeDataMinus2],
    xKey: "height",
    yKey: "date",
  }

  const weightForAgeDataForChart = {
    datas: [recordsWithMonths, weightForAgeDataPlus2, weightForAgeDataMinus2],
    xKey: "weight",
    yKey: "date",
  }

  const weightForHeight = {
    datas: [recordsWithMonths, WeightForHeightMinus2, WeightForHeightPlus2],
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
      <Chart {...heightForAgeDataForChart} />
      <h2 className="font-bold text-sky-500">
        Графік вага (кг) до віку (м) дитини {card.name}
      </h2>
      <Chart {...weightForAgeDataForChart} />
      <h2 className="font-bold text-sky-500">
        Графік вага (кг) до зросту (см) дитини {card.name}
      </h2>
      <Chart {...weightForHeight} />
    </div>
  )
}
