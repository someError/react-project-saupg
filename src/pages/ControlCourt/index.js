import React from 'react'

import { ArrowIcon } from '../../components/Icons'

const ControlCourt = (props) => {
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
        <div className='content-title'>Решения суда</div>
        <div className='l-two-cols l-two-cols--modified content-text-two-cols'>
          <div className='l-two-cols-col'>начислено за период <span>9943,00 р.</span></div>
          <div className='l-two-cols-col'>оплачено <span>345,00 р.</span></div>
        </div>
      </div>
      <div className='table-debt-court'>
        <table>
          <tbody>
            <tr>
              <th>Номер<br />решения</th>
              <th>Дата <br />решения</th>
              <th>Сумма <br />взыскания</th>
              <th>Гос. пошлина</th>
              <th />
            </tr>
            <tr>
              <td><b>2-238/0-11</b></td>
              <td>10.06.13</td>
              <td>3424,65р.</td>
              <td>200,00р.</td>
              <td><ArrowIcon className='table-debt-court-icon' /></td>
            </tr>
            <tr>
              <td><b>2-238/0-11</b></td>
              <td>10.06.13</td>
              <td>3424,65р.</td>
              <td>200,00р.</td>
              <td><ArrowIcon className='table-debt-court-icon' /></td>
            </tr>
            <tr>
              <td><b>2-238/0-11</b></td>
              <td>10.06.13</td>
              <td>3424,65р.</td>
              <td>200,00р.</td>
              <td><ArrowIcon className='table-debt-court-icon' /></td>
            </tr>
            <tr>
              <td><b>2-238/0-11</b></td>
              <td>10.06.13</td>
              <td>3424,65р.</td>
              <td>200,00р.</td>
              <td><ArrowIcon className='table-debt-court-icon' /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ControlCourt
