import React from "react"

import { ErrorMessage } from "@/components/errorMessage"
import { cn } from "@/utilities/cn"

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode
  error?: React.ReactNode
}

const _Input = (props: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
  const { label, className, error, ...restProps } = props

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <label>{label}</label>
      <input
        {...restProps}
        ref={ref}
        className="h-10 w-2/3 border-2 border-sky-400"
      />
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  )
}

export const Input = React.forwardRef(_Input)
