import Frame from "../_shared/atoms/Frame"

const FirstVaultCreationError = () => {
  return (
    <div className="bg-[#2b3f4a] h-full text-white text-center">
      <Frame>
        <p>Something went wrong when creating the vault...</p>
      </Frame>
    </div>
  )
}

export default FirstVaultCreationError
