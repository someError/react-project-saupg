import React from 'react'

import { storiesOf } from '@storybook/react'

import { Comment, CommentForm } from '../src/components/Comment'

import comments from './fixtures/comments'

storiesOf('Comment', module)
  .add('Comment', () => <Comment {...comments[0]} />)
  .add('Form', () => <CommentForm />)
