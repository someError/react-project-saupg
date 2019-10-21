import React from 'react'
import { Link } from 'react-router-dom'

import './HeaderInner.css'
import MainMenu from '../Navigation'
import classNames from 'classnames'

import { EnterIcon, MenuIcon, CornerMenu } from '../../components/Icons'

export default class HeaderInner extends React.Component {
  constructor () {
    super()
    this.state = {
      menuOpen: false
    }
  }
  componentWillReceiveProps () {
    this.setState({menuOpen: false})
  }

  render () {
    const { location: { pathname } } = this.props
    return (
      <div>
        <div className='header header-inner'>
          <div className='container container-fluid header-wrapper'>
            <div className='header-inner-left'>
              <span className='header-inner-menu' onClick={() => {
                this.setState({menuOpen: !this.state.menuOpen})
              }}>
                <MenuIcon />
              </span>
              <div className='header-logo'><img src={require('../../images/logo.svg')} alt='Мособгаз САУПГ' /></div>
            </div>
            <div className='header-inner-right'>
              {/* <div className='header-inner-menu-item header-settings'><a href='#'><SettingsIcon />Настройка района</a></div>
              <div className='header-inner-menu-item header-feedback'><a href='#'><MessageIcon />Написать отзыв</a></div> */}
              <div className='header-inner-menu-item header-enter'>
                <Link to='/auth/logout'><EnterIcon />Выход</Link>
              </div>
              <span
                className={`header-inner__mobile-arrow ${classNames({ 'active': this.state.menuOpen, 'tablet-hidden': pathname === '/' })}`}
                onClick={() => {
                  this.setState({menuOpen: !this.state.menuOpen})
                }}>
                <CornerMenu />
              </span>
            </div>
          </div>
        </div>

        <MainMenu
          {...this.props}
          open={this.state.menuOpen}
          onLayoutClick={() => { this.setState({ menuOpen: false }) }}
        />
      </div>
    )
  }
}
