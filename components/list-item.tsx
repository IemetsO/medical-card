export default function ListItem({ children }) {
  return (
    <li className="p-4 hover:bg-slate-100 text-slate-500 font-small  max-w-sm mx-auto bg-lightgray rounded-xl shadow-lg flex items-center space-x-4">
      {children}
    </li>
  )
}
