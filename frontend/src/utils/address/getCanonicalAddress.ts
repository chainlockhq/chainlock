import isAddress from "../isAddress"

/**
 * Turn the given address into lowercase and prefix with '0x' (if not yet present).
 * @param address the address.
 * @returns the address in canonical form.
 */
const getCanonicalAddress = (address: string) => {
  if (!isAddress(address)) {
    throw new Error(`'${address}' is not a address`)
  }

  const lowerCaseAddress = address.toLowerCase()

  const canonicalAddress = lowerCaseAddress.startsWith('0x') ? lowerCaseAddress : `0x${lowerCaseAddress}`

  return canonicalAddress
}

export default getCanonicalAddress
