import { useEffect, useState } from "react"
import _copyToClipboard from "../utils/copyToClipboard"

/**
 * Copy a string to the clipboard, and create a signal to display a "copied!" message
 * @param timeout the timeout after which the "copied!" message should disappear
 * @returns the "copied!" signal (boolean) and a function for copying data to the clipboard
 */
const useCopyToClipboard = (timeout: number = 500): [boolean, (data: string) => void] => {
  // whenever a timeoutId is present, the "copied!" message should be show
  const [timeoutId, setTimeoutId] = useState<number>()

  const copyToClipboard = (data: string): void => {
    // do copy to clipboard
    _copyToClipboard(data)

    // schedule removal of "copied!" message
    const timeoutId = window.setTimeout(() => {
      clearTimeout(timeoutId)
      setTimeoutId(undefined)
    }, timeout)

    // activate "copied!" message
    setTimeoutId(timeoutId)
  }

  // clean up every time after timeoutId changes
  useEffect(() => {
    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  // convert timeoutId to boolean
  const showCopied = timeoutId !== undefined

  return [showCopied, copyToClipboard]
}

export default useCopyToClipboard
