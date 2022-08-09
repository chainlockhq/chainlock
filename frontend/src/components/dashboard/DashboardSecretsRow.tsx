import SecretType from "./SecretType"

interface Props {
  index: number
  secret: SecretType
}

const DashboardSecretsRow = ({ index, secret }: Props) => {
  console.log(index, secret)
  return (
    <tr className="bg-white border-b" id={index.toString()}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index}</td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{secret.identifier}</td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{secret.username}</td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">*********</td>
    </tr>
  )
}

export default DashboardSecretsRow
