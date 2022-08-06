import Frame from "../_shared/atoms/Frame"

const FirstVaultInProgress = () => {
  return (
    <div className="bg-[#2b3f4a] h-full text-white text-center">
      <Frame>
        <p>Creating new Vault. Waiting for confirmation...</p>
      </Frame>
    </div>
  )
}

export default FirstVaultInProgress
