import { useFormik } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/uikit/button"
import { Input } from "@/components/uikit/input"

import toast from "react-hot-toast"
import { Card } from "@/domains/cards/types"
type Props = {
  id: string
  card: Card
}

export const Form = ({ id, card }: Props) => {
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
      if (card?.records.find((recordItem) => recordItem.age === values.age)) {
        toast.error("Показники данного віку внесені")
      }
    },
  })
  const { getFieldProps } = formik
  return (
    <form className="mt-10 " onSubmit={formik.handleSubmit}>
      <Input
        {...getFieldProps("age")}
        className="text-xs "
        label="Введіть вік в місяцях"
        type="number"
        placeholder="1"
      />

      <Input
        {...getFieldProps("weight")}
        className="text-xs"
        label="Введіть вагу в кг"
        type="number"
        pattern="2"
      />

      <Input
        {...getFieldProps("height")}
        className="text-xs  "
        label="Введіть ріст в см"
        type="number"
        placeholder="40"
      />

      <Button type="submit" className="mb-6 mt-5">
        Внести показники
      </Button>
    </form>
  )
}
