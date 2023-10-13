type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: Props) => {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      className={`bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded ${props.className}`}
    />
  )
}
