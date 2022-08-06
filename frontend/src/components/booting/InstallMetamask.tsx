import Frame from "../_shared/atoms/Frame"
import Link from "../_shared/atoms/Link"

const InstallMetamask = () => {
  return (
    <div className="text-center bg-[#2b3f4a] h-full">
        <Frame>
          <div>
            <p className="text-6xl">🦊</p>
          </div>
          <p className="text-2xl text-white font-semibold pb-4">Metamask does not seem to be installed in this browser.</p>
          <p className="text-slate-500">You can download it from <Link href="https://metamask.io">metamask.io</Link> and come back to this page when ready.</p>
        </Frame>
    </div>
  )
}

export default InstallMetamask
