import { encrypt, EthEncryptedData } from "@metamask/eth-sig-util";
import { ethers } from "ethers";
import { RawMetamask } from "../hooks/useRawMetamask";
import Ref from "./Ref";
import Wallet from "./Wallet.interface";

export default class MetamaskWallet implements Wallet {

  constructor(
    private mm: RawMetamask,
    private provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(mm)
  ) {}

  /**
   * Request an address from the wallet.
   */
  async requestAddressAccess(): Promise<string | undefined> {
    const r = await this.mm.request({ method: 'eth_requestAccounts' })
    return r.length <= 0 ? undefined : r[0]
  }

  /**
   * Get the address that's currently in use (if any).
   */
  async getCurrentAddress(): Promise<string | undefined> {
    const r = await this.mm.request({method: 'eth_accounts'})
    return r.length <= 0 ? undefined : r[0]
  }

  /**
   * Map the inner callbacks of {@link onAddressChange} and {@link removeAddressChangeListener}
   * to the outer callbacks that are passed to metamask,
   * so we can safely unregister "accountsChanged" event listeners.
   */
  private onAccountsChangedRefs = new Ref<
    (newAddress: string | undefined) => void,
    (r: string[]) => void
  >();

  /**
   * Register a function that will be called every time the current address changes.
   * Do not forget to unregister the function with {@link removeAddressChangeListener}
   * when it's no longer needed.
   * @param callback the function.
   */
  onAddressChange(innerCallback: (newAddress: string | undefined) => void): void {
    const outerCallback = (r: string[]) => {
      const newAddress = r.length <= 0 ? undefined : r[0]
      innerCallback(newAddress);
    }

    this.onAccountsChangedRefs.add(innerCallback, outerCallback);

    this.mm.on('accountsChanged', outerCallback)
  }

  /**
   * Unregister a function that is being called every time the current address changes.
   * The function should've been registered first with {@link onAddressChange}.
   * @param callback the function. 
   */
  removeAddressChangeListener(innerCallback: (newAddress: string | undefined) => void): void {
    const outerCallback = this.onAccountsChangedRefs.getAndRemove(innerCallback);

    if (outerCallback !== undefined) {
      this.mm.removeListener('accountsChanged', outerCallback);
    }
  }

  /**
   * Get from this wallet the public key of a given address (that can be used for encryption).
   * @param address the address for which the public key should be retrieved.
   */
  async getPublicKeyBase64(address: string): Promise<string> {
    return await this.mm.request({
      method: 'eth_getEncryptionPublicKey',
      params: [address]
    })
  }

  /**
   * Encrypt a message with a public key (obtained from {@link getPublicKeyBase64}).
   * The public key may come from an address that the current user controls, or from one of their peers.
   * @param publicKeyBase64 the public key, encoded in base64.
   * @param message the message that should be encrypted with the public key.
   */
  async encryptWithPublicKey(publicKeyBase64: string, message: string): Promise<EthEncryptedData> {
    const encryptedData = encrypt({
      publicKey: publicKeyBase64,
      data: message,
      version: 'x25519-xsalsa20-poly1305'
    })
    return Promise.resolve(encryptedData);
  }

  /**
   * Convert {@link EthEncryptedData} to something that the "eth_decrypt" RPC method can understand.
   */
  private encryptedDataToHexString(encryptedData: EthEncryptedData): string {
    return `0x${Buffer.from(JSON.stringify(encryptedData), 'utf8').toString('hex')}`;
  }

  /**
   * Decrypt a message with this wallet.
   * @param address the address that should be used for decryption. Note that this address
   *                should belog to the current user, else the operation will fail.
   * @param encryptedData the data that should be decrypted.
   */
  async decryptWithPrivateKey(address: string, encryptedData: EthEncryptedData): Promise<string> {
    const message = await this.mm.request({
      method: 'eth_decrypt',
      params: [
        this.encryptedDataToHexString(encryptedData),
        address
      ]
    })
    return Promise.resolve(message);
  }

  /**
   * Get the ethers.js provider.
   */
  getProvider(): ethers.providers.JsonRpcProvider {
    return this.provider
  };

  getMetamaskObj(): RawMetamask {
    return this.mm;
  }
  
}
