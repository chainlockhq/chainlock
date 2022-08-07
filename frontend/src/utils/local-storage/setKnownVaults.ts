import getCanonicalAddress from "../address/getCanonicalAddress"
import getKnownVaultsOfEveryone from "./getKnownVaultsOfEveryone"

const setKnownVaults = (memberAddress: string, vaultAddresses: string[]): void => {
  const knownVaults = getKnownVaultsOfEveryone()

  window.localStorage.setItem('known-vaults', JSON.stringify({
    ...knownVaults,
    [getCanonicalAddress(memberAddress)]: vaultAddresses.map(va => getCanonicalAddress(va)),
  }))
}

export default setKnownVaults
