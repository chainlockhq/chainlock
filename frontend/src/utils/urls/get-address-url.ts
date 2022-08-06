import isBlank from "../is-blank"
import isAddress from "../isAddress";

const getAddressUrl = (address: string) => {
  const urlTemplate = process.env.REACT_APP_BLOCK_EXPLORER_ADDRESS_URL
  if (isBlank(urlTemplate)) {
    throw new Error('env var REACT_APP_BLOCK_EXPLORER_ADDRESS_URL is blank');
  }

  if (!isAddress(address)) {
    throw new Error(`${address} is not a valid address`)
  }

  const bareAddress = address.length === 40 ? address : address.slice(2)

  return urlTemplate!.replaceAll('{}', bareAddress)
}

export default getAddressUrl
