"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button } from "@/components/uikit/button";
import { showCard } from "@/domains/cards/services";
import { Input } from "../../../components/uikit/input";
import { deleteCard } from "@/domains/cards/services";

export default function CardId() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;
  console.log(params);
  const card = showCard(id);

  function handleDelete(id: string) {
    deleteCard(params.id);
    router.push("/cards");
  }

  function calculateAge(dateOfBirth) {
    let today = new Date();
    let age = today.getFullYear() - new Date(dateOfBirth).getFullYear();

    let m = today.getMonth() - new Date(dateOfBirth).getMonth();

    let d = Math.round(
      (today.getTime() - new Date(dateOfBirth).getTime()) / 86400000
    );
    let string;

    if (age === 0 && m === 0) {
      string = `вік ${d} днів`;
    } else {
      string = `вік ${age} років ${m} місяців`;
    }

    return string;

    // var ageDifMs = Date.now() - new Date(dateOfBirth).getTime();
    // var ageDate = new Date(ageDifMs); // miliseconds from epoch
    // let years = Math.abs(ageDate.getUTCFullYear() - 1970)
    // let months =
    // return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

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

      <Button
        className="mt-6"
        onClick={() => {
          handleDelete;
        }}
      >
        Видалити картку
      </Button>
    </div>
  );
}
