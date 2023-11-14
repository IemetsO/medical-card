import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

type Props = {
  datas: Record<string, number>[][]
  xKey: string
  yKey: string
}

export const Chart = (props: Props) => {
  const { datas, xKey, yKey } = props

  return (
    <LineChart
      width={500}
      height={300}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      className="text-xs"
    >
      {datas.map((data, index) => (
        <Line
          key={index}
          type="monotone"
          data={data}
          dataKey={xKey}
          stroke={index === 0 ? "green" : "red"}
        />
      ))}

      <CartesianGrid stroke="#ccc" />
      <XAxis type="number" dataKey={yKey} domain={["auto", "auto"]} />
      <YAxis />
      <Tooltip />
    </LineChart>
  )
}
