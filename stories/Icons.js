import React from 'react'

import { storiesOf } from '@storybook/react'

import { CalendarIcon, ArrowIcon, ArrowBoldIcon, CheckIcon, CloseIcon, EnterIcon, PhoneIcon, SettingsIcon } from '../src/components/Icons'

storiesOf('Icons', module)
  .add('Icons set', () => <div>
    <CalendarIcon size={'1rem'} />{' '}
    <br />
    <ArrowIcon size={'1rem'} />{' '}
    <br />
    <ArrowBoldIcon size={'1rem'} />{' '}
    <br />
    <CheckIcon size={'1rem'} />{' '}
    <br />
    <CloseIcon size={'1rem'} />{' '}
    <br />
    <EnterIcon size={'1rem'} />{' '}
    <br />
    <PhoneIcon size={'1rem'} />{' '}
    <br />
    <SettingsIcon size={'1rem'} />{' '}
  </div>
  )
