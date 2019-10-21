import React from 'react'

import { ArrowIcon } from '../../components/Icons'

const DataCharges = (props) => {
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
        <div className='content-title'>Поставка газа физ. лицам</div>
      </div>
      <div className='content-default-wrapper content-default-wrapper--inner'>
        <div className='l-two-cols'>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Прописано</div>
            <div className='content-text-medium'>2</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Общая площадь</div>
            <div className='content-text-medium'>80 м</div>
          </div>
          <div className='l-two-cols-col'>
            <div className='content-text-uppercase'>Всего жителей</div>
            <div className='content-text-medium'>3</div>
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
        <div className='l-text-list'>
          <div className='l-text-list-item'>
            <div className='content-text-uppercase'>Фактически отапл. площадь от приборов мест. отопления:</div>
            <div className='content-text-medium'>60 м</div>
          </div>
          <div className='l-text-list-item'>
            <div className='content-text-uppercase'>жителей с учетом прибыших выбыших</div>
            <div className='content-text-medium'>30</div>
          </div>
        </div>
      </div>
      <div className='content-default-wrapper'>
        <div className='l-text-list'>
          <div className='l-text-list-item'>
            <div className='content-text-uppercase'>Обслуживающий РКЦ:</div>
            <div className='content-text-medium'>МУП городского округа Домодедово ЕРЦ ЖКХ</div>
          </div>
          <div className='l-text-list-item'>
            <div className='content-text-uppercase'>ЕИРЦ</div>
            <div className='content-text-medium'>МосОБЛЕИРЦ Ступино</div>
          </div>
          <div className='l-text-list-item'>
            <div className='content-text-uppercase'>Статус</div>
            <div className='content-text-medium'>Передан в ЕИРЦ</div>
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
    </div>
  )
}

export default DataCharges
