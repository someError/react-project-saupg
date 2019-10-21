import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import arrowIconBg from '../../images/icon-arrow.svg'

import './Select.css'

const Select = (props) => {
  const { className, children, disabled, ...selectProps } = props

  let styles = {
    backgroundImage: `url(${arrowIconBg})`
  }

  return (
    <div className={classnames('select', className, { disabled: disabled })} style={styles}>
      <select disabled={disabled} {...selectProps}>
        { children }
      </select>
    </div>
  )
}

Select.defaultProps = {
  disabled: false
}

Select.propTypes = {
  disabled: PropTypes.bool
}

export default Select
