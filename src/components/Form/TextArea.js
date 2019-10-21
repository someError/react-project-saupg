import React from 'react'
import classnames from 'classnames'

import './TextArea.css'

const TextArea = (props) => {
  const { className, ...otherProps } = props

  return (
    <textarea className={classnames('text-area', className)} {...otherProps} />
  )
}

export default TextArea
