import isBlank from "../is-blank"

const getTransactionUrl = (transactionHash: string) => {
  const urlTemplate = process.env.REACT_APP_BLOCK_EXPLORER_TRANSACTION_URL
  if (isBlank(urlTemplate)) {
    throw new Error('env var REACT_APP_BLOCK_EXPLORER_TRANSACTION_URL is blank');
  }

  return urlTemplate!.replaceAll('{}', transactionHash)
}

export default getTransactionUrl
