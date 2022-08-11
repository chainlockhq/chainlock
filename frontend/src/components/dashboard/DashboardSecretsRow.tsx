import { useEffect, useState } from "react"
import useCopyToClipboard from "../../hooks/useCopyToClipboard"
import Secret from "../../objects/Secret.interface"
import decryptData from "../../utils/crypto/decryptData"
import SecretData from "../_shared/atoms/SecretData"

interface ShownProps {
  showCopied: boolean
  onClick: () => void
  getData: () => Promise<string>
}

const Shown = ({ showCopied, onClick, getData }: ShownProps) => {
  const [data, setData] = useState<string>()

  useEffect(() => {
    if (data === undefined) {
      (async () => {
        setData(await getData())
      })()
    }
  }, [data, getData])

  return (
    <span
      className="hover:cursor-pointer"
      onClick={onClick}
    >
      {showCopied ? 'copied!' : data === undefined ? '...' : data}
    </span>
  )
}

interface HiddenProps {
  showCopied: boolean
  onClick: () => void
}

const Hidden = ({ showCopied, onClick }: HiddenProps) => {
  return (
    <span
      className="hover:cursor-pointer"
      onClick={onClick}
    >
      {showCopied ? 'copied!' : '*'.repeat(10)}
    </span>
  )
}

interface Props {
  vaultKeyPair: CryptoKeyPair
  index: number
  secret: Secret
}

const DashboardSecretsRow = ({ vaultKeyPair, index, secret }: Props) => {
  const [showUsernameCopied, copyUsernameToClipboard] = useCopyToClipboard()
  const [showPasswordCopied, copyPasswordToClipboard] = useCopyToClipboard()

  const handleUsernameClick = async () => {
    copyUsernameToClipboard(await decryptData(vaultKeyPair, secret.encryptedUsername))
  }

  const handlePasswordClick = async () => {
    copyPasswordToClipboard(await decryptData(vaultKeyPair, secret.encryptedPassword))
  }

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
        <SecretData
          shown={
            <Shown
              showCopied={showUsernameCopied}
              onClick={handleUsernameClick}
              getData={() => decryptData(vaultKeyPair, secret.encryptedUsername)}
            />
          }
          hidden={
            <Hidden
              showCopied={showUsernameCopied}
              onClick={handleUsernameClick}
            />
          }
        />
      </td>
      {/* password */}
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <SecretData
          shown={
            <Shown
              showCopied={showPasswordCopied}
              onClick={handlePasswordClick}
              getData={() => decryptData(vaultKeyPair, secret.encryptedPassword)}
            />
          }
          hidden={
            <Hidden
              showCopied={showPasswordCopied}
              onClick={handlePasswordClick}
            />
          }
        />
      </td>
    </tr>
  )
}

export default DashboardSecretsRow
