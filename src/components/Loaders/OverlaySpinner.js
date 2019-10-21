import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Spinner from './Spinner'

import './OverlaySpinner.css'

class OverlaySpinner extends Component {
  componentDidMount () {
    if (this.props.relativeToParent) {
      this.parentNode = ReactDOM.findDOMNode(this).parentNode
      this.parentNode.style.setProperty('position', 'relative')
    }
  }

  componentWillUnmount () {
    if (this.parentNode) {
      this.parentNode.style.removeProperty('position')
    }
  }

  render () {
    const { backgroundColor } = this.props

    return (
      <div className='overlay-spinner' style={{ backgroundColor }}>
        <Spinner size={this.props.spinnerSize} />
      </div>
    )
  }
}

OverlaySpinner.defaultProps = {
  relativeToParent: true
}

OverlaySpinner.propTypes = {
  relativeToParent: PropTypes.bool,
  spinnerSize: PropTypes.number,
  backgroundColor: PropTypes.string
  // backgroundColor: PropTypes.string
}

export default OverlaySpinner
