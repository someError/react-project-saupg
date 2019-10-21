import React from 'react'
import classNames from 'classnames'

import './Fab.css'

const Fab = ({ className, children, color, style, ...props }) => {
  const clsName = classNames('fab-btn', className)
  const stl = {
    ...style,
    backgroundColor: color
  }

  return <button className={clsName} {...props} style={stl}><span className='fab-btn__content'>{ children }</span></button>
}

export default Fab
