import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { storiesOf } from '@storybook/react'

import { Provider } from 'react-redux'

import store from '../src/redux/store'

import Layout from '../src/layouts'
import IndexPage from '../src/pages/Auth/index'
import FilterPage from '../src/pages/Filter'
import SearchResult from '../src/pages/SearchResult'
import ControlDebt from '../src/pages/ControlDebt'
import ControlMonth from '../src/pages/ControlMonth'
import ControlServices from '../src/pages/ControlServices'
import ControlCourt from '../src/pages/ControlCourt'
import ControlTariff from '../src/pages/ControlTariff'
import DeviceAbonent from '../src/pages/DeviceAbonent'
import Counter from '../src/pages/Counter'
import Contracts from '../src/pages/Contracts'
import ContractsInner from '../src/pages/ContractsInner'
import DataCharges from '../src/pages/DataСharges'
import Types from '../src/pages/Types'
import CounterInner from '../src/pages/CounterInner'
import MainPage from '../src/pages/Main'
import MainMenu from '../src/components/Navigation'

import path from './fixtures/breadcrumbs'

storiesOf('Pages', module)
  .addDecorator((story) => <div style={{ margin: '-20px' }}><Provider store={store}><Router>{story()}</Router></Provider></div>)
  .add('IndexPage', () => <IndexPage />)
  .add('FilterPage', () => <Layout contentBlockClassName='l-main-column--modified'><FilterPage /></Layout>)
  .add('SearchResult', () => <Layout hasSort contentBlockClassName='l-main-column--modified'><SearchResult /></Layout>)
  .add('ControlDebt', () => <Layout breadcrumbs={path}><ControlDebt /></Layout>)
  .add('ControlMonth', () => <Layout breadcrumbs={path}><ControlMonth /></Layout>)
  .add('ControlServices', () => <Layout breadcrumbs={path}><ControlServices /></Layout>)
  .add('ControlCourt', () => <Layout breadcrumbs={path}><ControlCourt /></Layout>)
  .add('ControlTariff', () => <Layout breadcrumbs={path}><ControlTariff /></Layout>)
  .add('Equipment', () => <Layout breadcrumbs={path}><DeviceAbonent /></Layout>)
  .add('Contracts', () => <Layout breadcrumbs={path}><Contracts /></Layout>)
  .add('ContractsInner', () => <Layout breadcrumbs={path}><ContractsInner /></Layout>)
  .add('DataСharges', () => <Layout breadcrumbs={path}><DataCharges /></Layout>)
  .add('Types', () => <Layout><Types /></Layout>)
  .add('Counter', () => <Layout breadcrumbs={path}><Counter /></Layout>)
  .add('CounterInner', () => <Layout breadcrumbs={path}><CounterInner /></Layout>)
  .add('MainPage', () => <MainPage />)
  .add('Menu', () => <MainMenu />)
