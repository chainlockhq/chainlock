import { useState } from "react"
import Wallet from "../../objects/Wallet.interface"
import createVault from "../../utils/contracts/createVault"
import joinVault from "../../utils/contracts/joinVault"
import FirstVaultCreated from "./FirstVaultCreated"
import FirstVaultCreationError from "./FirstVaultCreationError"
import FirstVaultCreationInProgress from "./FirstVaultCreationInProgress"
import FirstVaultJoined from "./FirstVaultJoined"
import FirstVaultJoiningError from "./FirstVaultJoiningError"
import FirstVaultJoiningInProgress from "./FirstVaultJoiningInProgress"
import FirstVaultLanding from "./FirstVaultLanding"

type Step = 'landing' | 'vault-creation-in-progress' | 'vault-creation-failed' | 'vault-creation-succeeded' |
            'vault-joining-in-progress' | 'vault-joining-failed' | 'vault-joining-succeeded'

interface Props {
  wallet: Wallet
  connectedAddress: string
  onVaultCreated?: (vaultAddress: string) => void
}

const FirstVaultController = ({ wallet, connectedAddress, onVaultCreated }: Props) => {
  const [step, setStep] = useState<Step>('landing')
  const [createdVaultAddress, setCreatedVaultAddress] = useState<string>()

  const resetToCreation = () => {
    setStep('landing')
    setCreatedVaultAddress(undefined)
  }

  const resetToJoining = () => {
    setStep('vault-creation-succeeded')
  }

  const onCreateVault = async () => {
    try {
      setStep('vault-creation-in-progress')
      const vaultAddress = await createVault(wallet)
      setCreatedVaultAddress(vaultAddress)
      setStep('vault-creation-succeeded')
    } catch(e) {
      console.error('onCreateVault failed:', e)
      setStep('vault-creation-failed')
    }
  }

  const onJoinVault = async (vaultAddress: string) => {
    try {
      setStep('vault-joining-in-progress')
      await joinVault(wallet, connectedAddress, vaultAddress)
      setStep('vault-joining-succeeded')
    } catch(e) {
      console.error('onJoinVault failed:', e)
      setStep('vault-joining-failed')
    }
  }

  const onContinue = async () => {
    if (onVaultCreated && createdVaultAddress) {
      onVaultCreated(createdVaultAddress)
    }
  }

  switch(step) {
    case 'landing':
      return <FirstVaultLanding onClick={onCreateVault}/>
    case 'vault-creation-in-progress':
      return <FirstVaultCreationInProgress/>
    case 'vault-creation-failed':
      return <FirstVaultCreationError onReset={resetToCreation}/>
    case 'vault-creation-succeeded':
      return <FirstVaultCreated vaultAddress={createdVaultAddress!} onJoinVault={onJoinVault}/>
    case 'vault-joining-in-progress':
      return <FirstVaultJoiningInProgress/>
    case 'vault-joining-failed':
      return <FirstVaultJoiningError onReset={resetToJoining}/>
    case 'vault-joining-succeeded':
      return <FirstVaultJoined onContinue={onContinue}/>
    default:
      throw new Error(`step '${step}' is not supported`)
  }
}

export default FirstVaultController
