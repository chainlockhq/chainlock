import { BigNumber, ethers } from "ethers"
import Secret from "../../objects/Secret.interface"
import Wallet from "../../objects/Wallet.interface"
import getVaultContract from "./getVaultContract"

const getSecret = async (wallet: Wallet, vaultAddress: string, secretId: BigNumber): Promise<Secret> => {
  console.debug(`getting secret #${secretId.toString()} of member ${await wallet.getCurrentAddress()} from vault ${vaultAddress}...`)

  const provider = wallet.getProvider()
  const signer = provider.getSigner()
  const vaultContract = await getVaultContract(wallet, vaultAddress)
  
  const [
    publicLabel,
    encryptedUsername,
    encryptedPassword,
  ] = await vaultContract.connect(signer).getSecret(secretId)

  console.debug(`got secret #${secretId.toString()} of member ${await wallet.getCurrentAddress()} from vault ${vaultAddress}!`)
  
  return {
    publicLabel,
    encryptedUsername,
    encryptedPassword,
  }
}

export default getSecret
