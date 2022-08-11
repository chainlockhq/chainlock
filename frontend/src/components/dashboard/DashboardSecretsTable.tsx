import DashboardSecretsRow from "./DashboardSecretsRow"
import Secret from "../../objects/Secret.interface"

interface Props {
  secrets: Secret[]
  vaultKeyPair: CryptoKeyPair,
}

const DashboardSecretsTable = ({ secrets, vaultKeyPair }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center">
              <thead className="border-b bg-gray-800">
                <tr>
                  <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                    Label
                  </th>
                  <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                    UserName
                  </th>
                  <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                    Password
                  </th>
                </tr>
              </thead>
              <tbody>
                {secrets.map((secret, index) => {
                  return (
                    <DashboardSecretsRow
                      key={index}
                      index={index}
                      secret={secret}
                      vaultKeyPair={vaultKeyPair}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSecretsTable
