import Wallet from "../../objects/Wallet.interface"
import exportPrivateKeyBase64 from "../crypto/exportPrivateKeyBase64"
import exportPublicKeyBase64 from "../crypto/exportPublicKeyBase64"

const joinVault = async (wallet: Wallet, connectedAddress: string): Promise<void> => {
  console.debug('joining vault...')

  // generating fresh key pair
  console.debug('generating fresh key pair...')
  // TODO move to its own function?
  const kp = await window.crypto.subtle.generateKey({
    name: "RSA-OAEP",
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256"
  }, true, ["encrypt", "decrypt"])
  console.debug('key pair generated!')

  const privateKeyBase64 = await exportPrivateKeyBase64(kp);
  const publicKeyBase64 = await exportPublicKeyBase64(kp);

  // encrypting private key with wallet
  console.debug('encrypting private key of key pair...')
  const encryptedPrivateKeyBase64 = await wallet.encryptWithPublicKey(
    await wallet.getPublicKeyBase64(connectedAddress), // encrypt with wallet
    privateKeyBase64 // the data
  )
  console.debug('private key of key pair encrypted with wallet!')

  // joining vault
  // TODO call Vault#joinVault with encryptedPrivateKeyBase64 and publicKeyBase64
  console.log(encryptedPrivateKeyBase64, publicKeyBase64)
}

export default joinVault
