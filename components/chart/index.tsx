import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

export const Chart = ({ data }) => {
  return (
    <LineChart
      width={400}
      height={200}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="weight" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="age" />
      <YAxis />
      <Tooltip />
    </LineChart>
  )
}
