import React from 'react'

import { storiesOf } from '@storybook/react'

import { Select, Input, InputDate, Label, TextArea } from '../src/components/Form'

storiesOf('Form elements', module)
  .add('Select', () => <Select><option>option 1</option><option>option 2</option><option>option 3</option></Select>)
  .add('Input', () => <div>
    <Input /><br /><br />
    <Input className='form_input--inner' />
  </div>)
  .add('Date input', () => <InputDate />)
  .add('Label', () => <Label>Label</Label>)
  .add('TextArea', () => <TextArea placeholder='...' />)
