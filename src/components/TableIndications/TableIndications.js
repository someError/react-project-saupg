import React from 'react'

import './TableIndications.css'

import { ArrowIcon } from '../../components/Icons'

const TableIndications = (props) => {
  return <div>
    <div className='table-indications table-without-border'>
      <div className='content-title-uppercase content-title-uppercase--inner'>Прошлые показания</div>
      <table>
        <tbody>
          <tr>
            <th>Посл. показание</th>
            <th>Дата ввода</th>
            <th>Расход</th>
            <th>Тип</th>
            <th>Служба ввода</th>
            <th />
          </tr>
          <tr className='table-indications--bg table-indications-status'>
            <td colSpan='6'>Ожидает модерацию</td>
          </tr>
          <tr className='table-indications--bg table-indications-col--modified'>
            <td><b>32546</b></td>
            <td>10.06.13</td>
            <td>3424,65р.</td>
            <td>Call-центр</td>
            <td>Идущее в реализацию</td>
            <td><ArrowIcon className='table-indications-icon' /></td>
          </tr>
          <tr>
            <td><b>32546</b></td>
            <td>10.06.13</td>
            <td>3424,65р.</td>
            <td>Call-центр</td>
            <td>Идущее в реализацию</td>
            <td><ArrowIcon className='table-indications-icon' /></td>
          </tr>
          <tr>
            <td><b>32546</b></td>
            <td>10.06.13</td>
            <td>3424,65р.</td>
            <td>Call-центр</td>
            <td>Идущее в реализацию</td>
            <td><ArrowIcon className='table-indications-icon' /></td>
          </tr>
          <tr>
            <td><b>32546</b></td>
            <td>10.06.13</td>
            <td>3424,65р.</td>
            <td>Call-центр</td>
            <td>Идущее в реализацию</td>
            <td><ArrowIcon className='table-indications-icon' /></td>
          </tr>
          <tr>
            <td><b>32546</b></td>
            <td>10.06.13</td>
            <td>3424,65р.</td>
            <td>Call-центр</td>
            <td>Идущее в реализацию</td>
            <td><ArrowIcon className='table-indications-icon' /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
}

export default TableIndications
