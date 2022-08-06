import { EthEncryptedData } from "@metamask/eth-sig-util";
import { ethers } from "ethers";

// MetaMask RPC docs: https://docs.metamask.io/guide/rpc-api.html#rpc-api
// Ethereum RPC docs: https://ethereum.github.io/execution-apis/api-documentation/
export default interface Wallet {

  /**
   * Request an address from the wallet.
   */
  requestAddressAccess(): Promise<string | undefined>

  /**
   * Get the address that's currently in use (if any).
   */
  getCurrentAddress(): Promise<string | undefined>

  /**
   * Register a function that will be called every time the current address changes.
   * Do not forget to unregister the function with {@link removeAddressChangeListener}
   * when it's no longer needed.
   * @param callback the function.
   */
  onAddressChange(callback: (newAddress: string | undefined) => void): void

  /**
   * Unregister a function that is being called every time the current address changes.
   * The function should've been registered first with {@link onAddressChange}.
   * @param callback the function. 
   */
  removeAddressChangeListener(callback: (newAddress: string | undefined) => void): void

  /**
   * Get from this wallet the public key of a given address (that can be used for encryption).
   * @param address the address for which the public key should be retrieved.
   */
  getPublicKeyBase64(address: string): Promise<string>;

  /**
   * Encrypt a message with a public key (obtained from {@link getPublicKeyBase64}).
   * The public key may come from an address that the current user controls, or from one of their peers.
   * @param publicKeyBase64 the public key, encoded in base64.
   * @param message the message that should be encrypted with the public key.
   */
  encryptWithPublicKey(publicKeyBase64: string, message: string): Promise<EthEncryptedData>;

  /**
   * Decrypt a message with this wallet.
   * @param address the address that should be used for decryption. Note that this address
   *                should belog to the current user, else the operation will fail.
   * @param encryptedData the data that should be decrypted.
   */
  decryptWithPrivateKey(address: string, encryptedData: EthEncryptedData): Promise<string>;

  /**
   * Get the ethers.js provider.
   */
  getProvider(): Promise<ethers.providers.JsonRpcProvider>;
  
}
