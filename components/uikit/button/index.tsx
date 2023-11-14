type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: Props) => {
  const { type = "button", className } = props
  return (
    <button
      {...props}
      type={type ?? "button"}
      className={`rounded bg-sky-400 px-4 py-2 font-bold text-white hover:bg-sky-500 ${className}`}
    />
  )
}
