import OldFrame from "../_shared/atoms/OldFrame"
import FrameMessage from "../_shared/atoms/FrameMessage"
import Link from "../_shared/atoms/Link"

const InstallMetamask = () => {
  return (
    <div className="text-center bg-[#2b3f4a] h-screen grid grid-flex grid-cols-1 md:grid-cols-3 px-40">
      <div></div>
      <div>
      <OldFrame>
      <div>
        <p className="text-6xl">🦊</p>
      </div>
      <FrameMessage>
        <p className="text-2xl text-white font-semibold">Metamask does not seem to be installed in this browser.</p>
        <p className="text-slate-500">You can download it from <Link href="https://metamask.io">https://metamask.io</Link> and come back to this page when ready.</p>
      </FrameMessage>
    </OldFrame>
      </div>
      <div></div>
    </div>
  )
}

export default InstallMetamask
