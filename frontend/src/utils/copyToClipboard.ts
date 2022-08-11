/**
 * Call the browser API(s) for copying data to the clipboard.
 * @param data the data that should be copied to the clipboard.
 * @returns void.
 */
const copyToClipboard = async (data: string): Promise<void> => {
  return navigator.clipboard.writeText(data)
}

export default copyToClipboard
