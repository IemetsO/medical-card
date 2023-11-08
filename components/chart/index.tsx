import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { CardRecord } from "@/domains/cards/types"

type Props<DataRecord extends Record<string, number>> = {
  datas: DataRecord[][]
  xKey: string
  yKey: string
}

function detectionOfColorOfLine(datas: { datas: [] }, data: []) {
  if (datas.datas.indexOf(data) === 0) {
    return "green"
  } else {
    return "red"
  }
}

export const Chart = (DataRecord: Props) => {
  return (
    <LineChart
      width={500}
      height={300}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      className="text-xs"
    >
      {DataRecord.data.datas.map((data: []) => (
        <Line
          key={DataRecord.data.datas.indexOf(data)}
          type="monotone"
          data={data}
          dataKey={DataRecord.data.xKey}
          stroke={detectionOfColorOfLine(DataRecord.data, data)}
        />
      ))}

      <CartesianGrid stroke="#ccc" />
      <XAxis
        type="number"
        dataKey={DataRecord.data.yKey}
        domain={["auto", "auto"]}
      />
      <YAxis />
      <Tooltip />
    </LineChart>
  )
}
