import Wallet from "../../objects/Wallet.interface"
import isBlank from "../is-blank";
import getVaultContract from "./getVaultContract";

// TODO contains error somewhere
const getPublicKey = async (wallet: Wallet, vaultAddress: string, memberAddress: string): Promise<string> => {
  console.debug(`getting public key of address ${memberAddress} from vault ${vaultAddress}...`)

  const provider = wallet.getProvider();
  const network = await provider.getNetwork()
  console.debug('chain id:', network.chainId)
  // TODO deal with chain id?

  const vaultContract = await getVaultContract(wallet, vaultAddress)

  const signer = provider.getSigner();

  const publicKey = await vaultContract.connect(signer).getPublicKey(memberAddress)
  if (isBlank(publicKey)) {
    throw new Error(`public key for address ${memberAddress} in ${vaultAddress} is blank`)
  }

  console.debug(`public key of address ${memberAddress} is ${publicKey}`)

  return publicKey
}

export default getPublicKey
