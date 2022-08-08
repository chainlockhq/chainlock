import isAddress from "../isAddress";
import { Vault, Vault__factory } from "../../typechain";
import Wallet from "../../objects/Wallet.interface";

const getVaultContract = async (wallet: Wallet, vaultAddress: string): Promise<Vault> => {
  if (!isAddress(vaultAddress)) {
    throw new Error(`${vaultAddress} is not a valid contract address`)
  }

  // NOTE: signer not (yet) connected
  return Vault__factory.connect(vaultAddress, wallet.getProvider())
}

export default getVaultContract;
