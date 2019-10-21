import React, { Component } from 'react'
import './CardUser.css'

export default class CardOrg extends Component {
  constructor (props) {
    super(props)
    const { data } = this.props
    this.state = {
      userAdded: data.lkk_exists,
      showAddForm: false
    }
  }

  render () {
    const { title, code } = this.props

    return (
      <div className='card-user'>
        <div className='card-user__top'>
          <div className='card-user__info card-user__info--stretch'>
            <div className='card-user__info-account'>Код клиента: <span>{ code }</span></div>
            <div className='card-user__info-name'>{ title }</div>
            {/* <div className='card-user__info-name-dscr'>Статус абонента:</div> */}
          </div>
        </div>
      </div>
    )
  }
}
