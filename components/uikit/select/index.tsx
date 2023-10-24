import { cn } from "@/utils"

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: React.ReactNode
}

export const Select = (props: Props) => {
  const { label, className, ...restProps } = props

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <label>{label}</label>
      <select {...restProps} className="border-2 border-sky-400 h-10 w-2/3" />
    </div>
  )
}
