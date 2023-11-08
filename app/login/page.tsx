"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/uikit/button"
import { Input } from "@/components/uikit/input"
import { useFormik } from "formik"
import toast from "react-hot-toast"
import * as Yup from "yup"
import { login, signUp } from "@/domains/auth/services"

export default function Login() {
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
  const { getFieldProps } = formik
  return (
    <div className="mt-5 text-center">
      <form className="flex-col  " onSubmit={formik.handleSubmit}>
        <Input {...getFieldProps("name")} label="Ім'я" type="text" />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-xs">{formik.errors.name}</div>
        ) : null}
        <div className="mt-5  ">
          <Input
            {...getFieldProps("email")}
            label="Електронна пошта"
            type="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-xs">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mt-5  ">
          <Input
            {...getFieldProps("password")}
            label="Пароль"
            type="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-xs">{formik.errors.password}</div>
          ) : null}
        </div>

        <div>
          <Button type="submit" className="mb-6 mt-5">
            Створити особистий кабінет
          </Button>
        </div>
      </form>
      <h4>У Вас вже є особистий кабінет? </h4>

      <form className="flex-col  " onSubmit={formikSignIn.handleSubmit}>
        <Input
          {...formikSignIn.getFieldProps("email")}
          label="Електронна пошта"
          type="email"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-xs">{formik.errors.email}</div>
        ) : null}

        <div className="mt-5  ">
          <Input
            {...formikSignIn.getFieldProps("password")}
            label="Пароль"
            type="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-xs">{formik.errors.password}</div>
          ) : null}
        </div>

        <div>
          <Button type="submit" className="mb-6 mt-5">
            Перейти в особистий кабінет
          </Button>
        </div>
      </form>
    </div>
  )
}
