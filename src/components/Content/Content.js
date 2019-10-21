import React from 'react'

import './Content.css'

import { CheckIcon } from '../../components/Icons'

const Content = (props) => {
  return <div>
    <div className='content'>
      <div className='content-title content-title--inner'>Контроль задолженности</div>
      <div className='content-text-default'>Номер договора 2-238/0-11</div>
      <div className='content-title'>Счетчик BK g6<sup>вкл</sup></div>
      <div className='content-title'>Контроль задолженности</div>
      <div className='content-sub-title content-sub-title--red'>Долг: 45 200 р. за 5 месяцев</div>
      <div className='l-two-cols content-text-two-cols'>
        <div className='l-two-cols-col'>начислено за период <span>9943,00 р.</span></div>
        <div className='l-two-cols-col'>оплачено <span>345,00 р.</span></div>
      </div>
      <div className='accordion-line accordion-line-inner'>
        <div className='accordion-line-title'>Счетчик BK g6</div>
        <div className='accordion-line-text'>
          <div className='accordion-line-text_item'>Заводской номер: 45679</div>
        </div>
      </div>
      <div className='accordion-line accordion-line-inner'>
        <div className='accordion-line-title'>Номер пломбы: 665565</div>
        <div className='accordion-line-text'>
          <div className='accordion-line-text_item'>Дата поверки: 21.01.2017</div>
        </div>
      </div>
      <div className='accordion-line accordion-line-inner'>
        <div className='accordion-line-title'>Последнее показание счетчика: 64352435</div>
        <div className='accordion-line-text'>
          <div className='accordion-line-text_item'>Дата показания: 21.01.2017</div>
        </div>
      </div>
      <div className='content-text-right'>
        <a className='content-link-uppercase' href='#'>Перейти к показаниям счетчика</a>
      </div>
    </div>
    <div className='content-default-wrapper'>
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
    <div className='content-default-wrapper'>
      <div className='l-text-list'>
        <div className='l-text-list-item'>
          <div className='content-text-uppercase'>категория газоснабжения</div>
          <div className='content-text-medium'>Отопление жилых помещений, газовая плита и газовый водонагр.</div>
        </div>
        <div className='l-text-list-item'>
          <div className='content-text-uppercase'>Адрес сновного подобъект (жил. часть дома)</div>
          <div className='content-text-medium'>Кв. 2 Шугарово д. Шоссейная ул. д.10</div>
        </div>
      </div>
    </div>
    <div className='content-default-wrapper'>
      <div className='l-three-cols content-text-three-cols'>
        <div className='l-three-cols-col'><span>Наличие прописанных</span></div>
        <div className='l-three-cols-col'><span className='check'>Коммунальная квартира</span></div>
        <div className='l-three-cols-col'><span>Ветеран ВОВ</span></div>
        <div className='l-three-cols-col'><span className='check'>Одинокий пенсионер</span></div>
        <div className='l-three-cols-col'><span>Переведен на новое ПО</span></div>
      </div>
    </div>
    <div className='content-default-wrapper'>
      <div className='content-text-center'>
        <button className='btn btn--modified'>Передать показания</button>
        <br />
        <a href='#' className='content-link-uppercase'>Отмена</a>
      </div>
    </div>
    <div className='content-default-wrapper'>
      <div className='content-text-center'>
        <div className='content-text-check'>
          <CheckIcon /> Показания переданы
        </div>
      </div>
    </div>
  </div>
}

export default Content
