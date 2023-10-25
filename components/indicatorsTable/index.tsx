import { Button } from "@/components/uikit/button"
import { calculateBMI, deleteRecordFromCard } from "@/domains/cards/services"
import { Card } from "@/domains/cards/types"
type Props = {
  id: String
  card: Card
}

export const IndicatorsTable = ({ id, card }: Props) => {
  return (
    <div>
      <table className="border border-slate-400 min-w-full mt-5">
        <thead>
          <tr>
            <th className="border border-slate-400">Вік (місяці)</th>
            <th className="border border-slate-400">Вага (кг)</th>
            <th className="border border-slate-400">Зріст (см)</th>
            <th className="border border-slate-400"> ІМТ</th>
            <th className="border border-slate-400"></th>
          </tr>
        </thead>
        <tbody>
          {card.records.map((item) => (
            <tr key={item.age}>
              <td className="border border-slate-400">{item.age} міс</td>
              <td className="border border-slate-400">{item.weight} кг</td>
              <td className="border border-slate-400">{item.height} см</td>
              <td className="border border-slate-400">
                {calculateBMI(item.weight, item.height)}кг/м2
              </td>
              <td className="border border-slate-400">
                <Button
                  className="px-1 py-0"
                  onClick={() => {
                    if (typeof id === "string") {
                      deleteRecordFromCard(id, item.age)
                    }
                  }}
                >
                  🗑
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
