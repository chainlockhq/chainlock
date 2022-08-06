import { EthEncryptedData } from "@metamask/eth-sig-util"

/**
 * type guard for {@link EthEncryptedData}
 */
const isEthEncryptedData = (obj: any): obj is EthEncryptedData => {
  for (const key of ['version', 'nonce', 'ephemPublicKey', 'ciphertext']) {
    if (!(key in obj && typeof obj[key] === "string")) {
      return false
    }
  }
  return true
}

const stringToEncryptedPrivateKey = (encryptedPrivateKeyStr: string): EthEncryptedData => {
  const data = JSON.parse(encryptedPrivateKeyStr)

  if (!isEthEncryptedData(data)) {
    throw new Error(`string ${encryptedPrivateKeyStr} does not represent an encrypted private key`)
  }

  return data
}

export default stringToEncryptedPrivateKey
