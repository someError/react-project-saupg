import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Spinner.css'

const Spinner = (props) => {
  let { size, color, width, absolute } = props

  size = size ? `${size}px` : null
  width = width ? `${width}px` : null

  return (
    <span className={classNames('spinner', { 'spinner--absolute': absolute })} style={{ width: size, height: size, borderColor: color, borderWidth: width }} />
  )
}

Spinner.defaultProps = {
}

Spinner.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string
}

export default Spinner
