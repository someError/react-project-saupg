import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './Icon.css'

const icon = (IconComponent) => {
  function iconWrap ({ size, color, width, className, style, ...props }) {
    const clsName = classnames('icon', className)

    if (typeof size === 'number') {
      size = `${size}px`
    }

    if (typeof width === 'number') {
      size = `${width}px`
    }

    const stl = {
      ...{ height: `${size}`, color, width },
      ...style
    }

    return (
      <span className={clsName} style={stl} {...props}>{ <IconComponent size={size} /> }</span>
    )
  }

  iconWrap.defaultProps = {
  }

  iconWrap.propTypes = {
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    color: PropTypes.string,
    className: PropTypes.string
  }

  return iconWrap
}

export default icon
