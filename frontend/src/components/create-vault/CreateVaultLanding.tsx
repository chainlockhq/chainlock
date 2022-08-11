import Frame from "../_shared/atoms/Frame"

interface Props {
  onStart: () => void,
  onBack?: () => void,
}

const CreateVaultLanding = ({ onStart, onBack }: Props) => {
  return (
    <div className="bg-[#2b3f4a] h-full text-white text-center">
      <Frame>
        <p className="text-5xl font-bold mb-6">Welcome</p>
        <p>Create a new vault</p>
        {onBack && (
          <button onClick={onBack} className="mt-14 bg-slate-500 text-[#333] py-3 px-10 rounded-xl mr-4">
            Back
          </button>
        )}
        <button onClick={onStart} className="mt-14 bg-[#e8cd8e] text-[#333] py-3 px-10 rounded-xl">
          Create vault
        </button>
      </Frame>
    </div>
  )
}

export default CreateVaultLanding
