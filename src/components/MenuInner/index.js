import React from 'react'
import { NavLink } from 'react-router-dom'
import intersection from 'lodash/intersection'

import './styles.css'

import { ApplicationMenu, OrgMenu, SearchMenu, EnterIcon } from '../../components/Icons'

const MenuInner = ({ user }) => {
  return (
    <div className='menu-inner'>
      <NavLink to='/abonents' className='menu-inner-item'><SearchMenu />Поиск по населению</NavLink>
      <NavLink to='/organizations' className='menu-inner-item'><OrgMenu />Предприятия и организации</NavLink>
      {/* <NavLink to='/' className='menu-inner-item'><FireMenu />Объекты газового хозяйства</NavLink> */}
      {/* <NavLink to='/' className='menu-inner-item'><CounterMenu />Расход газа</NavLink> */}
      {
        !intersection(['ROLE_WEBSAUPG_USER'], user.roles).length
          ? <NavLink to='/requests' className='menu-inner-item'><ApplicationMenu />Заявки на изменение информации</NavLink>
          : null
      }
      {/* <NavLink to='/' className='menu-inner-item'><TechMenu />Производственный технический отдел<span className='menu-inner-item_round'>6</span></NavLink> */}
      <div className='main-menu-bottom'>
        {/* <NavLink className='main-menu-item-inner main-menu-item-settings' to='/'><SettingsIcon /><span className='main-menu-item-inner_text'>Настройка района</span></NavLink> */}
        {/* <NavLink className='main-menu-item-inner main-menu-item-message' to='/'><MessageIcon /><span className='main-menu-item-inner_text'>Написать отзыв</span></NavLink> */}
        <NavLink className='main-menu-item-inner main-menu-item-exit' to='/'><EnterIcon /><span className='main-menu-item-inner_text'>Выход</span></NavLink>
      </div>
    </div>
  )
}

export default MenuInner
