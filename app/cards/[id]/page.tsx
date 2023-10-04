"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button } from "@/components/uikit/button";
import { Input } from "@/components/uikit/input";
import {
  getCardById,
  deleteCard,
  calculateAge,
} from "@/domains/cards/services";

export default function CardItem() {
  const { id } = useParams();
  const router = useRouter();

  const card = getCardById(id);

  function handleDelete(id) {
    deleteCard(id);
    router.push("/cards");
  }

  //   if (!card) {
  //     toast.error("Карточка не знайдена")
  //     return null
  //  }

  return (
    <div className="max-w-md m-auto bg-gray-100 mt-5 rounded-md border-slate-400 text-center ">
      <section>
        <h2 className="text-sky-500 font-bold">{card?.name}</h2>
        <h2>{calculateAge(card.dateOfBirth)}</h2>
        <h2>{card?.gender}</h2>
      </section>
      <h2 className="mt-10 text-grey ">Вкажіть вагу та зріст Вашої дитини</h2>

      <form className="flex-col mt-10">
        <Input type="number" name="weight" placeholder="Введіть вагу в кг" />

        <Input type="number" name="heigh" placeholder="Введіть зріст в см" />
      </form>
      <Link href="/">
        <Button className="mt-6">назад до головної сторінки</Button>
      </Link>

      <Button className="mt-6" onClick={handleDelete}>
        Видалити картку
      </Button>
    </div>
  );
}
