import React from 'react'

import './Checkbox.css'

const Checkbox = (props) => {
  const { className, label, id, ...otherProps } = props

  return (
    <span className='checkbox'><input id={id} type='checkbox' {...otherProps} /><label htmlFor={id}>{ label }</label></span>
  )
}

export default Checkbox
