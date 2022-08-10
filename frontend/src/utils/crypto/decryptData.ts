import uglyArrayBufferToString from './ugly/uglyArrayBufferToString'
import uglyStringToArrayBuffer from './ugly/uglyStringToArrayBuffer'

// TODO may throw
const decryptData = async (vaultKeyPair: CryptoKeyPair, encryptedPassword: string): Promise<string> => {
  const dataAb: ArrayBuffer = await window.crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    vaultKeyPair.privateKey,
    uglyStringToArrayBuffer(encryptedPassword)
  )

  return uglyArrayBufferToString(dataAb)
}

export default decryptData
