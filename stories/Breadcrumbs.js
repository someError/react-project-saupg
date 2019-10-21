import React from 'react'

import { storiesOf } from '@storybook/react'

import { Breadcrumbs } from '../src/components/Breadcrumbs'

import path from './fixtures/breadcrumbs'

storiesOf('Breadcrumbs', module)
  .add('Breadcrumbs', () => <div><br /><br /><Breadcrumbs path={path} /></div>)
