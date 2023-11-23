"use client"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import * as Yup from "yup"

import { ErrorMessage } from "@/components/errorMessage"
import { Button } from "@/components/uikit/button"
import { Input } from "@/components/uikit/input"
import { Select } from "@/components/uikit/select"
import { useAuth } from "@/contexts/auth/hooks"
import { createCard } from "@/domains/card/services"

export default function Cards() {
  const router = useRouter()
  const { user } = useAuth()

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
    onSubmit: async (values) => {
      try {
        const cardData = {
          name: values.name.toUpperCase(),
          dateOfBirth: values.dateOfBirth,
          gender: values.gender,
        }
        const userId = user.id
        const newCard = await createCard(userId, cardData)
        router.push(`/cards/${newCard.id}`)
      } catch (error) {
        console.error("Помилка при створенні карти:", error)
      }
    },
  })
  const showSuccessAlert = () => toast.success("Карточку створено!")

  const { getFieldProps, errors, touched } = formik
  const getErrorMessage = (key: keyof typeof formik.touched) =>
    touched[key] && errors[key] ? errors[key] : null

  return (
    <div className="mt-10 text-center">
      <h2 className="text-grey font-bold">Внесіть дані Вашої дитини</h2>

      <form className="mt-5 flex-col  " onSubmit={formik.handleSubmit}>
        <Input {...getFieldProps("name")} label="Ім'я" type="text" />
        <ErrorMessage>{getErrorMessage("name")}</ErrorMessage>

        <div className="mt-10  ">
          <Input
            {...getFieldProps("dateOfBirth")}
            label="Дата народження"
            type="Date"
          />
          <ErrorMessage>{getErrorMessage("dateOfBirth")}</ErrorMessage>
        </div>

        <div className="mt-10 ">
          <Select {...getFieldProps("gender")}>
            <option value="" selected disabled>
              Оберіть стать
            </option>
            <option value="дівчинка">дівчинка</option>
            <option value="хлопчик">хлопчик</option>
          </Select>
          <ErrorMessage>{getErrorMessage("gender")}</ErrorMessage>
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
