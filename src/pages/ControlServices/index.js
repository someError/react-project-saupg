import React from 'react'

import { ArrowIcon, SettingsIcon } from '../../components/Icons'
import { InputDate, Select } from '../../components/Form'

const ControlServices = (props) => {
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
        <div className='content-title'>Долги по услугам</div>
        <div className='l-two-cols l-two-cols-group-param'>
          <div className='l-two-cols-col'>
            <label className='label' htmlFor=''>обороты за период</label>
            <InputDate />
          </div>
          <div className='l-two-cols-col'>
            <label className='label' htmlFor='' />
            <InputDate />
          </div>
          <div className='l-two-cols-col'>
            <label className='label' htmlFor=''>Задолжность за период</label>
            <InputDate />
          </div>
          <div className='l-two-cols-col'>
            <label className='label' htmlFor='' />
            <InputDate />
          </div>
          <div className='l-two-cols-col'>
            <label className='label' htmlFor=''>Услуга</label>
            <Select className='select--modified'>
              <option value=''>Все филиалы</option>
              <option value=''>Все филиалы</option>
            </Select>
          </div>
        </div>
      </div>
      <div className='table-settings'>
        <a href='#'><SettingsIcon /> Настроить таблицу</a>
      </div>
      <div className='table-debt-services'>
        <table>
          <tbody>
            <tr>
              <th>Дебет <br />входящий</th>
              <th>Кредит <br />входящий</th>
              <th>Начислено</th>
              <th>Оплачено</th>
              <th>Дебет <br />исходящий</th>
              <th>Кредит <br />исходящий</th>
            </tr>
            <tr className='table-debt-services_title'>
              <td colSpan='6'>на прямых расчетах</td>
            </tr>
            <tr className='table-debt-services_column'>
              <td className='table-debt-services_column1'><b>02.2017</b></td>
              <td className='table-debt-services_column2'>-376,75р.</td>
              <td className='table-debt-services_column3'>0,00р.</td>
              <td className='table-debt-services_column4'>3424,65р.</td>
              <td className='table-debt-services_column5'>3500,00р.</td>
              <td className='table-debt-services_column6'>-376,75р.</td>
            </tr>
            <tr className='table-debt-services_title'>
              <td colSpan='6'>заявочный ремонт</td>
            </tr>
            <tr className='table-debt-services_column'>
              <td><b>02.2017</b></td>
              <td>-376,75р.</td>
              <td>0,00р.</td>
              <td>3424,65р.</td>
              <td>3500,00р.</td>
              <td>-376,75р.</td>
            </tr>
            <tr className='table-debt-services_title'>
              <td colSpan='6'>поставка и транспортировка газа</td>
            </tr>
            <tr className='table-debt-services_column'>
              <td><b>02.2017</b></td>
              <td>-376,75р.</td>
              <td>0,00р.</td>
              <td>3424,65р.</td>
              <td>3500,00р.</td>
              <td>-376,75р.</td>
            </tr>
            <tr className='table-debt-services_column'>
              <td><b>02.2017</b></td>
              <td>-376,75р.</td>
              <td>0,00р.</td>
              <td>3424,65р.</td>
              <td>3500,00р.</td>
              <td>-376,75р.</td>
            </tr>
            <tr className='table-debt-services_column'>
              <td><b>02.2017</b></td>
              <td>-376,75р.</td>
              <td>0,00р.</td>
              <td>3424,65р.</td>
              <td>3500,00р.</td>
              <td>-376,75р.</td>
            </tr>
            <tr className='table-debt-services_column'>
              <td><b>02.2017</b></td>
              <td>-376,75р.</td>
              <td>0,00р.</td>
              <td>3424,65р.</td>
              <td>3500,00р.</td>
              <td>-376,75р.</td>
            </tr>
            <tr className='table-debt-services_column'>
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

export default ControlServices
