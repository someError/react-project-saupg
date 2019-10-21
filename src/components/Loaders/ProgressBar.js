import React from 'react'
import PropTypes from 'prop-types'

import './ProgressBar.css'

const ProgressBar = ({ progress, color, style, ...props }) => {
  const stl = {
    ...style,
    width: `${progress}%`,
    color
  }

  return <div className='progress-container'><div className='progress-bar' style={stl} /></div>
}

ProgressBar.propTypes = {
  color: PropTypes.string
}

export default ProgressBar
