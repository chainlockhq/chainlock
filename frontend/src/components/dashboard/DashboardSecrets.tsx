import Wallet from "../../objects/Wallet.interface"
import storeSecret from "../../utils/contracts/storeSecret"
import DashboardAddNewButton from "./DashboardAddNewButton"
import DashboardModal from "./DashboardModal"
import DashboardReloadButton from "./DashboardReloadButton"
import DashboardSecretsTable from "./DashboardSecretsTable"
import Secret from "../../objects/Secret.interface"
import { BigNumber } from "ethers"

interface Props {
  wallet: Wallet
  vaultAddress: string
  vaultKeyPair: CryptoKeyPair,
  secrets: Secret[]
  onSecretCreated?: (secretId: BigNumber) => void,
}

const DashboardSecrets = ({ wallet, vaultAddress, vaultKeyPair, secrets, onSecretCreated }: Props) => {

  const handleSaveSecret = async (label: string, username: string, password: string) => {
    const secretId = await storeSecret(wallet, vaultAddress, vaultKeyPair, label, username, password)
    onSecretCreated && onSecretCreated(secretId)
  }

  return (
    <div className="bg-[#2b3f4a] h-screen p-20">
      <div className="flex justify-end">
        <DashboardAddNewButton/>
        <DashboardReloadButton/>
      </div>
      <DashboardModal
        onSave={handleSaveSecret}
      />
      <DashboardSecretsTable secrets={secrets} />
    </div>
  )
}

export default DashboardSecrets
