import Link from "next/link";
import ListItem from "@/components/listItem";

export default function About() {
  return (
    <div className="mt-10">
      <div className="m-auto">
        <h1 className="mt-10 text-center text-lg text-black font-semibold">
          Здорова дитина
        </h1>
      </div>
      <div>
        <ListItem>Розвиток здорової дитини. Поради для батьків</ListItem>
        <ListItem>Найпоширеніші хвороби дітей. Інформація для батьків</ListItem>
        <ListItem>
          Особистий кабінет із можливістю вносити показники ваги, зросту дитини
          та отримані щеплення
        </ListItem>
      </div>

      <div className="mt-10 text-center">
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
