import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.css'
import moment from 'moment'
import 'moment/locale/ru'
import URLSearchParams from 'url-search-params'
import 'es6-promise/auto'
import store from 'store'
import expirePlugin from 'store/plugins/expire'

import App from './App'

moment.locale('ru')

store.addPlugin(expirePlugin)

if (!('URLSearchParams' in window)) {
  window.URLSearchParams = URLSearchParams
}

ReactDOM.render(<App />, document.getElementById('root'))
