import React from "react"

import { cn } from "@/utils"

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
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  )
}

export const Input = React.forwardRef(_Input)
