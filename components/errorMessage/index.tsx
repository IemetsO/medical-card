import React from "react"

import { cn } from "@/utilities/cn"

type Props = React.PropsWithChildren<{
  className?: string
}>

export const ErrorMessage = (props: Props) => {
  const { children, className } = props

  return children ? (
    <p className={cn("text-xs text-red-500", className)}>{children}</p>
  ) : null
}
