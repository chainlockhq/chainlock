import Wallet from "../../objects/Wallet.interface"
import getTransactionUrl from "../urls/get-transaction-url"
import getVaultFactoryContract from "./getVaultFactoryContract"

// NOTE: return vault address
const createVault = async (wallet: Wallet): Promise<string> => {
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
    throw new Error(`expected receipt status to be 1, but was: ${receipt.status}`)
  }

  // TODO handle situation where vault factory contract does NOT exist - seems to still return receipt.status = 1

  // TODO below may fail => wrong contract / contract not deployed?
  console.log('receipt:', receipt)
  const [vaultAddress] = receipt.events[0].args

  console.debug(`vault created!`)
  console.debug(`address:`, vaultAddress)
  console.debug(`view transaction:`, getTransactionUrl(tx.hash))

  return vaultAddress
}

export default createVault
