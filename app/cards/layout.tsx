"use client"

import { useAuth } from "@/contexts/auth/hooks"

type Props = React.PropsWithChildren

export default function CardsLayout({ children }: Props) {
  const { firebaseUser } = useAuth()

  if (!firebaseUser) {
    return null
  }

  return children
}
