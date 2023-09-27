type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: Props) => {
  return <input {...props} className={` ml-5 ${props.className}`} />;
};
