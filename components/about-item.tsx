type Props = {
  children: React.ReactNode
}

export default function AboutItem({ children }: Props) {
  return (
    <p className="font-small bg-lightgray mx-auto flex  max-w-sm items-center space-x-4 rounded-xl p-4 text-slate-500 shadow-lg hover:bg-slate-100">
      {children}
    </p>
  )
}
