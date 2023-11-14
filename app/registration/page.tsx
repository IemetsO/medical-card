"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/uikit/button"
import { Input } from "@/components/uikit/input"
import { useFormik } from "formik"
import toast from "react-hot-toast"
import * as Yup from "yup"
import { signUp } from "@/domains/auth/services"
import { ErrorMessage } from "@/components/errorMessage"

export default function Registration() {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Обов'язкове поле"),
      email: Yup.string().required("Обов'язкове поле"),
      password: Yup.string().min(7).required("Обов'язкове поле"),
    }),
    onSubmit: (values) => {
      signUp(values)
      toast.success("Особистий кабінет створено")
      router.push(`/cards`)
    },
  })
  const { getFieldProps, errors, touched } = formik

  const getErrorMessage = (key: keyof typeof formik.touched) =>
    touched[key] && errors[key] ? errors[key] : null

  return (
    <div className="mt-5 text-center">
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <Input {...getFieldProps("name")} label="Ім'я" type="text" />
        <ErrorMessage>{getErrorMessage("name")}</ErrorMessage>

        <div>
          <Input
            {...getFieldProps("email")}
            label="Електронна пошта"
            type="email"
          />
          <ErrorMessage>{getErrorMessage("email")}</ErrorMessage>
        </div>
        <div>
          <Input
            {...getFieldProps("password")}
            label="Пароль"
            type="password"
          />
          <ErrorMessage>{getErrorMessage("password")}</ErrorMessage>
          <Input
            {...getFieldProps("password")}
            label="Повторіть пароль"
            type="password"
          />
          <ErrorMessage>{getErrorMessage("password")}</ErrorMessage>
          <Button type="submit" className="mb-6 mt-5">
            Створити особистий кабінет
          </Button>
        </div>
      </form>
    </div>
  )
}
