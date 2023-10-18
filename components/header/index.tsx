"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export const Header = () => {
  const pathname = usePathname()
  return (
    <header className="bg-sky-400 text-white font-bold h-10 pl-5 items-baseline">
      <Link
        className={`link ${pathname === "/about" ? "underline" : ""}`}
        href="/about"
      >
        Про нас
      </Link>
      <Link
        className={`link ${pathname === "/cards" ? "underline" : ""} ml-5`}
        href="/cards"
      >
        Ваші картки
      </Link>
    </header>
  )
}
