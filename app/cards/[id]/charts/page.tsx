"use client"
import { Chart } from "@/components/chart"
import { useParams } from "next/navigation"
import { getCardById } from "@/domains/cards/services"
import { CardRecord } from "@/domains/cards/types"
import { DEFAULT_HEIGHTforAGE } from "./constant"

export default function ChartItem() {
  const { id: idParam } = useParams()
  const id = idParam as string
  const card = getCardById(id)
  if (!card) {
    return
  }
  const data: CardRecord[] = card.records

  return (
    <div className="max-w-md m-auto text-center ">
      <h2 className="text-sky-500 font-bold">
        Графік зріст/довжина тіла (см) до віку (м) дитини {card.name}
      </h2>
      <Chart
        data={data}
        dataKey1="height"
        dataKey2="age"
        defaultData={DEFAULT_HEIGHTforAGE}
        defaultDataKey1="height_upper"
        defaultDataKey2="height_lower"
      ></Chart>
      <h2 className="text-sky-500 font-bold">
        Графік вага (кг) до віку (м) дитини {card.name}
      </h2>
      <Chart
        data={data}
        dataKey1="weight"
        dataKey2="age"
        defaultData={DEFAULT_HEIGHTforAGE}
        defaultDataKey1="height_upper"
        defaultDataKey2="height_lower"
      ></Chart>
      <h2 className="text-sky-500 font-bold">
        Графік вага (кг) до зросту (см) дитини {card.name}
      </h2>
      <Chart
        data={data}
        dataKey1="weight"
        dataKey2="height"
        defaultData={DEFAULT_HEIGHTforAGE}
        defaultDataKey1="height_upper"
        defaultDataKey2="height_lower"
      ></Chart>
    </div>
  )
}
