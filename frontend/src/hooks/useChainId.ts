import { useEffect, useState } from "react"
import Wallet from "../objects/Wallet.interface"

const useChainId = (
  wallet: Wallet | undefined
): number | undefined => {
  const [chainId, setChainId] = useState<number>()

  // populate chain id when metamask loads
  useEffect(() => {
    if (wallet) {
      wallet.getChainId()
        .then(chainId => setChainId(chainId))
        .catch(e => console.error('error occurred when trying to read chain id:', e))
    }
  }, [wallet])
  
  // detect address changes
  useEffect(() => {
    if (wallet) {
      // NOTE: keep reference to function instance so it can be deregistered
      const listener = (chainId: number) => setChainId(chainId)

      wallet.onChainChange(listener)
  
      return () => wallet.removeChainChangeListener(listener)
    }

  }, [wallet])

  return chainId
}

export default useChainId
