import React from 'react'

import { ArrowIcon, SettingsIcon } from '../../components/Icons'
import { InputDate } from '../../components/Form'

const ControlMonth = (props) => {
  return (
    <div>
      <div className='head-line'>
        <div className='head-line-left'>
          <button className='btn-back'><ArrowIcon /> Назад</button>
        </div>
        <div className='head-line-right'>
          <div className='head-line_text-modified'>
            Солова Галина Валентиновна
            <span>700211007</span>
          </div>
        </div>
      </div>
      <div className='content content--modified'>
        <div className='content-title'>Контроль задолженности</div>
        <div className='l-two-cols l-two-cols--modified'>
          <div className='l-two-cols-col'>
            <label className='label' htmlFor=''>вывести платежи за период</label>
            <InputDate />
          </div>
          <div className='l-two-cols-col'>
            <label className='label' htmlFor='' />
            <InputDate />
          </div>
        </div>
      </div>
      <div className='table-settings'>
        <a href='#'><SettingsIcon /> Настроить таблицу</a>
      </div>
      <div className='table-debt-month'>
        <table>
          <tbody>
            <tr>
              <th>Месяц<br /> образования</th>
              <th>Сальдо <br /> входящее</th>
              <th>Факт. <br /> недоплата</th>
              <th>Начислено</th>
              <th>Оплачено</th>
              <th>Сальдо исходящее</th>
            </tr>
            <tr>
              <td><b>02.2017</b></td>
              <td>-376,75р.</td>
              <td>0,00р.</td>
              <td>3424,65р.</td>
              <td>3500,00р.</td>
              <td>-376,75р.</td>
            </tr>
            <tr>
              <td><b>02.2017</b></td>
              <td>-376,75р.</td>
              <td>0,00р.</td>
              <td>3424,65р.</td>
              <td>3500,00р.</td>
              <td>-376,75р.</td>
            </tr>
            <tr>
              <td><b>02.2017</b></td>
              <td>-376,75р.</td>
              <td>0,00р.</td>
              <td>3424,65р.</td>
              <td>3500,00р.</td>
              <td>-376,75р.</td>
            </tr>
            <tr>
              <td><b>02.2017</b></td>
              <td>-376,75р.</td>
              <td>0,00р.</td>
              <td>3424,65р.</td>
              <td>3500,00р.</td>
              <td>-376,75р.</td>
            </tr>
            <tr>
              <td><b>02.2017</b></td>
              <td>-376,75р.</td>
              <td>0,00р.</td>
              <td>3424,65р.</td>
              <td>3500,00р.</td>
              <td>-376,75р.</td>
            </tr>
            <tr>
              <td><b>02.2017</b></td>
              <td>-376,75р.</td>
              <td>0,00р.</td>
              <td>3424,65р.</td>
              <td>3500,00р.</td>
              <td>-376,75р.</td>
            </tr>
            <tr>
              <td><b>02.2017</b></td>
              <td>-376,75р.</td>
              <td>0,00р.</td>
              <td>3424,65р.</td>
              <td>3500,00р.</td>
              <td>-376,75р.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ControlMonth
