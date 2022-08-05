import { ENGINE_METHOD_CIPHERS } from "constants"
import Frame from "../atoms/Frame"
import FrameLogo from "../atoms/FrameLogo"
import FrameMessage from "../atoms/FrameMessage"
import Wallet from "../../objects/Wallet.interface"
import { ethers } from "ethers"
import { useState, useEffect } from "react"
import VaultFactory from "../../smartcontracts/VaultFactory.json"
import getTransactionUrl from "../../utils/urls/get-transaction-url"
import getAddressUrl from "../../utils/urls/get-address-url"

interface Props {
  wallet: Wallet
  connectedAddress: string
}

const FirstVault = ({ wallet, connectedAddress }: Props) => {
  const [currentAccount, setCurrentAccount] = useState("")
  const [correctNetwork, setCorrectNetwork] = useState(false)
  const [deployingStatus, setDeployingStatus] = useState(0)
  const [txHash, setTxHash] = useState("")
  const [vaultAddress, setVaultAddress] = useState<string>()

  const expectedChainId = process.env.REACT_APP_CHAIN_ID
  const vaultFactoryContractAddress = process.env.REACT_APP_VAULT_FACTORY_CONTRACT_ADDRESS

  // Checks if wallet is connected
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window
    if (ethereum) {
      console.log("Got the ethereum object: ", ethereum)
    } else {
      console.log("No Wallet found. Connect Wallet")
    }

    const accounts = await ethereum.request({ method: "eth_accounts" })

    if (accounts.length !== 0) {
      console.log("Found authorized Account: ", accounts[0])
      setCurrentAccount(accounts[0])
    } else {
      console.log("No authorized account found")
    }
  }

  // Checks if wallet is connected to the correct network
  const checkCorrectNetwork = async () => {
    const { ethereum } = window
    let chainId = await ethereum.request({ method: "eth_chainId" })
    console.log("Connected to chain:" + chainId)

    if (expectedChainId !== chainId) {
      setCorrectNetwork(false)
    } else {
      setCorrectNetwork(true)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
    checkCorrectNetwork()
  }, [])

  async function createVault() {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const factoryVaultContract = new ethers.Contract(vaultFactoryContractAddress!, VaultFactory.abi, signer)

        let newVaultTx = await factoryVaultContract.createVault()
        setTxHash(newVaultTx.hash)
        console.log("Creating New Vault....", newVaultTx.hash)
        setDeployingStatus(1)
        let receipt = await newVaultTx.wait()
        const event = receipt.events[0]
        const [creator, vaultAddress] = event.args
        setVaultAddress(vaultAddress)
        setDeployingStatus(2)
        console.log("New Vault created!", receipt)
        console.log(`See transaction: ${getTransactionUrl(newVaultTx.hash)}`)
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log("Error creating New Vault", error)
    }
  }

  if (deployingStatus === 1) {
    return (
      <div className="bg-[#2b3f4a] h-screen grid grid-flex grid-cols-3 gap-6">
        <div></div>
        <div className="text-white text-center">
          <Frame>
            <FrameMessage>
              <p>Creating the New Vault. Waiting for confirmation....</p>
            </FrameMessage>
          </Frame>
        </div>
        <div></div>
      </div>
    )
  }
  if (deployingStatus === 2) {
    const txUrl = getTransactionUrl(txHash)
    const vaultAddressUrl = getAddressUrl(vaultAddress!)
    return (
      <div className="bg-[#2b3f4a] h-screen grid grid-flex grid-cols-3 gap-6">
        <div></div>
        <div className="text-white text-center">
          <Frame>
            <FrameMessage>
              <p>New Vault created!</p>
              <p>
                See transaction:
                <a href={txUrl}>{txUrl}</a>
              </p>
              <p>
                New Vault Address:
                <a href={vaultAddressUrl}>{vaultAddressUrl}</a>
              </p>
            </FrameMessage>
          </Frame>
        </div>
        <div></div>
      </div>
    )
  }
  return (
    <div className="bg-[#2b3f4a] h-screen grid grid-flex grid-cols-3 gap-6">
      <div></div>
      <div className="text-white text-center">
        <Frame>
          <FrameMessage>
            <p className="text-5xl font-bold mb-6">Welcome</p>
            <p>Create your first vault</p>
            <button onClick={createVault} className="mt-14 bg-[#e8cd8e] text-[#333] py-3 px-10 rounded-xl">
              Create vault
            </button>
          </FrameMessage>
        </Frame>
      </div>
      <div></div>
    </div>
  )
}

export default FirstVault
