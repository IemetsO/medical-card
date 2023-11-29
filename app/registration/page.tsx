"use client"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import * as Yup from "yup"

import { Button } from "@/components/uikit/button"
import { Input } from "@/components/uikit/input"
import { signUp } from "@/domains/auth/services"

export default function Registration() {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Обов'язкове поле"),
      email: Yup.string().required("Обов'язкове поле"),
      password: Yup.string().min(7).required("Обов'язкове поле"),
      password2: Yup.string()
        .oneOf([Yup.ref("password")], "Паролі повинні співпадати")
        .required("Обов'язкове поле"),
    }),
    onSubmit: (values) => {
      signUp(values)
      toast.success("Особистий кабінет створено")
      router.push(`/cards`)
    },
  })
  const { getFieldProps, errors, touched } = formik

  const getErrorMessage = (key: keyof typeof touched) =>
    touched[key] && errors[key] ? errors[key] : null

  return (
    <div className="mt-5 text-center">
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <Input
          {...getFieldProps("name")}
          label="Ім'я"
          type="text"
          error={getErrorMessage("name")}
        />

        <div>
          <Input
            {...getFieldProps("email")}
            label="Електронна пошта"
            type="email"
            error={getErrorMessage("email")}
          />
        </div>
        <div>
          <Input
            {...getFieldProps("password")}
            label="Пароль"
            type="password"
            error={getErrorMessage("password")}
          />

          <Input
            {...getFieldProps("password2")}
            label="Повторіть пароль"
            type="password"
            error={getErrorMessage("password2")}
          />

          <Button type="submit" className="mb-6 mt-5">
            Створити особистий кабінет
          </Button>
        </div>
      </form>
    </div>
  )
}
