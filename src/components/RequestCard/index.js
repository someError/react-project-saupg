import React from 'react'
import { NavLink } from 'react-router-dom'
import { formatDate, pluralize } from '../../utils'
import { ReviewIcon, DraftIcon } from '../../components/Icons'
import classNames from 'classnames'

import './RequestCard.css'

const RequestCard = (props) => {
  return (
    <NavLink className={`request-card ${classNames({'request-card--small': props.small})}`} to={props.detail} >
      <div>
        <div className='request-card__content'>
          <div className={`request-card__content-top ${classNames({'request-card__content-top--padding': props.status !== 'rejected'})}`}>
            {props.status === 'open' && <ReviewIcon color='#f04e23' className='request-card__icon' />}
            {props.status === 'draft' && <DraftIcon color='#8a8a8f' className='request-card__icon' />}
            <div className={`${classNames({'text-red': props.status !== 'draft'})}`}>{ props.totalFields } { pluralize(props.totalFields, 'изменение', 'изменения', 'изменений') }</div>
            <div className='request-card__author'>
              { props.author + ' — ' }
              <span>{ formatDate(props.date, 'DD.MM.YYYY') } в { formatDate(props.date, 'HH:mm') }</span>
            </div>
          </div>
          { props.children }
        </div>
      </div>
    </NavLink>
  )
}

export default RequestCard
