"use client"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import React from "react"

import { getUser } from "@/domains/auth/services"
import { auth } from "@/services/firebase"

import { AuthContext, type AuthContextType } from "./context"

type Props = {
  children?: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const [contextValue, setContextValue] = useState<AuthContextType>({
    firebaseUser: undefined,
    user: undefined,
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,

      async (changedFirebaseUser) => {
        if (!changedFirebaseUser) {
          setContextValue({ firebaseUser: undefined, user: undefined })
          return
        }

        const changedUser = await getUser(changedFirebaseUser.uid)
        if (!changedUser) {
          setContextValue({ firebaseUser: undefined, user: undefined })
          return
        }

        setContextValue({
          firebaseUser: changedFirebaseUser,
          user: changedUser,
        })
      },
    )
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
