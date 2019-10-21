import React from 'react'

import { storiesOf } from '@storybook/react'

import TableImage from '../src/components/TableImage'

storiesOf('TableImage', module)
  .add('TableImage', () => <TableImage imageSrc={require('../src/images/table.png')} title='...' />)
