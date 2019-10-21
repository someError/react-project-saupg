import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { EnterIcon } from '../../components/Icons'
import classNames from 'classnames'
import intersection from 'lodash/intersection'

import './MainMenu.css'

class MainMenu extends PureComponent {
  componentWillReceiveProps (nextProps) {
    if (nextProps.open) {
      document.body.classList.add('overflow')
    } else {
      document.body.classList.remove('overflow')
    }
    if (nextProps.location.pathname === '/') {
      document.body.classList.add('overflow--not-tablet')
    } else {
      document.body.classList.remove('overflow--not-tablet')
    }
  }

  render () {
    const { requests, open, location: {pathname}, user } = this.props
    return <div className={`main-menu-overlay ${classNames({'active': open, 'main-menu-overlay--static': pathname === '/'})}`}>
      <div className='main-menu-shade' onClick={this.props.onLayoutClick} />
      <div className='main-menu'>
        <ul className='main-menu-wrapper'>
          <li className='main-menu-item'><NavLink to='/abonents'>Поиск по населению</NavLink></li>
          <li className='main-menu-item'><NavLink to='/organizations'>Предприятия и организации</NavLink></li>
          {/* <li className='main-menu-item main-menu-item--mute'><NavLink to='/5'>Объекты газового хозяйства</NavLink></li> */}
          {/* <li className='main-menu-item'><NavLink to='/2'>Расход газа</NavLink></li> */}
          {/* <li className='main-menu-item'><NavLink to='/3'>Аварийные заявки</NavLink></li> */}
          {/* <li className='main-menu-item'><NavLink to='/4'>Производственный технический отдел</NavLink></li> */}
          {
            !intersection(['ROLE_WEBSAUPG_USER'], user.roles).length
              ? <li className='main-menu-item'><NavLink to='/requests'>Заявки на изменение информации{ requests.totalOpen ? <span className='main-menu-item_round'>{requests.totalOpen}</span> : null }</NavLink></li>
              : null
          }
        </ul>
        <div className='main-menu-bottom'>
          {/* <NavLink className='main-menu-item-inner main-menu-item-settings' to='/6'><SettingsIcon /><span className='main-menu-item-inner_text'>Настройка района</span></NavLink> */}
          {/* <NavLink className='main-menu-item-inner main-menu-item-message' to='/7'><MessageIcon /><span className='main-menu-item-inner_text'>Написать отзыв</span></NavLink> */}
          <NavLink className='main-menu-item-inner main-menu-item-exit' to='/auth/logout'><EnterIcon /><span className='main-menu-item-inner_text'>Выход</span></NavLink>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({ requests, user }) => {
  return {
    requests,
    user
  }
}

export default connect(mapStateToProps)(MainMenu)
