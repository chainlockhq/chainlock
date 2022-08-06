import { EthEncryptedData } from "@metamask/eth-sig-util"

const encryptedPrivateKeyToString = (encryptedPrivateKey: EthEncryptedData): string => {
  return JSON.stringify(encryptedPrivateKey)
}

export default encryptedPrivateKeyToString
