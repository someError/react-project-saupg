import React from 'react'

import { storiesOf } from '@storybook/react'

import { SearchResultCard } from '../src/components/SearchResultCard'

import result from './fixtures/searchResults'

storiesOf('SearchResult', module)
  .add('SearchResult', () => <SearchResultCard {...result[0]} />)
