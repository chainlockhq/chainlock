import Secret from "../../objects/Secret.interface"

interface Props {
  index: number
  secret: Secret
}

const DashboardSecretsRow = ({ index, secret }: Props) => {
  console.log(index, secret)
  return (
    <tr className="bg-white border-b" id={index.toString()}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index}</td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{secret.publicLabel}</td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{'*'.repeat(10)}</td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{'*'.repeat(10)}</td>
    </tr>
  )
}

export default DashboardSecretsRow
