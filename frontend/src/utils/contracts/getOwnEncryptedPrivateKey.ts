import { EthEncryptedData } from "@metamask/eth-sig-util"
import Wallet from "../../objects/Wallet.interface"

const getOwnEncryptedPrivateKey = async (wallet: Wallet): Promise<EthEncryptedData> => {
  // TODO json deserialize
  throw new Error('TODO implement')
}

export default getOwnEncryptedPrivateKey
