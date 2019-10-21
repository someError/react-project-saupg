import React from 'react'

import { ArrowIcon } from '../../components/Icons'

const ControlDebt = (props) => {
  return (
    <div>
      <div className='head-line'>
        <div className='head-line-left'>
          <a className='btn-back'><ArrowIcon /> Назад</a>
        </div>
        <div className='head-line-right'>
          <div className='head-line_text-modified'>
            Солова Галина Валентиновна
            <span>700211007</span>
          </div>
        </div>
      </div>
      <div className='content'>
        <div className='content-title'>Контроль задолженности</div>
        <div className='content-sub-title content-sub-title--red'>Долг: 45 200 р. за 5 месяцев</div>
      </div>
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
      <div className='accordion-line'>
        <div className='accordion-line-title'>Контроль задолженности</div>
        <div className='accordion-line-text'>
          <div className='accordion-line-text_item accordion-line-text--red'>Долг: 5400 Р за 5 месяцев</div>
        </div>
        <ArrowIcon className='accordion-line-icon' />
      </div>
    </div>
  )
}

export default ControlDebt
