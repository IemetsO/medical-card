import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { CardRecord } from "@/domains/cards/types"

type Props = {
  data: CardRecord[]
  dataKey1: string
  dataKey2: string
  defaultData: { age: number; height_upper: number; height_lower: number }[]
  defaultDataKey1: string
  defaultDataKey2: string
}

export const Chart = ({
  data,
  dataKey1,
  dataKey2,
  defaultData,
  defaultDataKey1,
  defaultDataKey2,
}: Props) => {
  return (
    <LineChart
      width={500}
      height={300}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      className="text-xs"
    >
      <Line type="monotone" data={data} dataKey={dataKey1} stroke="#8884d8" />
      <Line
        type="monotone"
        data={defaultData}
        dataKey={defaultDataKey1}
        stroke="red"
      />
      <Line
        type="monotone"
        data={defaultData}
        dataKey={defaultDataKey2}
        stroke="red"
      />
      <CartesianGrid stroke="#ccc" />
      <XAxis type="number" dataKey={dataKey2} domain={["auto", "auto"]} />
      <YAxis />
      <Tooltip />
    </LineChart>
  )
}
