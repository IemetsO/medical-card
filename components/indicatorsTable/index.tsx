import { Table } from "@/components/table"
import { Button } from "@/components/uikit/button"
import { calculateBMI, deleteRecordFromCard } from "@/domains/cards/services"
import { type Card } from "@/domains/cards/types"

type Props = {
  id: string
  card: Card
}

export const IndicatorsTable = ({ id, card }: Props) => {
  return (
    <div className="text-xs">
      <Table className=" mt-5 min-w-full">
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
