import React from 'react'

import './TableDebtMonth.css'

import { SettingsIcon } from '../../components/Icons'

const TableDebtMonth = (props) => {
  return <div>
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
            <th>Сальдо  исходящее</th>
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
}

export default TableDebtMonth
