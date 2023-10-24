export default function AboutItem({ children }) {
  return (
    <p className="p-4 hover:bg-slate-100 text-slate-500 font-small  max-w-sm mx-auto bg-lightgray rounded-xl shadow-lg flex items-center space-x-4">
      {children}
    </p>
  )
}
