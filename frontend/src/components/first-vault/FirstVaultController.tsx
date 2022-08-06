import { useState } from "react"
import Wallet from "../../objects/Wallet.interface"
import getVaultFactoryContract from "../../utils/contracts/getVaultFactoryContract"
import exportPrivateKeyBase64 from "../../utils/crypto/exportPrivateKeyBase64"
import exportPublicKeyBase64 from "../../utils/crypto/exportPublicKeyBase64"
import lock from "../../utils/hooks/lock"
import getTransactionUrl from "../../utils/urls/get-transaction-url"
import FirstVaultCreated from "./FirstVaultCreated"
import FirstVaultCreationError from "./FirstVaultCreationError"
import FirstVaultCreationInProgress from "./FirstVaultCreationInProgress"
import FirstVaultJoined from "./FirstVaultJoined"
import FirstVaultJoiningError from "./FirstVaultJoiningError"
import FirstVaultJoiningInProgress from "./FirstVaultJoiningInProgress"
import FirstVaultLanding from "./FirstVaultLanding"

interface Props {
  wallet: Wallet
  connectedAddress: string
}

const FirstVaultController = ({ wallet, connectedAddress }: Props) => {
  // TODO refactor as FSM, only real data is the vault address...
  const [creationInProgress, setCreationInProgress] = useState(false)
  const [createdVaultAddress, setCreatedVaultAddress] = useState<string>()
  const [creationFailed, setCreationFailed] = useState(false)
  const [joiningInProgress, setJoiningInProgress] = useState(false)
  const [joiningStatus, setJoiningStatus] = useState<boolean | null>(null)

  const resetToCreation = () => {
    setCreationInProgress(false)
    setCreatedVaultAddress(undefined)
    setCreationFailed(false)
    setJoiningInProgress(false)
    setJoiningStatus(null)
  }

  const resetToJoining = () => {
    setJoiningInProgress(false)
    setJoiningStatus(null)
  }

  const createVault = () => {
    lock(setCreationInProgress, async () => {
      console.debug('creating new vault...')

      const provider = await wallet.getProvider()
      const network = await provider.getNetwork()
      console.debug('chain id:', network.chainId)
      // TODO compare with process.env.REACT_APP_CHAIN_ID
      // TODO ask to switch chains? https://soliditytips.com/articles/detect-switch-chain-metamask/

      // TODO handle situation where eth node is not available

      const signer = provider.getSigner()
      const vaultFactoryContract = getVaultFactoryContract()

      const tx = await vaultFactoryContract.connect(signer).createVault()
      console.debug(`contract creation transaction hash:`, tx.hash)

      const receipt = await tx.wait()
      console.debug('transaction status:', receipt.status)

      // TODO necessary?
      // status 1 means transaction successful, see: https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse
      if (receipt.status !== 1) {
        setCreationFailed(true)
        return
      }

      // TODO handle situation where vault factory contract does NOT exist - seems to still return receipt.status = 1

      // TODO below may fail => wrong contract / contract not deployed?
      console.log('receipt:', receipt)
      const [vaultAddress] = receipt.events[0].args

      console.debug(`vault created!`)
      console.debug(`address:`, vaultAddress)
      console.debug(`view transaction:`, getTransactionUrl(tx.hash))

      setCreatedVaultAddress(vaultAddress)
    }).catch(e => {
      console.error('failed to create vault:', e)
      setCreationFailed(true)
    })
  }

  const joinVault = () => {
    lock(setJoiningInProgress, async () => {
      console.debug('joining vault...')

      // generating fresh key pair
      console.debug('generating fresh key pair...')
      // TODO move to its own function
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

      // TODO
      setJoiningStatus(true)
    }).catch(e => {
      console.error('failed to join vault:', e)
      setJoiningStatus(false)
    })
  }

  if (creationInProgress) {
    return <FirstVaultCreationInProgress/>
  }

  if (joiningInProgress) {
    return <FirstVaultJoiningInProgress/>
  }

  if (creationFailed) {
    return <FirstVaultCreationError onReset={resetToCreation}/>
  }

  if (joiningStatus === false) {
    return <FirstVaultJoiningError onReset={resetToJoining}/>
  }

  if (joiningStatus === true) {
    return <FirstVaultJoined/>
  }

  if (!createdVaultAddress) {
    return <FirstVaultLanding onClick={createVault}/>
  }

  return <FirstVaultCreated vaultAddress={createdVaultAddress} onJoinVault={joinVault}/>

}

export default FirstVaultController
