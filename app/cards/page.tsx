"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Card } from "../../domains/cards/types";
import { Button } from "@/components/uikit/button";

export default function Cards(card: Card) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let allCardsData = JSON.parse(localStorage.getItem("cards"));
    setCards(allCardsData);

    console.log(allCardsData);
  }, []);

  let sectionNode;

  if (!cards) {
    sectionNode = <section>Ви не створили жодної картки</section>;
  } else {
    sectionNode = (
      <section>
        <h2 className="mt-10 hover:bg-sky-700 text-grey font-bold">
          Ваша дитина
        </h2>
        <ul>
          {cards.map((card: Card) => (
            <li key={card?.id} className="text-grey">
              <Link href={`cards/${card.id}`}>{card?.name}</Link>
              <br />
              {card?.age}
              <br />
              {card?.gender}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <div className="mt-10">
      <div className="mt-10 text-center">
        {sectionNode}

        <Link href="/">
          <Button>назад до головної сторінки</Button>
        </Link>
      </div>
    </div>
  );
}
