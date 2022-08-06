const generateKeyPair = async (): Promise<CryptoKeyPair> => {
  return window.crypto.subtle.generateKey({
    name: "RSA-OAEP",
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256"
  }, true, ["encrypt", "decrypt"])
}

export default generateKeyPair
