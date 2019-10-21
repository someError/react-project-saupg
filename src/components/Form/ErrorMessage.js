import React from 'react'

import './ErrorMessage.css'

const ErrorMessage = ({ children }) => {
  return children ? <div className='form-error'>{ children }</div> : null
}

export default ErrorMessage
