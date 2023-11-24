import { Table } from "@/components/table"
import { Button } from "@/components/uikit/button"
import { calculateBMI } from "@/domains/card/record/helpers"
import { deleteCardRecord } from "@/domains/card/record/service"
import { type CardRecord } from "@/domains/card/record/types"

type Props = {
  id: string
  records: CardRecord[]
}

export const IndicatorsTable = ({ id, records }: Props) => {
  return (
    <div className="text-xs">
      <Table className=" mt-5 min-w-full">
        <thead>
          <tr>
            <th>Вік (місяці)</th>
            <th>Вага (кг)</th>
            <th>Зріст (см)</th>
            <th>ІМТ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((item) => (
            <tr key={item.age}>
              <td>{item.age} міс</td>
              <td>{item.weight} кг</td>
              <td>{item.height} см</td>
              <td>{calculateBMI(item.weight, item.height)}кг/м2</td>
              <td>
                <Button
                  onClick={() => {
                    deleteCardRecord(id, item.id)
                  }}
                >
                  🗑
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
