import { BigNumber } from "ethers"
import Wallet from "../../objects/Wallet.interface"
import getVaultContract from "./getVaultContract"

const getSecretIds = async (wallet: Wallet, vaultAddress: string): Promise<BigNumber[]> => {
  console.debug(`getting secret ids of member ${await wallet.getCurrentAddress()} from vault ${vaultAddress}...`)

  const provider = wallet.getProvider()
  const signer = provider.getSigner()
  const vaultContract = await getVaultContract(wallet, vaultAddress)
  
  const secretIds = await vaultContract.connect(signer).getOwnSecretIds()

  console.debug(`got secret ids of member ${await wallet.getCurrentAddress()} from vault ${vaultAddress}!`)
  
  return secretIds
}

export default getSecretIds
