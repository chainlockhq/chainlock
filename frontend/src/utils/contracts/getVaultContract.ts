// TODO import from smartcontracts/artifacts folder?
import Vault from "../../smartcontracts/Vault.json"
import { Contract, ethers } from "ethers";
import isAddress from "../isAddress";

// TODO use typechain type?
const getVaultContract = (vaultAddress: string): Contract => {
  if (!isAddress(vaultAddress)) {
    throw new Error(`${vaultAddress} is not a valid contract address`)
  }

  // NOTE: signer not (yet) connected
  return new ethers.Contract(vaultAddress, Vault.abi)
}

export default getVaultContract;
