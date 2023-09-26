"use client";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

export default function Cards() {
  type card = {
    id: string;
    name: string;
    age: number;
    gender: string;
  };

  const [card, setCard] = useState<card | null>(null);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify([card]));
  }, [card]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.name.value === "" || form.name.age === "") {
      return;
    }
    setCard({
      id: nanoid(),
      name: form.name.value,
      age: form.age.value,
      gender: form.gender.value,
    });
  };

  return (
    <div className="mt-10">
      <div className="mt-10 text-center">
        <h2 className="text-grey font-bold">Внесіть дані Вашої дитини</h2>

        <form className="flex-col mt-10" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Введіть ім'я"
            className="ml-5"
          />

          <div className="mt-10">
            <input
              type="number"
              name="age"
              placeholder="Введіть вік"
              className="ml-5"
            />
          </div>
          <div className=" mt-10">
            <select name="gender">
              <option value="Дівчинка">дівчинка</option>
              <option value="Хлопчик">хлопчик</option>
            </select>
          </div>
          <div>
            <button
              className=" bg-sky-500 hover:bg-sky-700 mt-10 mb-10 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Створити карточку
            </button>
          </div>
        </form>
        <div className="mb-6">
          <Link
            className="p-6 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            href="cards"
          >
            Перейти до карток
          </Link>
        </div>
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
