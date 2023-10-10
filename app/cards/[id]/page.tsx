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
  addRecordToCard,
  calculateBMI,
  deleteRecordFromCard,
} from "@/domains/cards/services";
import toast, { Toaster } from "react-hot-toast";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useFormik } from "formik";
import { number } from "yup";
import * as Yup from "yup";
import { useState } from "react";

export default function CardItem() {
  const { id } = useParams();
  const router = useRouter();

  const card = getCardById(id);

  const [dataForChart, setDataForChart] = useState([]);

  const formik = useFormik({
    initialValues: {
      age: number,
      weight: number,
      height: number,
    },

    validationSchema: Yup.object({
      age: Yup.number().required("Обов'язкове поле"),
      weight: Yup.number().required("Обов'язкове поле"),
      height: Yup.number().required("Обов'язкове поле"),
    }),
    onSubmit: (values) => {
      const record = {
        age: values.age,
        weight: values.weight,
        height: values.height,
      };
      if (card.records.find((e) => e.age === record.age)) {
        toast.error("Показники данного віку внесені");
        return null;
      }

      addRecordToCard(id, record);
    },
  });

  function handleDelete(id) {
    notify();
    deleteCard(id);
    router.push("/cards");
  }

  if (!card) {
    toast.error("Карточка не знайдена");
    return null;
  }
  const notify = () => toast("Карточку видалено!");

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
          name="age"
          value={formik.values.age}
          placeholder="Введіть вік в місяцях"
          onChange={formik.handleChange}
        />
        {/* {formik.touched.age && formik.errors.age ? (
          <div className="text-red-500 text-xs">{formik.errors.age}</div>
        ) : null} */}
        <Input
          type="number"
          name="weight"
          value={formik.values.weight}
          placeholder="Введіть вагу в кг"
          onChange={formik.handleChange}
        />
        <Input
          type="number"
          name="height"
          value={formik.values.height}
          placeholder="Введіть зріст в см"
          onChange={formik.handleChange}
        />
        <div>
          <Button type="submit" className="mb-6 mt-5">
            Внести показники
          </Button>{" "}
        </div>
        <div>
          {card.records.map((e) => (
            <div key={e.age} className="flex flex-row text-center">
              <p className="mr-5"> {e.age} міс </p>
              <p className="mr-5"> {e.weight} кг</p>
              <p className="mr-5"> {e.height} см</p>
              <p className="mr-5">
                {" "}
                IMT {calculateBMI(e.weight, e.height)}кг/м2
              </p>
              <Button
                className="w-5 h-5 "
                onClick={() => {
                  deleteRecordFromCard(id, e.age);
                }}
              ></Button>
            </div>
          ))}
        </div>
      </form>
      <Button type="submit" className="mb-6 mt-5" onClick={createChart}>
        Побудувати графік
      </Button>{" "}
      <h3 className="mt-5 text-grey ">Графік вік/вага</h3>
      <LineChart
        width={400}
        height={200}
        data={dataForChart}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="age" />
        <YAxis />
        <Tooltip />
      </LineChart>
      <Link href="/">
        <Button className="mt-6">назад до головної сторінки</Button>
      </Link>
      <Button className="mt-6" onClick={handleDelete}>
        Видалити картку
      </Button>
      <Toaster />
    </div>
  );
}
