import getCanonicalAddress from "../address/getCanonicalAddress"
import getKnownVaultsOfEveryone from "./getKnownVaultsOfEveryone"

const getKnownVaults = (memberAddress: string): string[] => {
  const knownVaults = getKnownVaultsOfEveryone()

  return knownVaults[getCanonicalAddress(memberAddress)] || []
}

export default getKnownVaults
