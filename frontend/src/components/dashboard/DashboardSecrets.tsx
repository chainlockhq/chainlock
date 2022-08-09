import DashboardAddNewButton from "./DashboardAddNewButton"
import DashboardModal from "./DashboardModal"
import DashboardReloadButton from "./DashboardReloadButton"
import DashboardSecretsTable from "./DashboardSecretsTable"
import SecretType from "./SecretType"

interface Props {
  walletAddress: string
  vaultAddress: string
  secrets: SecretType[]
}

const DashboardSecrets = ({ walletAddress, vaultAddress, secrets }: Props) => {
  return (
    <div className="bg-[#2b3f4a] h-screen p-20">
      <div className="flex justify-end">
        <DashboardAddNewButton
          onAddNew={() => {
            // TODO:
            console.log("Add New clicked")
          }}
        />
        <DashboardReloadButton
          onReload={() => {
            // TODO:
            console.log("Reload clicked")
          }}
        />
      </div>
      <DashboardModal
        onSave={() => {
          // TODO:
          console.log("Save clicked")
        }}
      />
      <DashboardSecretsTable secrets={secrets} />
    </div>
  )
}

export default DashboardSecrets
