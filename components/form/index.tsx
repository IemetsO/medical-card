import { useFormik } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/uikit/button"
import { Input } from "@/components/uikit/input"
import { addRecordToCard } from "@/domains/cards/services"
import toast from "react-hot-toast"

export const Form = ({ id, card } = { id: String }) => {
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
      if (card?.records.find((e) => e.age === values.age)) {
        toast.error("Показники данного віку внесені")
      }
      if (typeof id === "string") {
        addRecordToCard(id, values)
      }
    },
  })
  return (
    <form className="flex-row mt-10 " onSubmit={formik.handleSubmit}>
      <Input
        className="text-xs "
        label="Введіть вік в місяцях"
        type="number"
        {...formik.getFieldProps("age")}
      />

      <Input
        className="text-xs"
        label="Введіть вагу в кг"
        type="number"
        {...formik.getFieldProps("weight")}
      />

      <Input
        className="text-xs  "
        label="Введіть ріст в см"
        type="number"
        {...formik.getFieldProps("height")}
      />
      <div>
        <Button type="submit" className="mb-6 mt-5">
          Внести показники
        </Button>
      </div>
    </form>
  )
}
