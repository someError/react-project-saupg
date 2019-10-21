import React from 'react'

import { storiesOf } from '@storybook/react'

import { TableDebtServices } from '../src/components/TableDebtServices'

storiesOf('TableDebtServices', module)
  .add('TableDebtServices', () =>
    <TableDebtServices>
      <tr>
        <th>Дебет <br />входящий</th>
        <th>Кредит <br />входящий</th>
        <th>Начислено</th>
        <th>Оплачено</th>
        <th>Дебет <br />исходящий</th>
        <th>Кредит  <br />исходящий</th>
      </tr>
      <tr className='table-debt-services_title'>
        <td colSpan='6'>на прямых расчетах</td>
      </tr>
      <tr className='table-debt-services_column'>
        <td><b>02.2017</b></td>
        <td>-376,75р.</td>
        <td>0,00р.</td>
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
    </TableDebtServices>)