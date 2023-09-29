"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "./../../../domains/cards/types";
import { Button } from "@/components/uikit/button";
import { Input } from "@/components/uikit/input";
import { createCard } from "@/domains/cards/services";

export default function Cards(card: Card) {
  const router = useRouter();

  const previousCards = JSON.parse(localStorage.getItem("cards")) || [];
  const newCards = [...previousCards];

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.name.value === "" || form.name.age === "") {
      return;
    }

    newCards.push(
      createCard(form.name.value, form.age.value, form.gender.value)
    );
    localStorage.setItem("cards", JSON.stringify(newCards));

    router.push(`/cards/${card.id}`);
  };

  return (
    <div className="mt-10 text-center">
      <h2 className="text-grey font-bold">Внесіть дані Вашої дитини</h2>

      <form className="flex-col mt-10" onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Введіть ім'я" />

        <div className="mt-10">
          <Input type="number" name="age" placeholder="Введіть вік" />
        </div>
        <div className=" mt-10">
          <select name="gender">
            <option value="дівчинка">дівчинка</option>
            <option value="хлопчик">хлопчик</option>
          </select>
        </div>
        <div>
          <Button type="submit" className="mb-6 mt-5">
            Створити карточку
          </Button>
        </div>
      </form>
      <div className="mb-6">
        <Link href="cards">
          <Button>Перейти до карток</Button>
        </Link>
      </div>
      <Link href="/">
        <Button>назад до головної сторінки</Button>
      </Link>
    </div>
  );
}
