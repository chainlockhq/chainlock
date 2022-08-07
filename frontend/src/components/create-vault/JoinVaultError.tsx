import Button from "../_shared/atoms/Button"
import Frame from "../_shared/atoms/Frame"

interface Props {
  onReset: () => void
}

const JoinVaultError = ({ onReset }: Props) => {
  return (
    <div className="bg-[#2b3f4a] h-full text-white text-center">
      <Frame>
        <p>Something went wrong when adding you to the vault...</p>
        <Button onClick={onReset} className="mt-14 bg-[#e8cd8e] text-[#333] py-3 px-10 rounded-xl">try joining again</Button>
      </Frame>
    </div>
  )
}

export default JoinVaultError
