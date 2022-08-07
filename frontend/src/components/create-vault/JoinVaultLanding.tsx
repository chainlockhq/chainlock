import Button from "../_shared/atoms/Button"
import Frame from "../_shared/atoms/Frame"

interface Props {
  onContinue: () => void,
}

const JoinVaultLanding = ({ onContinue }: Props) => {
  return (
    <div className="bg-[#2b3f4a] h-full text-white text-center">
      <Frame>
        <p>You joined the vault!</p>
        <Button onClick={onContinue} className="mt-14 bg-[#e8cd8e] text-[#333] py-3 px-10 rounded-xl">continue</Button>
      </Frame>
    </div>
  )
}

export default JoinVaultLanding
