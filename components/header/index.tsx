"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/uikit/button"
import { useAuth } from "@/contexts/auth/hooks"
import { logout } from "@/domains/auth/services"
import { cn } from "@/utils"

import { HEADER_ABOUT, HEADER_CARDS, LOGIN_REGISTRATION } from "./constant"

export const Header = () => {
  const pathname = usePathname()
  const user = useAuth()

  let sectionNode

  if (!user.user) {
    sectionNode = (
      <div className="flex flex-row items-center gap-5">
        {LOGIN_REGISTRATION.map((link) => (
          <Link key={link.text} href={link.href}>
            {link.text}
          </Link>
        ))}
      </div>
    )
  } else {
    sectionNode = (
      <div className="flex flex-row items-center gap-5">
        {HEADER_CARDS.map((link) => (
          <Link
            key={link.text}
            className={cn("link", pathname === link.href && "underline")}
            href={link.href}
          >
            {link.text}
          </Link>
        ))}
        <p>{user?.user?.name}</p> <Button onClick={logout}>Вийти</Button>
      </div>
    )
  }
  return (
    <header className="flex items-center gap-10 bg-sky-400 p-6 font-bold text-white ">
      {HEADER_ABOUT.map((link) => (
        <Link
          key={link.text}
          className={cn("link", pathname === link.href && "underline")}
          href={link.href}
        >
          {link.text}
        </Link>
      ))}

      {sectionNode}
    </header>
  )
}
