import Address from "../_shared/atoms/Address"
import Frame from "../_shared/atoms/Frame"

interface Props {
  vaultAddress: string,
}

const FirstVaultCreated = ({ vaultAddress }: Props) => {
  return (
    <div className="bg-[#2b3f4a] h-full text-white text-center">
      <Frame>
        <p>Vault created!</p>
        <p>
          <Address named>{vaultAddress}</Address>
        </p>
      </Frame>
    </div>
  )
}

export default FirstVaultCreated
