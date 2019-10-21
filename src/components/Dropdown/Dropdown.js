import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './Dropdown.css'

import { ArrowBoldIcon } from '../../components/Icons'

class Dropdown extends PureComponent {
  constructor () {
    super()

    this.state = {
      show: false
    }

    this.toggle = this.toggle.bind(this)
    this.documentClickHandler = this.documentClickHandler.bind(this)
    this.stopMenuClickPropagation = this.stopMenuClickPropagation.bind(this)
  }

  toggle (e) {
    e.nativeEvent.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    this.setState({
      show: !this.state.show
    })
  }

  documentClickHandler () {
    if (this.state.show) {
      this.setState({
        show: false
      })
    }
  }

  stopMenuClickPropagation (e) {
    if (this.props.stopPropagation) {
      e.nativeEvent.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.documentClickHandler)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.documentClickHandler)
  }

  render () {
    const { title, children, label, className } = this.props
    const { show } = this.state

    const clsName = classnames('dropdown', className)

    return (
      <div className={clsName}>
        <span>{ label }</span> <span onClick={this.toggle} className='dropdown-toggle'>{ title } <ArrowBoldIcon size='0.4em' style={{ width: '10px' }} /></span>
        <div onClick={this.stopMenuClickPropagation} ref={(div) => { this.menu = div }} style={{ display: show ? 'block' : 'none' }} className='dropdown-menu'>
          <div className='dropdown-menu__wrapper'>
            { children }
          </div>
        </div>
      </div>
    )
  }
}

Dropdown.defaltProps = {
  stopPropagation: true
}

Dropdown.propTypes = {
  stopPropagation: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  label: PropTypes.string
}

export default Dropdown
