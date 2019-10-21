import React from 'react'

import { ArrowIcon } from '../../components/Icons'

const Types = (props) => {
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
        <div className='content-title'>Ввод показаний</div>
      </div>
      <div className='accordion-line'>
        <div className='accordion-line-title'>Счетчик BK g6</div>
        <div className='accordion-line-text'>
          <div className='accordion-line-text_item'>Заводской номер: 45679</div>
        </div>
        <ArrowIcon className='accordion-line-icon' />
      </div>
      <div className='accordion-line'>
        <div className='accordion-line-title'>Счетчик BK g6</div>
        <div className='accordion-line-text'>
          <div className='accordion-line-text_item'>Заводской номер: 45679</div>
        </div>
        <ArrowIcon className='accordion-line-icon' />
      </div>
    </div>
  )
}

export default Types
