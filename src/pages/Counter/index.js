import React from 'react'

import { ArrowIcon } from '../../components/Icons'

const Counter = (props) => {
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
        <div className='accordion-line accordion-line-inner'>
          <div className='accordion-line-title'>Счетчик BK g6</div>
          <div className='accordion-line-text'>
            <div className='accordion-line-text_item'>Дата поверки счетчика: 12.04. 2020</div>
          </div>
        </div>
        <div className='accordion-line accordion-line-inner'>
          <div className='accordion-line-title'>Счетчик GAllus</div>
          <div className='accordion-line-text'>
            <div className='accordion-line-text_item accordion-line-text--red'>Дата поверки счетчика: 12.04.2017</div>
          </div>
        </div>
        <div className='accordion-line accordion-line-inner'>
          <div className='accordion-line-title'>Котел Ariston</div>
          <div className='accordion-line-text'>
            <div className='accordion-line-text_item'>Заводской номер: 45-679</div>
          </div>
        </div>
        <div className='content-text-right'>
          <a className='content-link-uppercase' href='#'>Перейти к показаниям счетчика</a>
        </div>
      </div>
      <div className='content-default-wrapper'>
        <div className='media'>
          <div className='content-title-uppercase'>фотографии оборудования</div>
          <div className='media-wrapper'>
            <div className='media-item'><a href='#'><img src={require('../../images/image1.jpg')} /></a></div>
            <div className='media-item'><a href='#'><img src={require('../../images/image2.jpg')} /></a></div>
            <div className='media-item'><a href='#'><img src={require('../../images/image3.jpg')} /></a></div>
          </div>
        </div>
      </div>
      <div className='content-default-wrapper content-default-wrapper--inner'>
        <div className='content-title-uppercase'>дополнительная информация</div>
        <div className='l-two-cols'>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Разрядность</div>
            <div className='content-text-medium'>5-5</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Место установки на объекте</div>
            <div className='content-text-medium'>с. Муравлянка д57</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Предельная пропускная способность</div>
            <div className='content-text-medium'>6</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Инвентарный №</div>
            <div className='content-text-medium'>45324523</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Периодичность госпроверки</div>
            <div className='content-text-medium'>120</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Дата выпуска</div>
            <div className='content-text-medium'>11.12.2011</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Вес импульса</div>
            <div className='content-text-medium'>0,01</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Дополнительные сведения</div>
            <div className='content-text-medium'>...</div>
          </div>
        </div>
      </div>
      <div className='content-default-wrapper content-default-wrapper--inner'>
        <div className='content-title-uppercase'>Характеристики оборудования</div>
        <div className='l-two-cols'>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Разрядность</div>
            <div className='content-text-medium'>5-5</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Место установки на объекте</div>
            <div className='content-text-medium'>с. Муравлянка д57</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Предельная пропускная способность</div>
            <div className='content-text-medium'>6</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Инвентарный №</div>
            <div className='content-text-medium'>45324523</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Периодичность госпроверки</div>
            <div className='content-text-medium'>120</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Дата выпуска</div>
            <div className='content-text-medium'>11.12.2011</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Вес импульса</div>
            <div className='content-text-medium'>0,01</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Дополнительные сведения</div>
            <div className='content-text-medium'>...</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Counter
