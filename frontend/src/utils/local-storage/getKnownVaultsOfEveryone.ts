import isAddress from "../isAddress"

/**
 * type guard for 'known-vaults' entry in localStorage
 */
const isKnownVaultsObj = (obj: any): obj is {[key: string]: string[]} => {
  for (const memberAddress of Object.keys(obj)) {
    if (!isAddress(memberAddress)) {
      console.error(`failed to parse localStorage value 'known-vaults' because member '${memberAddress}' is not a valid address`)
      return false
    }

    const vaultAddresses = obj[memberAddress]
    if (vaultAddresses?.constructor !== Array) {
      console.error(`failed to parse localStorage value 'known-vaults' because vault address list of '${memberAddress}' is not an array`)
      return false
    }

    for (const vaultAddress of vaultAddresses) {
      if (!isAddress(vaultAddress)) {
        console.error(`failed to parse localStorage value 'known-vaults' because vault '${vaultAddress}' of member '${memberAddress}' is not a valid address`)
        return false
      }
    }
  }

  return true
}

const getKnownVaultsOfEveryone = (): {[key: string]: string[]} => {
  const knownVaultsStr = window.localStorage.getItem('known-vaults')
  if (!knownVaultsStr) {
    return {}
  }

  const knownVaults = JSON.parse(knownVaultsStr)
  if (!isKnownVaultsObj(knownVaults)) {
    throw new Error(`string ${knownVaultsStr} does not represent a 'known-vaults' object`)
  }

  return knownVaults
}

export default getKnownVaultsOfEveryone
