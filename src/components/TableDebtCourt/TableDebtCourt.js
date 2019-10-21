import React from 'react'

import './TableDebtCourt.css'

import { ArrowIcon } from '../../components/Icons'

const TableDebtCourt = (props) => {
  return <div>
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
}

export default TableDebtCourt
