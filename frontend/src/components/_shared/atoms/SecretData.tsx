import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

interface Props {
  shown: React.ReactNode
  hidden: React.ReactNode
  isShownByDefault?: boolean
}

const SecretData = ({ shown, hidden, isShownByDefault = false }: Props) => {
  const [isShown, setIsShown] = useState(isShownByDefault)

  const show = () => {
    setIsShown(true)
  }

  const hide = () => {
    setIsShown(false)
  }

  return (
    <span>
      <span>{isShown ? shown : hidden}</span>
      <span
        onClick={() => isShown ? hide() : show()}
        className="ml-2 hover:cursor-pointer"
      >
        <FontAwesomeIcon icon={isShown ? faEyeSlash : faEye} />
      </span>
    </span>
  )
}

export default SecretData
