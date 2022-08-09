import Wallet from "../../objects/Wallet.interface"
import Header from "../_shared/molecules/Header"
import DashboardSecrets from "./DashboardSecrets"
import SecretType from "./SecretType"
import { useEffect, useState } from "react"

interface Props {
  wallet: Wallet
  address: string
  vaultAddress: string
  vaultKeyPair: CryptoKeyPair
  goToVaultSelect: () => void
  disconnectWallet: () => void
}

const DashboardController = ({
  wallet,
  address,
  vaultAddress,
  vaultKeyPair,
  goToVaultSelect,
  disconnectWallet,
}: Props) => {
  const [secrets, setSecrets] = useState<SecretType[]>([])
  useEffect(() => {
    if (wallet && address && vaultAddress && vaultKeyPair && secrets.length === 0) {
      // TODO: Call to the vault contract and read the secrets for current user
      // and delete this dummy secrets
      const dummySecrets: SecretType[] = []
      const secret1: SecretType = { identifier: "Twitter", userName: "Larry", encryptedPassword: "*********" }
      const secret2: SecretType = { identifier: "Instagram", userName: "John12345", encryptedPassword: "*********" }
      const secret3: SecretType = { identifier: "Whale Wallet", userName: "Vitalik", encryptedPassword: "*********" }
      dummySecrets.push(secret1, secret2, secret3)
      setSecrets(dummySecrets)
    }
  }, [wallet, address, vaultAddress, secrets, vaultKeyPair])

  return (
    <div>
      <Header
        walletAddress={address}
        onDisconnectWallet={disconnectWallet}
        vaultAddress={vaultAddress}
        onChangeVault={goToVaultSelect}
      />
      <DashboardSecrets walletAddress={address} vaultAddress={vaultAddress} secrets={secrets} />
    </div>
  )
}

export default DashboardController
