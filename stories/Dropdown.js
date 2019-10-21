import React from 'react'

import { storiesOf } from '@storybook/react'

import { Dropdown } from '../src/components/Dropdown'

storiesOf('Dropdown', module)
  .add('Dropdown', () => <Dropdown label='Сортировать по:' title='Алфавиту от А до Я'>хуй на руль</Dropdown>)
