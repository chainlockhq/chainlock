import { useEffect, useState, Dispatch, SetStateAction } from "react"
import Wallet from "../objects/Wallet.interface"
import getKnownVaults from "../utils/local-storage/getKnownVaults"
import setKnownVaults from "../utils/local-storage/setKnownVaults"

const useVaultAddresses = (
  wallet: Wallet | undefined,
  address: string | undefined
): [string[], Dispatch<SetStateAction<string[]>>] => {
  const [vaultAddresses, setVaultAddresses] = useState<string[]>([])

  // read vault addresses from local storage
  useEffect(() => {
    if (wallet && address) {
      setVaultAddresses(getKnownVaults(address))
    }
  }, [wallet, address])

  // store vault addresses into local storage
  useEffect(() => {
    if (wallet && address) {
      setKnownVaults(address, vaultAddresses)
    }
  }, [wallet, address, vaultAddresses])

  return [vaultAddresses, setVaultAddresses]
}

export default useVaultAddresses
