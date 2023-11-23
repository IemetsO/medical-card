"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useAuth } from "@/contexts/auth/hooks"

type Props = React.PropsWithChildren

export default function CardsLayout({ children }: Props) {
  const { firebaseUser, isInitialized } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isInitialized && !firebaseUser) {
      router.replace("/")
    }
  }, [firebaseUser, isInitialized, router])

  if (!firebaseUser) {
    return null
  }

  return children
}
