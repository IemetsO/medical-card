"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/uikit/button"
import { Input } from "@/components/uikit/input"
import { useFormik } from "formik"
import * as Yup from "yup"
import { login } from "@/domains/auth/services"
import { ErrorMessage } from "@/components/errorMessage"

export default function Login() {
  const router = useRouter()

  const formikSignIn = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().required("Обов'язкове поле"),
      password: Yup.string().min(7).required("Обов'язкове поле"),
    }),
    onSubmit: (values) => {
      login(values.email, values.password)
      router.push(`/cards`)
    },
  })

  const { getFieldProps, errors, touched } = formikSignIn
  const getErrorMessage = (key: keyof typeof formikSignIn.touched) =>
    touched[key] && errors[key] ? errors[key] : null
  return (
    <div className="mt-5 text-center">
      <form
        className="flex flex-col gap-5"
        onSubmit={formikSignIn.handleSubmit}
      >
        <Input
          {...getFieldProps("email")}
          label="Електронна пошта"
          type="email"
        />
        <ErrorMessage>{getErrorMessage("email")}</ErrorMessage>

        <Input {...getFieldProps("password")} label="Пароль" type="password" />
        <ErrorMessage>{getErrorMessage("password")}</ErrorMessage>

        <div>
          <Button type="submit" className="mb-6 mt-5">
            Перейти в особистий кабінет
          </Button>
        </div>
      </form>
    </div>
  )
}
