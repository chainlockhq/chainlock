import Wallet from "../../objects/Wallet.interface";
import { VaultFactory, VaultFactory__factory } from "../../typechain";
import isAddress from "../isAddress";

const getVaultFactoryContract = async (wallet: Wallet): Promise<VaultFactory> => {
  const address = process.env.REACT_APP_VAULT_FACTORY_CONTRACT_ADDRESS || ''
  if (!isAddress(address)) {
    throw new Error(`${address} is not a valid contract address`)
  }

  // NOTE: signer not (yet) connected
  return VaultFactory__factory.connect(address, wallet.getProvider())
}

export default getVaultFactoryContract;
