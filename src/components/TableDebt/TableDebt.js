import React from 'react'

import './TableDebt.css'

const TableDebt = (props) => {
  return <div>
    <div className='table-debt'>
      <table>
        <tbody>
          <tr>
            <th>Поставка газа</th>
            <th>Всего</th>
            <th>В т.ч. по счетч.</th>
            <th>По пп. 549</th>
          </tr>
          <tr>
            <td><b>Сальдо</b></td>
            <td>-376,75р.</td>
            <td>0,00р.</td>
            <td />
          </tr>
          <tr>
            <td><b>Начислено</b></td>
            <td>3424,65р.</td>
            <td>0,00р.</td>
            <td />
          </tr>
          <tr>
            <td><b>В т.ч. доначислено</b></td>
            <td>0,00р.</td>
            <td>0,00р.</td>
            <td />
          </tr>
          <tr>
            <td><b>Льгота</b></td>
            <td>0,00р.</td>
            <td>0,00р.</td>
            <td />
          </tr>
          <tr>
            <td><b>Оплачено</b></td>
            <td>3500,00р</td>
            <td>0,00р.</td>
            <td />
          </tr>
          <tr>
            <td><b>Сальдо</b></td>
            <td>-452,10р.</td>
            <td>0,00р.</td>
            <td />
          </tr>
        </tbody>
      </table>
    </div>
    <div className='table-debt'>
      <table>
        <tbody>
          <tr>
            <th>Техническое обслуживание</th>
            <th>Всего</th>
            <th />
            <th />
          </tr>
          <tr>
            <td><b>Сальдо</b></td>
            <td>0,00р.</td>
            <td />
            <td />
          </tr>
          <tr>
            <td><b>Начислено</b></td>
            <td>0,00р.</td>
            <td />
            <td />
          </tr>
          <tr>
            <td><b>Оплачено</b></td>
            <td>0,00р.</td>
            <td />
            <td />
          </tr>
          <tr>
            <td><b>Сальдо</b></td>
            <td>0,00р.</td>
            <td />
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
}

export default TableDebt
