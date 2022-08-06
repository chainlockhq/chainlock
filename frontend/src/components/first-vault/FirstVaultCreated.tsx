import Address from "../_shared/atoms/Address"
import Button from "../_shared/atoms/Button"
import Frame from "../_shared/atoms/Frame"

interface Props {
  vaultAddress: string,
  onJoinVault: (vaultAddress: string) => void,
}

const FirstVaultCreated = ({ vaultAddress, onJoinVault }: Props) => {
  return (
    <div className="bg-[#2b3f4a] h-full text-white text-center">
      <Frame>
        <p>Vault created!</p>
        <p>
          <Address named>{vaultAddress}</Address>
        </p>
        <p>
          let's add you to the vault
        </p>
        <Button onClick={() => onJoinVault(vaultAddress)} className="mt-14 bg-[#e8cd8e] text-[#333] py-3 px-10 rounded-xl">join the vault</Button>
      </Frame>
    </div>
  )
}

export default FirstVaultCreated
