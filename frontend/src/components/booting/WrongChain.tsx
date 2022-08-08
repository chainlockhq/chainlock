import Frame from "../_shared/atoms/Frame"

interface Props {
  currentChainId?: number,
  expectedChainId: number,
}

const WrongChain = ({ currentChainId, expectedChainId }: Props) => {
  return (
    <div className="bg-[#2b3f4a] text-white h-full text-center">
      <Frame>
        <p>Wrong chain!</p>
        <p>current chain id: <b>{currentChainId === undefined ? '<undefined>' : currentChainId}</b></p>
        <p>expected chain id: <b>{expectedChainId}</b></p>
      </Frame>
    </div>
  )
}

export default WrongChain
