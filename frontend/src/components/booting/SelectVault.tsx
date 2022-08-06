import Address from "../_shared/atoms/Address"
import Frame from "../_shared/atoms/Frame"

interface Props {
  address: string
  vaultAddresses: string[]
  onSelect?: (vaultAddress: string) => void
}

const CHOOSE_A_VAULT = 'Select vault'

const SelectVault = ({address, vaultAddresses, onSelect}: Props) => {
  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (onSelect) {
      onSelect(e.target.value)
    }
  }

  return (
    <div className="bg-[#2b3f4a] text-white h-full text-center">
      <Frame>
        <div>
          <p className="text-5xl mb">Hello 👋</p>
          <p className="text-2xl mt-6">Select the vault you want to use</p>
          <p className="mt-2 text-sm text-slate-300">Next, Metamask will ask you to decrypt the vault.</p>
        </div>
        <select
          className="mt-8 mb-4 bg-white text-black rounded-md px-2 py-1 min-w-[50%] max-w-full font-mono"
          defaultValue={CHOOSE_A_VAULT}
          onChange={onChange}
        >
          <option disabled={true}>{CHOOSE_A_VAULT}</option>
          {vaultAddresses.map(vaultAddress => (
            <option key={vaultAddress} value={vaultAddress}>
              <Address plainText={true} named={true}>{vaultAddress}</Address>
            </option>
          ))}
        </select>
        <div>
          <span className="text-slate-300">you are</span> <Address named>{address}</Address>
        </div>
      </Frame>
  </div>
  )
}

export default SelectVault
