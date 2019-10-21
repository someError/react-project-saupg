import React from 'react'

import { ArrowIcon } from '../../components/Icons'

const ControlTariff = (props) => {
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
      <div className='content content--modified'>
        <div className='content-title'>Расшифровка начислений по тарифам</div>
        <div className='table-image'>
          <a href='#'><img src={require('../../images/table.png')} /></a>
          <div className='table-image-text'>Кликните по картинке, чтобы увеличить изображение.</div>
        </div>
      </div>
    </div>
  )
}

export default ControlTariff
