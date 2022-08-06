import { EthEncryptedData } from "@metamask/eth-sig-util"
import { useCallback, useEffect, useState } from "react"
import Wallet from "../objects/Wallet.interface"
import getOwnEncryptedPrivateKey from "../utils/contracts/getOwnEncryptedPrivateKey"
import getPublicKey from "../utils/contracts/getPublicKey"
import importPrivateKeyBase64 from "../utils/crypto/importPrivateKeyBase64"
import importPublicKeyBase64 from "../utils/crypto/importPublicKeyBase64"
import lock from "../utils/hooks/lock"

interface Options {
  onDialogSuccess?: () => void
  onDialogCancel?: () => void
}

interface Return {
  vaultKeyPair: CryptoKeyPair | undefined
  isDialogOpen: boolean
  isBusy: boolean
  hasErrored: boolean
  forgetVaultKeyPair: () => void
}

const useVaultKeyPair = (
  wallet: Wallet | undefined,
  address: string | undefined, 
  vaultAddress: string | undefined,
  options?: Options
): Return => {
  const [ vaultKeyPair, setVaultKeyPair ] = useState<CryptoKeyPair | undefined>()
  const [ isDialogOpen, setIsDialogOpen ] = useState<boolean>(false)
  const [ isBusy, setIsBusy] = useState<boolean>(false)
  const [ hasErrored, setHasErrored] = useState<boolean>(false)

  const resetState = () => {
    setVaultKeyPair(undefined)
    setIsDialogOpen(false)
    setIsBusy(false)
    setHasErrored(false)
  }

  const decryptDialog = useCallback(async (wallet: Wallet, address: string, encryptedVaultPrivateKey: EthEncryptedData) => {
    try {
      // signal dialog open
      setIsDialogOpen(true)

      const decryptedVaultPrivateKey = await wallet.decryptWithPrivateKey(address, encryptedVaultPrivateKey)
      
      // callback when user clicks on "decrypt"
      options?.onDialogSuccess && options.onDialogSuccess()

      return decryptedVaultPrivateKey
    } catch {
      // callback when user clicks on "cancel"
      options?.onDialogCancel && options.onDialogCancel()
    } finally {
      // signal dialog closed
      setIsDialogOpen(false)
    }
  }, [options])

  // set the vault key pair...
  useEffect(() => {
    if (wallet && address && vaultAddress && !isBusy &&!hasErrored && !vaultKeyPair) {
      lock(setIsBusy, async () => {
        // NOTE: This is the private key of the current user (address) in the given vault.
        //       It is stored in the vault smart contract in encrypted form because it has to stay private...
        //       The righful owner of this private key can decrypt it with metamask to get access to their vault private key.
        //       With the vault private key, they can unlock the passwords to which they have access.
        const encryptedVaultPrivateKey: EthEncryptedData = await getOwnEncryptedPrivateKey(wallet, vaultAddress, address)

        // decrypt the private vault key with metamask (prompt)
        const decryptedVaultPrivateKey = await decryptDialog(wallet, address, encryptedVaultPrivateKey)
        if (!decryptedVaultPrivateKey) {
          return // user cancelled decrypt request
        }
        
        // NOTE: This is the public key of the current user (address) in the given vault.
        //       It is stored in the smart contract in plain text, such that other users can share/encrypt passwords for this user.
        //       The current user should also encrypt with their public vault key any passwords it saves,
        //       such that it can retrieve the passwords at a later date with their private vault key.
        const decryptedVaultPublicKey = await getPublicKey(wallet, vaultAddress, address)
        
        setVaultKeyPair({
          privateKey: await importPrivateKeyBase64(decryptedVaultPrivateKey),
          publicKey: await importPublicKeyBase64(decryptedVaultPublicKey),
        })
      }).catch(e => {
        setHasErrored(true)
        throw e // rethrow
      })
    }
  }, [wallet, address, vaultAddress, isBusy, hasErrored, vaultKeyPair, decryptDialog])

  // unset the vault key pair...
  useEffect(() => {
    if (!wallet || !address || !vaultAddress) {
      resetState()
    }
  }, [wallet, address, vaultAddress])

  const forgetVaultKeyPair = useCallback(() => resetState(), [])

  return { vaultKeyPair, forgetVaultKeyPair, isDialogOpen, isBusy, hasErrored }
}

export default useVaultKeyPair
