import uglyArrayBufferToString from "./ugly/uglyArrayBufferToString"

// TODO may throw
const encryptData = async (vaultKeyPair: CryptoKeyPair, password: string): Promise<string> => {
  const dataAb: ArrayBuffer = await window.crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    vaultKeyPair.publicKey,
    new TextEncoder().encode(password)
  )

  return uglyArrayBufferToString(dataAb)
}

export default encryptData
