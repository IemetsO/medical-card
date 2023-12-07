"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/uikit/button"
import { useAuth } from "@/contexts/auth/hooks"
import { logout } from "@/domains/auth/services"
import { cn } from "@/utils"

import {
  ABOUT_PAGE_HEADER_LINKS,
  AUTHED_HEADER_LINKS,
  NOT_AUTHED_HEADER_LINKS,
} from "./constant"

export const Header = () => {
  const pathname = usePathname()
  const { user } = useAuth()

  const sectionNode = !user ? (
    <div className="flex flex-row items-center gap-5">
      {NOT_AUTHED_HEADER_LINKS.map((link) => (
        <Link key={link.text} href={link.href}>
          {link.text}
        </Link>
      ))}
    </div>
  ) : (
    <div className="flex flex-row items-center gap-5">
      {AUTHED_HEADER_LINKS.map((link) => (
        <Link
          key={link.text}
          className={cn("link", pathname === link.href && "underline")}
          href={link.href}
        >
          {link.text}
        </Link>
      ))}
      <p>{user?.name}</p> <Button onClick={logout}>Вийти</Button>
    </div>
  )

  return (
    <header className="flex items-center gap-10 bg-sky-400 p-6 font-bold text-white ">
      {ABOUT_PAGE_HEADER_LINKS.map((link) => (
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
