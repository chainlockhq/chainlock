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
  const vaultFactoryContract = await getVaultFactoryContract(wallet)

  const tx = await vaultFactoryContract.connect(signer).createVault()
  console.debug(`contract creation transaction hash:`, tx.hash)

  // wait on block confirmations
  const receipt = await tx.wait()

  // status 1 means transaction successful, see: https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse
  if (receipt.status !== 1) {
    throw new Error(`expected receipt status to be 1, but was: ${receipt.status}`)
  }

  // verify that the transation resulted in exactly one event
  if (receipt.events?.length !== 1) {
    throw new Error(`expected receipt to contain exactly 1 event, got ${receipt.events?.length} events`)
  }

  // get the event
  const event = receipt.events[0]

  // verify that the event has args
  if (event.args === undefined) {
    throw new Error(`event does not have arguments`)
  }
  // verify that the event has exactly two args
  if (event.args.length !== 2) {
    throw new Error(`expected event to have exactly 2 args, got ${event.args.length} args`)
  }

  // get the event args
  const [signerAddress, vaultAddress] = event.args

  // sanity check
  if (signerAddress !== await signer.getAddress()) {
    throw new Error(`address of signer (${await signer.getAddress()}) and address in event (${signerAddress}) do not match`)
  }

  console.debug(`vault created!`)
  console.debug(`address:`, vaultAddress)
  console.debug(`view transaction:`, getTransactionUrl(tx.hash))

  return vaultAddress
}

export default createVault
