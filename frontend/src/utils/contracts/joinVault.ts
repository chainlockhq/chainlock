import { EthEncryptedData } from "@metamask/eth-sig-util"
import Wallet from "../../objects/Wallet.interface"
import encryptedPrivateKeyToString from "../crypto/encryptedPrivateKeyToString"
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

  await joinWithVaultKeyPair(wallet, encryptedPrivateKeyBase64, publicKeyBase64, vaultAddress);
}

const joinWithVaultKeyPair = async (
  wallet: Wallet,
  encryptedPrivateKey: EthEncryptedData,
  publicKey: string,
  vaultAddress: string
): Promise<void> => {
  console.debug('joining vault with key pair...');

  // get provider and then signer from current wallet
  const provider = wallet.getProvider();
  // TODO deal with chain id?

  const signer = provider.getSigner()
  const vaultContract = await getVaultContract(wallet, vaultAddress);

  // convert ethEncryptedData to string
  const encryptedPrivateKeyStr = encryptedPrivateKeyToString(encryptedPrivateKey);
  
  // pass fresh keys to vault
  const tx = await vaultContract.connect(signer).joinVault(encryptedPrivateKeyStr, publicKey);
  console.debug(`join vault transaction hash:`, tx.hash)

  // wait on block confirmations
  const receipt = await tx.wait()

  // status 1 means transaction successful, see: https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse
  if (receipt.status !== 1) {
    throw new Error(`expected receipt status to be 1, but was: ${receipt.status}`)
  }

  console.debug('joined vault!');
}

export default joinVault
