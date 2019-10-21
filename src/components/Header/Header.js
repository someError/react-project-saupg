import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

import { EnterIcon } from '../../components/Icons'

const Header = (props) => {
  return (
    <div className='header'>
      <div className='container header-wrapper'>
        <div className='header-logo'><img src={require('../../images/logo.svg')} alt='Мособгаз САУПГ' /></div>
        <div className='header-enter'>
          <Link to='/auth/logout'><EnterIcon />Выход</Link>
        </div>
      </div>
    </div>
  )
}

export default Header
