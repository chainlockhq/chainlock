import { useState } from "react"
import Wallet from "../../objects/Wallet.interface"
import createVault from "../../utils/contracts/createVault"
import getVaultFactoryContract from "../../utils/contracts/getVaultFactoryContract"
import joinVault from "../../utils/contracts/joinVault"
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

  const onCreateVault = () => {
    lock(setCreationInProgress, async () => {
      const vaultAddress = await createVault(wallet)
      setCreatedVaultAddress(vaultAddress)
    }).catch(e => {
      console.error('onCreateVault failed:', e)
      setCreationFailed(true)
    })
  }

  const onJoinVault = () => {
    lock(setJoiningInProgress, async () => {
      await joinVault(wallet, connectedAddress)
      setJoiningStatus(true)
    }).catch(e => {
      console.error('onJoinVault failed:', e)
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
    return <FirstVaultLanding onClick={onCreateVault}/>
  }

  return <FirstVaultCreated vaultAddress={createdVaultAddress} onJoinVault={onJoinVault}/>

}

export default FirstVaultController
