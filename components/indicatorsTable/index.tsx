import { Button } from "@/components/uikit/button"
import { calculateBMI, deleteRecordFromCard } from "@/domains/cards/services"
import { Card } from "@/domains/cards/types"
import { Table } from "@/components/table"

type Props = {
  id: string
  card: Card
}

export const IndicatorsTable = ({ id, card }: Props) => {
  return (
    <div className="text-xs">
      <Table className=" min-w-full mt-5">
        <thead>
          <tr>
            <th>Вік (місяці)</th>
            <th>Вага (кг)</th>
            <th>Зріст (см)</th>
            <th> ІМТ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {card.records.map((item) => (
            <tr key={item.age}>
              <td>{item.age} міс</td>
              <td>{item.weight} кг</td>
              <td>{item.height} см</td>
              <td>{calculateBMI(item.weight, item.height)}кг/м2</td>
              <td>
                <Button
                  onClick={() => {
                    deleteRecordFromCard(id, item.age)
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
