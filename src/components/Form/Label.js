import React from 'react'
import classnames from 'classnames'

import './Label.css'

const Label = ({ className, children, ...otherProps }) => {
  const clsName = classnames('label', className)

  return <label className={clsName} {...otherProps}>{ children }</label>
}

export default Label
