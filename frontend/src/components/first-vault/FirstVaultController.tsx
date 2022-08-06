import { useState } from "react"
import Wallet from "../../objects/Wallet.interface"
import getVaultFactoryContract from "../../utils/contracts/getVaultFactoryContract"
import lock from "../../utils/hooks/lock"
import getTransactionUrl from "../../utils/urls/get-transaction-url"
import FirstVaultCreated from "./FirstVaultCreated"
import FirstVaultCreationError from "./FirstVaultCreationError"
import FirstVaultInProgress from "./FirstVaultInProgress"
import FirstVaultLanding from "./FirstVaultLanding"

interface Props {
  wallet: Wallet
  connectedAddress: string
}

const FirstVaultController = ({ wallet, connectedAddress }: Props) => {
  const [creationInProgress, setCreationInProgress] = useState(false)
  const [createdVaultAddress, setCreatedVaultAddress] = useState<string>()
  const [creationFailed, setCreationFailed] = useState(false)

  const createVault = () => {
    lock(setCreationInProgress, async () => {
      console.debug('creating new vault...')

      const provider = await wallet.getProvider()
      const network = await provider.getNetwork()
      console.debug('chain id:', network.chainId)
      // TODO compare with process.env.REACT_APP_CHAIN_ID
      // TODO ask to switch chains? https://soliditytips.com/articles/detect-switch-chain-metamask/

      // TODO handle situation where eth node is not available

      const signer = provider.getSigner()
      const vaultFactoryContract = getVaultFactoryContract()

      const tx = await vaultFactoryContract.connect(signer).createVault()
      console.debug(`contract creation transaction hash:`, tx.hash)

      const receipt = await tx.wait()
      console.debug('transaction status:', receipt.status)

      // TODO necessary?
      // status 1 means transaction successful, see: https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse
      if (receipt.status !== 1) {
        setCreationFailed(true)
        return
      }

      // TODO handle situation where vault factory contract does NOT exist - seems to still return receipt.status = 1

      // TODO below may fail => wrong contract / contract not deployed?
      const [vaultAddress] = receipt.events[0].args

      console.debug(`vault created!`)
      console.debug(`address:`, vaultAddress)
      console.debug(`view transaction:`, getTransactionUrl(tx.hash))

      setCreatedVaultAddress(vaultAddress)
    }).catch(e => {
      console.error('failed to create vault:', e)
      setCreationFailed(true)
    })
  }

  if (creationInProgress) {
    return <FirstVaultInProgress/>
  }

  if (creationFailed) {
    return <FirstVaultCreationError/>
    // TODO button so we can go back to "FirstVaultLanding"
  }

  if (!createdVaultAddress) {
    return <FirstVaultLanding onClick={createVault}/>
  }

  return <FirstVaultCreated vaultAddress={createdVaultAddress}/>

}

export default FirstVaultController
