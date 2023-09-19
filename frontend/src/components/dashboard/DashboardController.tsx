import Wallet from "../../objects/Wallet.interface"
import Header from "../_shared/molecules/Header"
import DashboardSecrets from "./DashboardSecrets"
import Secret from "../../objects/Secret.interface"
import { useEffect, useState } from "react"
import { BigNumber } from "ethers"
import getSecretIds from "../../utils/contracts/getSecretIds"
import getSecret from "../../utils/contracts/getSecret"

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
  const [loading, setLoading] = useState<boolean>(true)
  const [secretIds, setSecretIds] = useState<BigNumber[]>([])
  const [secrets, setSecrets] = useState<Secret[]>([])

  // get secret ids on load
  useEffect(() => {
    (async () => {
      if (wallet && address && vaultAddress && vaultKeyPair && loading) {
        const secretIds = await getSecretIds(wallet, vaultAddress)
        setSecretIds(secretIds)
        setLoading(false)
      }
    })()
  }, [wallet, address, vaultAddress, vaultKeyPair, secretIds, loading])

  // get secrets when secret ids change
  useEffect(() => {
    (async () => {
      if (wallet && address && vaultAddress && vaultKeyPair && secretIds.length > 0) {
        const secrets = await Promise.all(secretIds.map(secretId => getSecret(wallet, vaultAddress, secretId)))
        setSecrets(secrets)
      }
    })()
  }, [wallet, address, vaultAddress, vaultKeyPair, secretIds])

  const addSecretId = (secretId: BigNumber) => {
    setSecretIds([...secretIds, secretId])
  }

  return (
    <div>
      <Header
        walletAddress={address}
        onDisconnectWallet={disconnectWallet}
        vaultAddress={vaultAddress}
        onChangeVault={goToVaultSelect}
      />
      <DashboardSecrets
        wallet={wallet}
        vaultAddress={vaultAddress}
        vaultKeyPair={vaultKeyPair}
        secrets={secrets}
        onSecretCreated={addSecretId}
      />
    </div>
  )
}

export default DashboardController
