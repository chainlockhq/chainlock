import Address from "../_shared/atoms/Address"
import Button from "../_shared/atoms/Button"
import Frame from "../_shared/atoms/Frame"

interface Props {
  /**
   * The address of the vault that is being decrypted.
   */
  vaultAddress: string
  /**
   * This function is called whenever the user wants to go back to the previous screen.
   */
  onBack: () => void,
}

const WaitOnVaultPrivateKeyDecrypt = ({onBack, vaultAddress}: Props) => {
  return (
    <div className="bg-[#e8cd8e] h-full">
      <Frame size="xxl">
        <div>
          <div className="mb-20 text-small p-10 bg-white rounded-xl drop-shadow-lg">
            <div className="mb-6">
              <span className="font-light text-slate-500">You are</span> <Address named>{vaultAddress}</Address>
            </div>
            <p className="mt-2 mb-4">If you cannot see a Metamask dialog, click on the 🦊 icon in your browser.</p>
            <p className="text-small font-light text-slate-500">To go back to vault selection, cancel the decrypt request or click on the button below:</p>
            <p className="mt-2"><Button onClick={() =>onBack()}>back</Button></p>
          </div>
          <div className="faq m-auto max-w-default">
            <div className="text-center">
              </div>
              <div className="mt-2 md:mt-16">
                <div className="md:max-w-3xl m-auto">
                  <details className="border-b-2 border-[#2b3f4a]">
                    <summary className="p-4 text-gray-800 font-bold cursor-pointer pt-5 mb-1 text-lg focus:text-[#2b3f4a]"><span className="pl-6">Why do I have to decrypt anything with my wallet?</span></summary>
                      <p className="py-2 px-3 text-gray-600">
                        We store your passwords on-chain so you'll never lose them.
                        Of course we don't do that in plain text, because then everybody would be able to steal your passwords.
                        The only way to see your passwords is to decrypt them with your wallet. 
                      </p>
                  </details>
                  <details className="border-b-2 border-[#2b3f4a]">
                    <summary className="p-4 text-gray-800 font-bold cursor-pointer pt-5 mb-1 text-lg focus:text-[#2b3f4a]"><span className="pl-6">What's inside the encrypted message?</span></summary>
                    <p className="py-2 px-3 text-gray-600">
                      Metamask allows you to inspect the decrypted message before you pass it on to Chainlock.
                      It looks like gibberish but it is the <b>really important secret</b> that Chainlock needs
                      to manage your passwords. As a matter of fact, anyone with that secret can freely access
                      your passwords, so it is very important that you never share, copy, screenshot or record it.
                      Contrary to your recovery phrase, you don't need to back up the secret because Chainlock
                      stores it on-chain (encrypted by your wallet).
                    </p>
                  </details>
                  <details className="border-b-2 border-[#2b3f4a]">
                    <summary className="p-4 text-gray-800 font-bold cursor-pointer pt-5 mb-1 text-lg focus:text-[#2b3f4a]"><span className="pl-6">Does Chainlock know my recovery phrase?</span></summary>
                    <p className="py-2 px-3 text-gray-600">
                      Definitely no. Metamask never shares your seed phrase, recorvery phrase or private key with anyone, including us.
                      We ask Metamask to encrypt/decrypt your passwords with your wallet key pair,
                      but it is impossible for us to access your private key.
                    </p>
                  </details>
                  <details className="border-b-2 border-[#2b3f4a]">
                    <summary className="p-4 text-gray-800 font-bold cursor-pointer pt-5 mb-1 text-lg focus:text-[#2b3f4a]"><span className="pl-6">What if I lose my recovery phrase?</span></summary>
                    <p className="py-2 px-3 text-gray-600">
                      Prevent that at all costs. You'll lose all your coins, tokens, NFTs... in your wallet.
                      You will also lose access to all the passwords in your Chainlock vault(s).
                    </p>
                  </details>
              </div>
            </div>
        </div>
        </div>
      </Frame>
    </div>
  )
}

export default WaitOnVaultPrivateKeyDecrypt
