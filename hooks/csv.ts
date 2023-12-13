import { parse, type ParseRemoteConfig, type ParseResult } from "papaparse"
import { useEffect, useState } from "react"

export function useStaticCSV<T = Record<string | number, unknown>>(
  url: string,
  configs?: Pick<ParseRemoteConfig<T>, "header" | "transform">,
) {
  const [csv, setCsv] = useState<ParseResult<T>>()

  useEffect(() => {
    const onComplete: ParseRemoteConfig<T>["complete"] = (results) => {
      setCsv(results)
    }

    parse(url, {
      download: true,
      header: configs?.header,
      transform: configs?.transform,
      complete: onComplete,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return csv?.data
}
