import React from 'react'

import { formatDate } from '../../utils'

import './Comment.css'

const Comment = ({ date, text, document }) => {
  return (
    <div className='comment'>
      {
        date && (
          <div className='comment__title'>
            Комментарий от { formatDate(date, 'DD.MM.YYYY') }:
          </div>
        )
      }
      <div className='comment__text'>{ text }</div>

      {
        document
          ? <div className='comment__text'><b>Договор: </b>{ document.title }</div>
          : null
      }
    </div>
  )
}

export default Comment
