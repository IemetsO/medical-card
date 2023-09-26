"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

// export async function getStaticProps() {
//   const allCardsData = localStorage.getItem("cards");
//   console.log(allCardsData);
//   return {
//     props: {
//       allCardsData,
//     },
//   };
// }

export default function Cards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let allCardsData = JSON.parse(localStorage.getItem("cards"));
    setCards(allCardsData);

    console.log(allCardsData);
  }, []);

  let Section;

  if (!cards) {
    Section = <section>Ви не створили жодної картки</section>;
  } else {
    Section = (
      <section>
        <h2 className="mt-10 hover:bg-sky-700 text-grey font-bold">
          Ваша дитина
        </h2>
        <ul>
          {cards.map(
            (card: {
              id: string;
              name: string;
              age: number;
              gender: string;
            }) => (
              <li key={card?.id} className="text-grey">
                <Link href={"cards/id"}>{card?.name}</Link>
                <br />
                {card?.age}
                <br />
                {card?.gender}
              </li>
            )
          )}
        </ul>
      </section>
    );
  }

  return (
    <div className="mt-10">
      <div className="mt-10 text-center">
        {Section}

        <Link
          className=" bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
          href="/"
        >
          назад до головної сторінки
        </Link>
      </div>
    </div>
  );
}
