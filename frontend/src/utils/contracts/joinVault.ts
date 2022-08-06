import { EthEncryptedData } from "@metamask/eth-sig-util"
import Wallet from "../../objects/Wallet.interface"
import exportPrivateKeyBase64 from "../crypto/exportPrivateKeyBase64"
import exportPublicKeyBase64 from "../crypto/exportPublicKeyBase64"
import generateKeyPair from "../crypto/generateKeyPair"
import getVaultContract from "./getVaultContract"

const joinVault = async (wallet: Wallet, connectedAddress: string, vaultAddress: string): Promise<void> => {
  console.debug('joining vault...')

  // generating fresh key pair
  console.debug('generating fresh key pair...')
  const kp = await generateKeyPair();
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

  joinWithVaultKeyPair(wallet, encryptedPrivateKeyBase64, publicKeyBase64, vaultAddress);
}
// this will accept the key pair from the smart contract
// need to serliaze as string to pass to contract
const joinWithVaultKeyPair = async (wallet: Wallet, privateKey: EthEncryptedData, publicKey: string, vaultAddress: string): Promise<void> => {
  console.debug('joining vault with key pair...');
  // get provider and then signer from current wallet
  const provider = await wallet.getProvider();
  const signer = provider.getSigner()
  const vaultContract = getVaultContract(vaultAddress);
  // convert ethEncryptedData to string
  const stringifiedPrivateKey = JSON.stringify(privateKey);
  console.log()
  // pass fresh keys to vault
  const tx = await vaultContract.connect(signer).joinVault(stringifiedPrivateKey, publicKey);

  console.log('Joined vault with key pair: ', tx);

  console.debug('vault joined!');
}

export default joinVault
