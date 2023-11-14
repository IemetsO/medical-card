import { cn } from "@/utils"

import styles from "./styles.module.css"

type Props = {
  children: React.ReactNode
  className?: string
}

export const Table = (props: Props) => {
  const { children, className } = props

  return (
    <table className={cn("w-full", styles.table, className)}>{children}</table>
  )
}
