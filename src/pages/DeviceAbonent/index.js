import React from 'react'

import { ArrowIcon } from '../../components/Icons'
import { Comment, CommentForm } from '../../components/Comment'

// TODO: Это дамповые данные, убрать при сборке
import comments from '../../../stories/fixtures/comments'

const DeviceAbonent = (props) => {
  return (
    <div>
      <div className='head-line'>
        <div className='head-line-left'>
          <button className='btn-back'><ArrowIcon /> Назад</button>
        </div>
        <div className='head-line-right'>
          <div className='head-line_text-modified'>Солова Галина Валентиновна
            <span>700211007</span>
          </div>
        </div>
      </div>
      <div className='content'>
        <div className='content-title'>Оборудование абонента</div>
      </div>
      <div className='accordion-line'>
        <div className='accordion-line-title'>Счетчик BK g6</div>
        <div className='accordion-line-text'>
          <div className='accordion-line-text_item'>Дата поверки счетчика: 12.04. 2020</div>
        </div>
        <ArrowIcon className='accordion-line-icon' />
      </div>
      <div className='accordion-line'>
        <div className='accordion-line-title'>Счетчик GAllus</div>
        <div className='accordion-line-text'>
          <div className='accordion-line-text_item accordion-line-text--red'>Дата поверки счетчика: 12.04.2017</div>
        </div>
        <ArrowIcon className='accordion-line-icon' />
      </div>
      <div className='accordion-line'>
        <div className='accordion-line-title'>Котел Ariston</div>
        <div className='accordion-line-text'>
          <div className='accordion-line-text_item'>Заводской номер: 45-679</div>
        </div>
        <ArrowIcon className='accordion-line-icon' />
      </div>
      <div className='comment'>
        <CommentForm />

        {
          comments.map((comment) => <Comment key={comment.id} {...comment} />)
        }
      </div>
    </div>
  )
}

export default DeviceAbonent
