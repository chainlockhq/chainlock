import { useEffect, useState, Dispatch, SetStateAction } from "react"
import Wallet from "../objects/Wallet.interface"

// TODO implement
const useVaultAddresses = (
  wallet: Wallet | undefined,
  address: string | undefined
): [string[], Dispatch<SetStateAction<string[]>>] => {
  const [vaultAddresses, setVaultAddresses] = useState<string[]>([])

  // unset the vault addresses
  useEffect(() => {
    if (!wallet || !address) {
      setVaultAddresses([])
    }
  }, [wallet, address])

  return [vaultAddresses, setVaultAddresses]
}

export default useVaultAddresses
