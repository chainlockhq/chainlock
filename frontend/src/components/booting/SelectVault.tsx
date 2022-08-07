import Address from "../_shared/atoms/Address"
import Button from "../_shared/atoms/Button"
import Frame from "../_shared/atoms/Frame"

interface Props {
  address: string
  vaultAddresses: string[]
  onSelect?: (vaultAddress: string) => void
  onCreateVault?: () => void
}

const CHOOSE_A_VAULT = 'Select vault'

const SelectVault = ({address, vaultAddresses, onSelect, onCreateVault}: Props) => {
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
          <div>
            <div className="
              inline-flex
              w-2/5
              items-center
              before:content-['']
              before:border-b-2
              before:border-b-slate-600
              before:w-full
              before:mr-2
              after:content-['']
              after:border-b-2
              after:border-b-slate-600
              after:w-full
              after:ml-2
            ">or</div>
          </div>
          <Button onClick={onCreateVault}>create new vault</Button>
        </div>
        <div>
          <span className="text-slate-300">you are</span> <Address named>{address}</Address>
        </div>
      </Frame>
  </div>
  )
}

export default SelectVault
