import Link from "next/link"

import { type Card } from "../../domains/cards/types"
import { Table } from "@/components/table"

type Props = {
  cards: Card[]
  handleDelete: (id: string) => void
}
export const CardsTable = ({ cards, handleDelete }: Props) => {
  return (
    <Table className=" mt-5 min-w-full">
      <thead>
        <tr>
          <th>ім&#39;я</th>
          <th>дата народження</th>
          <th>стать</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cards.map((card: Card) => (
          <tr key={card?.id}>
            <td>
              <Link
                href={`cards/${card.id}`}
                className="font-bold text-sky-500"
              >
                {card?.name}
              </Link>
            </td>
            <td>{card?.dateOfBirth}</td>
            <td> {card?.gender}</td>
            <td>
              <button
                type="button"
                className="   text-sky-500 "
                onClick={() => handleDelete(card.id)}
              >
                🗑
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
