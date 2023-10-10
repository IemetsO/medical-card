"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "./../../../domains/cards/types";
import { Button } from "@/components/uikit/button";
import { Input } from "@/components/uikit/input";
import { createCard } from "@/domains/cards/services";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";

export default function Cards(card: Card) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      dateOfBirth: "",
      gender: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Обов'язкове поле"),
      dateOfBirth: Yup.string().required("Обов'язкове поле"),
      gender: Yup.string().required("Обов'язкове поле"),
    }),
    onSubmit: (values) => {
      const newCard = createCard(
        values.name.toUpperCase(),
        values.dateOfBirth,
        values.gender
      );

      router.push(`/cards/${newCard.id}`);
    },
  });
  const notify = () => toast("Карточку створено!");

  return (
    <div className="mt-10 text-center">
      <h2 className="text-grey font-bold">Внесіть дані Вашої дитини</h2>

      <form className="flex-col mt-10" onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          name="name"
          value={formik.values.name}
          placeholder="Введіть ім'я"
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-xs">{formik.errors.name}</div>
        ) : null}
        <div className="mt-10 text-grey-25 ">
          <p className="">Введіть дату народження</p>
          <Input
            type="Date"
            name="dateOfBirth"
            value={formik.values.dateOfBirth}
            className="text-xs"
            onChange={formik.handleChange}
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
            <div className="text-red-500 text-xs">
              {formik.errors.dateOfBirth}
            </div>
          ) : null}
        </div>

        <div className="mt-10 ">
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <option value="" selected disabled>
              Оберіть стать
            </option>
            <option value="дівчинка">дівчинка</option>
            <option value="хлопчик">хлопчик</option>
          </select>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="text-red-500 text-xs">{formik.errors.gender}</div>
          ) : null}
        </div>
        <div>
          <Button type="submit" onClick={notify} className="mb-6 mt-5">
            Створити карточку
          </Button>{" "}
          <Toaster />
        </div>
      </form>
      <div className="mb-6">
        <Link href="/cards">
          <Button>Перейти до карток</Button>
        </Link>
      </div>
      <Link href="/">
        <Button>назад до головної сторінки</Button>
      </Link>
    </div>
  );
}
