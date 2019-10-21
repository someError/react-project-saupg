import React from 'react'

import { storiesOf } from '@storybook/react'

import { ReviewIcon } from '../src/components/Icons'

import AccordionLine from '../src/components/AccordionLine'

storiesOf('AccordionLine', module)
  .add('AccordionLine', () => <AccordionLine title='Контроль задолженности'>
    <div className='text-red'>Долг: 5400 Р за 5 месяцев</div>
    <div>Счетчики: 2 <span className='text-red'>(истек срок поверки: 1)</span></div>
    <div>Договоры</div>
  </AccordionLine>)
  .add('DataChangeLine', () => <AccordionLine rightContent='Комарова О.Л.' onReview >
    <div>15:30</div>
    <div>20.05.2017</div>
    <div className='accordion-line__title'>Общая площадь</div>
  </AccordionLine>)
