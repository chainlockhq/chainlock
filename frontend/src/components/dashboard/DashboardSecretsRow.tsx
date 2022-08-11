import useCopyToClipboard from "../../hooks/useCopyToClipboard"
import Secret from "../../objects/Secret.interface"
import decryptData from "../../utils/crypto/decryptData"

interface Props {
  vaultKeyPair: CryptoKeyPair
  index: number
  secret: Secret
}

const DashboardSecretsRow = ({ vaultKeyPair, index, secret }: Props) => {
  const [showUsernameCopied, copyUsernameToClipboard] = useCopyToClipboard()
  const [showPasswordCopied, copyPasswordToClipboard] = useCopyToClipboard()

  return (
    <tr className="bg-white border-b" id={index.toString()}>
      {/* index */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index}
      </td>
      {/* label */}
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {secret.publicLabel}
      </td>
      {/* username */}
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <span
          className="hover:cursor-pointer"
          onClick={async e => copyUsernameToClipboard(await decryptData(vaultKeyPair, secret.encryptedUsername))}
        >
          {showUsernameCopied ? 'copied!' : '*'.repeat(10)}
        </span>
      </td>
      {/* password */}
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <span
          className="hover:cursor-pointer"
          onClick={async e => copyPasswordToClipboard(await decryptData(vaultKeyPair, secret.encryptedPassword))}
        >
          {showPasswordCopied ? 'copied!' : '*'.repeat(10)}
        </span>
      </td>
    </tr>
  )
}

export default DashboardSecretsRow
