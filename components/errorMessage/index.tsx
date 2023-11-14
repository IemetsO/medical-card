import React from "react"
import { cn } from "@/utils"

type Props = React.PropsWithChildren<{
  className?: string
}>

export const ErrorMessage = (props: Props) => {
  const { children, className } = props

  return children ? (
    <p className={cn("text-red-500 text-xs", className)}>{children}</p>
  ) : null
}
