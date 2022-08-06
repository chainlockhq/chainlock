import Frame from "../_shared/atoms/Frame"

interface Props {
  onClick: () => void,
}

const FirstVaultLanding = ({ onClick }: Props) => {
  return (
    <div className="bg-[#2b3f4a] h-full text-white text-center">
      <Frame>
        <p className="text-5xl font-bold mb-6">Welcome</p>
        <p>Create your first vault</p>
        <button onClick={onClick} className="mt-14 bg-[#e8cd8e] text-[#333] py-3 px-10 rounded-xl">
          Create vault
        </button>
      </Frame>
    </div>
  )
}

export default FirstVaultLanding
