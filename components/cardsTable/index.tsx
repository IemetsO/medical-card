import Link from "next/link"
import { Card } from "../../domains/cards/types"

export const CardsTable = ({ cards, handleDelete }) => {
  return (
    <table className="border border-slate-400 min-w-full mt-5">
      <thead>
        <tr>
          <th className="border border-slate-400">ім`я</th>
          <th className="border border-slate-400">дата народження</th>
          <th className="border border-slate-400">стать</th>
          <th className="border border-slate-400"></th>
        </tr>
      </thead>
      <tbody>
        {cards.map((card: Card) => (
          <tr key={card?.id}>
            <td className="border border-slate-400">
              <Link
                href={`cards/${card.id}`}
                className="text-sky-500 font-bold"
              >
                {card?.name}
              </Link>
            </td>
            <td className="border border-slate-400">{card?.dateOfBirth}</td>
            <td className="border border-slate-400"> {card?.gender}</td>
            <td className="border border-slate-400">
              <button
                type="button"
                className="place-items-end min-w-max h-50 rounded-md text-sky-500 rounded-md border-grey"
                onClick={() => handleDelete(card.id)}
              >
                x
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
