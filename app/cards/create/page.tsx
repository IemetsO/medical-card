"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/uikit/button"
import { Input } from "@/components/uikit/input"
import { Select } from "@/components/uikit/select"
import { createCard } from "@/domains/cards/services"
import { useFormik } from "formik"
import toast from "react-hot-toast"
import * as Yup from "yup"

export default function Cards() {
  const router = useRouter()

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
        values.gender,
      )

      router.push(`/cards/${newCard.id}`)
    },
  })
  const showSuccessAlert = () => toast.success("Карточку створено!")

  return (
    <div className="mt-10 text-center">
      <h2 className="text-grey font-bold">Внесіть дані Вашої дитини</h2>

      <form className="flex-col mt-5" onSubmit={formik.handleSubmit}>
        <p className="">Введіть ім`я</p>
        <Input
          type="text"
          name="name"
          value={formik.values.name}
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
          <Select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <option value="" selected disabled>
              Оберіть стать
            </option>
            <option value="дівчинка">дівчинка</option>
            <option value="хлопчик">хлопчик</option>
          </Select>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="text-red-500 text-xs">{formik.errors.gender}</div>
          ) : null}
        </div>
        <div>
          <Button
            type="submit"
            onClick={showSuccessAlert}
            className="mb-6 mt-5"
          >
            Створити карточку
          </Button>
        </div>
      </form>
    </div>
  )
}
