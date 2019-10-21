import React from 'react'

import { storiesOf } from '@storybook/react'

import Avatar from '../src/components/Avatar'

storiesOf('Avatar', module)
  .add('Avatar', () => <Avatar className='card-user__photo' />)
