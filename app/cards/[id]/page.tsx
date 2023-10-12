"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button } from "@/components/uikit/button";
import { Input } from "@/components/uikit/input";
import { Chart } from "@/components/chart";
import {
  getCardById,
  deleteCard,
  calculateAge,
  addRecordToCard,
  calculateBMI,
  deleteRecordFromCard,
} from "@/domains/cards/services";
import toast from "react-hot-toast";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";

export default function CardItem() {
  const { id } = useParams();
  const router = useRouter();
  const card = getCardById(id);
  // useEffect(() => {
  //   if (!card) {
  //     toast.error("Карточка не знайдена");

  //     return null;
  //   }
  //   console.log("fff");
  //   return card;
  // }, [card]);

  const [dataForChart, setDataForChart] = useState([]);

  const formik = useFormik({
    initialValues: {
      age: 0,
      weight: 0,
      height: 0,
    },

    validationSchema: Yup.object({
      age: Yup.number().required("Обов'язкове поле"),
      weight: Yup.number().required("Обов'язкове поле"),
      height: Yup.number().required("Обов'язкове поле"),
    }),
    onSubmit: (values) => {
      if (card.records.find((e) => e.age === values.age)) {
        toast.error("Показники данного віку внесені");
        return null;
      }

      addRecordToCard(id, values);
    },
  });

  function handleDelete(id) {
    toast.success("Карточку видалено!");
    deleteCard(id);
    router.push("/cards");
  }

  function createChart() {
    const updateCard = getCardById(id);
    setDataForChart(updateCard.records);
  }

  return (
    <div className="max-w-md m-auto bg-gray-100 mt-5 rounded-md border-slate-400 text-center ">
      <section>
        <h2 className="text-sky-500 font-bold">{card?.name}</h2>
        <h2>{calculateAge(card.dateOfBirth)}</h2>
        <h2>{card?.gender}</h2>
      </section>
      <h2 className="mt-10 text-grey ">
        Вкажіть вагу та зріст Вашої дитини по місяцям для побудови графіку
      </h2>
      <form className="flex-row mt-10" onSubmit={formik.handleSubmit}>
        <Input
          type="number"
          placeholder="Введіть вік в місяцях"
          {...formik.getFieldProps("age")}
        />
        <Input
          type="number"
          placeholder="Введіть вагу в кг"
          {...formik.getFieldProps("weight")}
        />
        <Input
          type="number"
          placeholder="Введіть ріст в см"
          {...formik.getFieldProps("height")}
        />
        <div>
          <Button type="submit" className="mb-6 mt-5">
            Внести показники
          </Button>{" "}
        </div>
        <div>
          {card.records.map((item) => (
            <div key={item.age} className="flex flex-row text-center">
              <p className="mr-5"> {item.age} міс </p>
              <p className="mr-5"> {item.weight} кг</p>
              <p className="mr-5"> {item.height} см</p>
              <p className="mr-5">
                {" "}
                IMT {calculateBMI(item.weight, item.height)}кг/м2
              </p>
              <Button
                className="w-5 h-5 "
                onClick={() => {
                  deleteRecordFromCard(id, item.age);
                }}
              >
                х
              </Button>
            </div>
          ))}
        </div>
      </form>
      <Button type="submit" className="mb-6 mt-5" onClick={createChart}>
        Побудувати графік
      </Button>
      <h3 className="mt-5 text-grey ">Графік вік/вага</h3>
      <Chart data={dataForChart} />
      <Link href="/">
        <Button className="mt-6">назад до головної сторінки</Button>
      </Link>
      <Button className="mt-6" onClick={handleDelete}>
        Видалити картку
      </Button>
    </div>
  );
}
