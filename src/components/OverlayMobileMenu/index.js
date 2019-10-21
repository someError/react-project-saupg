import React, { Component, Children } from 'react'
import Portal from 'react-portal'

import './OverlayMobileMenu.css'

class OverlayMobileMenu extends Component {
  constructor () {
    super()

    this.state = {
      opened: false
    }
  }

  componentDidUpdate () {
    if (this.state.opened) {
      document.body.classList.add('portal-opened')
    } else {
      document.body.classList.remove('portal-opened')
    }
  }

  componentWillUnmount () {
    document.body.classList.remove('portal-opened')
  }

  render () {
    const { button, children } = this.props

    return <Portal
      onOpen={(node) => {
        document.body.classList.add('portal-opened')
        setTimeout(() => {
          node.classList.add('opened')
        }, 1)
      }}
      beforeClose={(node, remove) => {
        document.body.classList.remove('portal-opened')
        node.classList.remove('opened')

        node.addEventListener('transitionend', () => {
          remove()
        })
      }}
      openByClickOn={button}
    >
      <Menu button={button}>{ children }</Menu>
    </Portal>
  }
}

export default OverlayMobileMenu

const Menu = ({ children, button, ...props }) => {
  return <div className='overlay-menu' onClick={props.closePortal}>
    <ul className='overlay-menu-list'>
      {
        Children.map(children, (child, i) => <li key={i}>{ React.cloneElement(child) }</li>)
      }
    </ul>

    { React.cloneElement(button, { style: { zIndex: 11 } }) }
  </div>
}
