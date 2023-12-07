// import { createEnv } from "@t3-oss/env-nextjs"
// import dotenv from "dotenv"
import { z } from "zod"

import { firebaseConfig } from "./env.local"

const FirebaseConfigSchema = z.object({
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().min(1),
})

// const validatedEnvLocal = {
//   NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
//     process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
//     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
//     process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
//     process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// }

const validatedFirebaseConfig = FirebaseConfigSchema.parse(firebaseConfig)

// export const env = createEnv({
//   client: { ...validatedFirebaseConfig }, // Використовуємо валідований об'єкт Firebase як частину client змінних
// })

export const env = {
  client: {
    ...validatedFirebaseConfig,
  },
}
