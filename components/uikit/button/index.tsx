type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: Props) => {
  const { type = "button", className } = props
  return (
    <button
      {...props}
      type={type ?? "button"}
      className={`bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded ${className}`}
    />
  )
}
