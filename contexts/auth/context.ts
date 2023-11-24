import type { User as FirebaseUser } from "firebase/auth"
import React from "react"

import { type User } from "@/domains/auth/types"

export type AuthContextType = {
  firebaseUser: FirebaseUser | undefined
  user: User | undefined
  isInitialized: boolean
}

export const AuthContext = React.createContext<AuthContextType>({
  firebaseUser: undefined,
  user: undefined,
  isInitialized: false,
})
