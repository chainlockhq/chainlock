import { EthEncryptedData } from "@metamask/eth-sig-util"
import Wallet from "../../objects/Wallet.interface"
import stringToEncryptedPrivateKey from "../crypto/stringToEncryptedPrivateKey";
import isBlank from "../is-blank";
import getVaultContract from "./getVaultContract";

const getOwnEncryptedPrivateKey = async (wallet: Wallet, vaultAddress: string, memberAddress: string): Promise<EthEncryptedData> => {
  console.debug(`getting encrypted private key of address ${memberAddress} from vault ${vaultAddress}...`)

  const provider = await wallet.getProvider();
  const network = await provider.getNetwork()
  console.debug('chain id:', network.chainId)
  // TODO deal with chain id?

  const vaultContract = await getVaultContract(wallet, vaultAddress);

  const signer = provider.getSigner();

  const encryptedPrivateKeyStr = await vaultContract.connect(signer).getOwnEncryptedPrivateKey()
  if (isBlank(encryptedPrivateKeyStr)) {
    throw new Error(`public key for address ${memberAddress} in vault ${vaultAddress} is blank`)
  }

  console.debug(`retrieved encrypted private key of address ${memberAddress}`)

  return stringToEncryptedPrivateKey(encryptedPrivateKeyStr)
}

export default getOwnEncryptedPrivateKey
