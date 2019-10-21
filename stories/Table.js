import React from 'react'

import { storiesOf } from '@storybook/react'

import Table from '../src/components/Table'

storiesOf('Table', module)
  .add('Table', () =>
    <Table className='c-table--bordered-rows'>
      <tr className='c-table__row--head'>
        <th>Дебет <br />входящий</th>
        <th>Кредит <br />входящий</th>
        <th>Начислено</th>
        <th>Оплачено</th>
        <th>Дебет <br />исходящий</th>
        <th>Кредит <br />исходящий</th>
      </tr>
      <tr className='c-table__row--title text-medium'>
        <td colSpan='6'>на прямых расчетах</td>
      </tr>
      <tr>
        <td className='text-medium'>02.2017</td>
        <td>-376,75р.</td>
        <td>0,00р.</td>
        <td>3424,65р.</td>
        <td>3500,00р.</td>
        <td>-376,75р.</td>
      </tr>
      <tr className='c-table__row--title text-medium'>
        <td colSpan='6'>заявочный ремонт</td>
      </tr>
      <tr>
        <td className='text-medium'>02.2017</td>
        <td>-376,75р.</td>
        <td>0,00р.</td>
        <td>3424,65р.</td>
        <td>3500,00р.</td>
        <td>-376,75р.</td>
      </tr>
      <tr className='c-table__row--title text-medium'>
        <td colSpan='6'>поставка и транспортировка газа</td>
      </tr>
      <tr>
        <td className='text-medium'>02.2017</td>
        <td>-376,75р.</td>
        <td>0,00р.</td>
        <td>3424,65р.</td>
        <td>3500,00р.</td>
        <td>-376,75р.</td>
      </tr>
      <tr>
        <td className='text-medium'>02.2017</td>
        <td>-376,75р.</td>
        <td>0,00р.</td>
        <td>3424,65р.</td>
        <td>3500,00р.</td>
        <td>-376,75р.</td>
      </tr>
      <tr className='c-table__row--notify text-italic'>
        <td colSpan='6'>На модерации</td>
      </tr>
      <tr>
        <td className='text-medium'>02.2017</td>
        <td>-376,75р.</td>
        <td>0,00р.</td>
        <td>3424,65р.</td>
        <td>3500,00р.</td>
        <td>-376,75р.</td>
      </tr>
      <tr>
        <td className='text-medium'>02.2017</td>
        <td>-376,75р.</td>
        <td>0,00р.</td>
        <td>3424,65р.</td>
        <td>3500,00р.</td>
        <td>-376,75р.</td>
      </tr>
      <tr>
        <td className='text-medium'>02.2017</td>
        <td>-376,75р.</td>
        <td>0,00р.</td>
        <td>3424,65р.</td>
        <td>3500,00р.</td>
        <td>-376,75р.</td>
      </tr>
    </Table>)
  // .add('Table', () => <Table>
  //   <tr>
  //     <th>Дебет <br />входящий</th>
  //     <th>Кредит <br />входящий</th>
  //     <th>Начислено</th>
  //     <th>Оплачено</th>
  //     <th>Дебет <br />исходящий</th>
  //     <th>Кредит <br />исходящий</th>
  //   </tr>
  //   <tr>
  //     <td className='text-medium'>02.2017</td>
  //     <td>-376,75р.</td>
  //     <td>0,00р.</td>
  //     <td>3424,65р.</td>
  //     <td>3500,00р.</td>
  //     <td>-376,75р.</td>
  //   </tr>
  //   <tr>
  //     <td className='text-medium'>02.2017</td>
  //     <td>-376,75р.</td>
  //     <td>0,00р.</td>
  //     <td>3424,65р.</td>
  //     <td>3500,00р.</td>
  //     <td>-376,75р.</td>
  //   </tr>
  //   <tr>
  //     <td className='text-medium'>02.2017</td>
  //     <td>-376,75р.</td>
  //     <td>0,00р.</td>
  //     <td>3424,65р.</td>
  //     <td>3500,00р.</td>
  //     <td>-376,75р.</td>
  //   </tr>
  //   <tr>
  //     <td className='text-medium'>02.2017</td>
  //     <td>-376,75р.</td>
  //     <td>0,00р.</td>
  //     <td>3424,65р.</td>
  //     <td>3500,00р.</td>
  //     <td>-376,75р.</td>
  //   </tr>
  //   <tr>
  //     <td className='text-medium'>02.2017</td>
  //     <td>-376,75р.</td>
  //     <td>0,00р.</td>
  //     <td>3424,65р.</td>
  //     <td>3500,00р.</td>
  //     <td>-376,75р.</td>
  //   </tr>
  //   <tr>
  //     <td className='text-medium'>02.2017</td>
  //     <td>-376,75р.</td>
  //     <td>0,00р.</td>
  //     <td>3424,65р.</td>
  //     <td>3500,00р.</td>
  //     <td>-376,75р.</td>
  //   </tr>
  //   <tr>
  //     <td className='text-medium'>02.2017</td>
  //     <td>-376,75р.</td>
  //     <td>0,00р.</td>
  //     <td>3424,65р.</td>
  //     <td>3500,00р.</td>
  //     <td>-376,75р.</td>
  //   </tr>
  // </Table>)
