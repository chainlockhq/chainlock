import Button from "../_shared/atoms/Button"
import Frame from "../_shared/atoms/Frame"

interface Props {
  onReset: () => void
}

const FirstVaultJoiningError = ({ onReset }: Props) => {
  return (
    <div className="bg-[#2b3f4a] h-full text-white text-center">
      <Frame>
        <p>Something went wrong when adding you to the vault...</p>
        <Button onClick={onReset} className="mt-14 bg-[#e8cd8e] text-[#333] py-3 px-10 rounded-xl">start over</Button>
      </Frame>
    </div>
  )
}

export default FirstVaultJoiningError
