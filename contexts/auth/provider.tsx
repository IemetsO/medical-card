"use client"
import { useState, useEffect } from "react"
import { auth } from "@/services/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { AuthContextType, AuthContext } from "./context"
import { getUser } from "@/domains/auth/services"

import React from "react"

type Props = {
  children?: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const [contextValue, setContextValue] = useState<AuthContextType>({
    firebaseUser: undefined,
    user: undefined,
  })
  console.log(contextValue)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,

      async (changedFirebaseUser) => {
        if (!changedFirebaseUser) {
          setContextValue({ firebaseUser: undefined, user: undefined })
          return
        }
        const changedUser = await getUser(changedFirebaseUser.uid)
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
