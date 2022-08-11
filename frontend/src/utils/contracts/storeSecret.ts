import { BigNumber } from "ethers"
import Wallet from "../../objects/Wallet.interface"
import encryptData from "../crypto/encryptData"
import getTransactionUrl from "../urls/get-transaction-url"
import getVaultContract from "./getVaultContract"

// NOTE: this function calls encryptPassword, so we cannot forget it
const storeSecret = async (
  wallet: Wallet,
  vaultAddress: string,
  vaultKeyPair: CryptoKeyPair,
  label: string,
  username: string,
  password: string
): Promise<BigNumber> => {
  console.debug('encrypting data...')
  const encryptedUsername = await encryptData(vaultKeyPair, username)
  const encryptedPassword = await encryptData(vaultKeyPair, password)
  console.debug('encrypted data!')

  console.debug('storing secret...')

  // get provider, signer, vault contract
  const provider = wallet.getProvider()
  const signer = provider.getSigner()
  const vaultContract = await getVaultContract(wallet, vaultAddress)

  // call smart contract
  const tx = await vaultContract.connect(signer).storeSecret(label, encryptedUsername, encryptedPassword)
  console.debug(`store secret tx hash:`, tx.hash)

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
  const [signerAddress, secretId] = event.args

  // sanity check
  if (signerAddress !== await signer.getAddress()) {
    throw new Error(`address of signer (${await signer.getAddress()}) and address in event (${signerAddress}) do not match`)
  }

  console.debug(`secret stored!`)
  console.debug(`address:`, vaultAddress)
  console.debug(`secret id:`, secretId)
  console.debug(`view transaction:`, getTransactionUrl(tx.hash))

  return secretId
}

export default storeSecret
