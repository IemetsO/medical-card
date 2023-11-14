"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/utils"
import { HEADER_LINKS, LOGIN_REGISTRATION } from "./constant"

export const Header = () => {
  const pathname = usePathname()
  return (
    <header className="bg-sky-400 text-white font-bold p-6 flex items-center gap-5 ">
      {HEADER_LINKS.map((link) => (
        <Link
          key={link.text}
          className={cn("link", pathname === link.href && "underline")}
          href={link.href}
        >
          {link.text}
        </Link>
      ))}
      {LOGIN_REGISTRATION.map((link) => (
        <Link key={link.text} href={link.href}>
          {link.text}
        </Link>
      ))}
    </header>
  )
}
