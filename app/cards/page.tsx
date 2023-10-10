"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Card } from "../../domains/cards/types";
import { Button } from "@/components/uikit/button";
import { deleteCard, getCards } from "@/domains/cards/services";
import toast, { Toaster } from "react-hot-toast";

export default function Cards(card: Card) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const allCardsData = getCards();
    setCards(allCardsData);
  }, []);

  function handleDelete(id: string) {
    deleteCard(id);
    const allCardsData = getCards();
    setCards(allCardsData);
    notify();
  }
  const notify = () => toast("Карточку видалено!");

  let sectionNode;

  if (cards?.length < 1) {
    sectionNode = <section>Ви не створили жодної картки</section>;
  } else {
    sectionNode = (
      <section>
        <h2 className="mt-10">Ваша дитина</h2>
        <div>
          {cards.map((card: Card) => (
            <div
              key={card?.id}
              className=" max-w-md m-auto bg-gray-100 mt-5 rounded-md border-slate-400 flex flex-row justify-around items-center"
            >
              <Link
                href={`cards/${card.id}`}
                className="text-sky-500 font-bold"
              >
                {card?.name}
              </Link>
              <div className="flex flex-row ">
                <p className=" text-xs">{card?.dateOfBirth}</p>
                <p className=" text-xs ml-5" text-grey>
                  {card?.gender}
                </p>
              </div>
              <button
                type="button"
                className="place-items-end min-w-max h-50 rounded-md text-sky-500 rounded-md border-grey"
                onClick={() => handleDelete(card.id)}
              >
                x
              </button>
              <Toaster />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="mt-10 text-center">
      {sectionNode}

      <Link href="/">
        <Button className="mt-5">назад до головної сторінки</Button>
      </Link>
    </div>
  );
}
