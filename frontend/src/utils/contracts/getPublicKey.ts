import Wallet from "../../objects/Wallet.interface"
import getVaultContract from "./getVaultContract";

const getPublicKey = async (wallet: Wallet, vaultAddress: string, memberAddress: string): Promise<string> => {
  console.debug(`getting public key of address ${memberAddress} from vault ${vaultAddress}...`)

  const provider = await wallet.getProvider();
  const network = await provider.getNetwork()
  console.debug('chain id:', network.chainId)
  // TODO compare with process.env.REACT_APP_CHAIN_ID
  // TODO ask to switch chains? https://soliditytips.com/articles/detect-switch-chain-metamask/

  // TODO handle situation where eth node is not available

  const vaultContract = getVaultContract(vaultAddress);

  // TODO
  vaultContract.getPublicKey(vaultAddress)
  throw new Error('TODO implement')
}

export default getPublicKey
