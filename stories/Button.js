import React from 'react'

import { storiesOf } from '@storybook/react'

import { Button } from '../src/components/Button'

storiesOf('Button', module)
  .add('with text', () => <Button>Войти</Button>)
  .add('Fill container', () => <Button className='btn--fill'>Войти</Button>)
