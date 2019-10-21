import React from 'react'
import classNames from 'classnames'

import './Input.css'

const Input = (props) => {
  const { className, onIconClick, number, onChange, ...otherProps } = props

  return (
    <div className='form-input-wrap'>
      <input
        className={classNames(`form_input`, className)}
        onChange={(e) => {
          if (number && isNaN(Number(e.target.value))) return
          onChange(e)
        }}
        {...otherProps} />
      {
        props.icon && <span className='form-input__icon' onClick={onIconClick}>
          { props.icon }
        </span>
      }
    </div>
  )
}

Input.defaultProps = {
  type: 'text'
}

export default Input
