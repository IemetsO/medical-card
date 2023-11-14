"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/utils"

import { HEADER_LINKS, LOGIN_REGISTRATION } from "./constant"

export const Header = () => {
  const pathname = usePathname()
  return (
    <header className="flex items-center gap-5 bg-sky-400 p-6 font-bold text-white ">
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
