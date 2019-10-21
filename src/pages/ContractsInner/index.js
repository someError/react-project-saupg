import React from 'react'

import { ArrowIcon } from '../../components/Icons'

const ContractsInner = (props) => {
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
        <div className='content-title content-title--inner'>Поставка газа физ. лицам</div>
        <div className='content-text-default'>Номер договора 2-238/0-11</div>
        <div className='content-text-right'>
          <a className='content-link-uppercase' href='#'>Скачать копию договора</a>
        </div>
      </div>
      <div className='content-default-wrapper'>
        <div className='l-two-cols'>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Услуга</div>
            <div className='content-text-medium'>На прямых расчетах</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Дата пролонгации</div>
            <div className='content-text-medium'>15.12.2016</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Список филиалов</div>
            <div className='content-text-medium'>Ступино(Частный список)</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Количество мес. пролонгаций</div>
            <div className='content-text-medium'>12</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Дата подписания</div>
            <div className='content-text-medium'>11.12.2015</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Ставка налога</div>
            <div className='content-text-medium'>15%</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Дата окончания</div>
            <div className='content-text-medium'>11.12.2015</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Дата ввода договора</div>
            <div className='content-text-medium'>11.12.2011</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractsInner
