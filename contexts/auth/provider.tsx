"use client"
import { onAuthStateChanged } from "firebase/auth"
import type { User as FirebaseUser } from "firebase/auth"
import { useEffect, useMemo, useState } from "react"
import React from "react"

import { getUser } from "@/domains/auth/services"
import { type User } from "@/domains/auth/types"
import { auth } from "@/services/firebase"

import { AuthContext, type AuthContextType } from "./context"

type Props = {
  children?: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (changedFirebaseUser) => {
      setFirebaseUser(changedFirebaseUser)
      setIsInitialized(true)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const loadUser = async () => {
      if (!firebaseUser) {
        setUser(undefined)
        return
      }

      const changedUser = await getUser(firebaseUser.uid)
      if (!changedUser) {
        setFirebaseUser(null)
        setUser(undefined)
        return
      }

      setUser(changedUser)
    }

    loadUser().catch(console.error)
  }, [firebaseUser])

  const contextValue: AuthContextType = useMemo(
    () => ({
      firebaseUser: firebaseUser ?? undefined,
      user,
      isInitialized,
    }),
    [firebaseUser, user, isInitialized],
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
