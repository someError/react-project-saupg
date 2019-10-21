import React, { Component } from 'react'

import { Provider } from 'react-redux'

import Cabinet from './pages/Cabinet'
import IndexPage from './pages/Auth/index'

import store from './redux/store'

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import api from './api'
import ApiProvider from './components/ApiProvider/index'

api.init()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router basename='/front'>
          <ApiProvider api={api}>
            <Switch>
              <Route exact path='/auth' component={IndexPage} />
              <Route exact path='/auth/logout' render={() => {
                api.resetAuth()
                return <Redirect to='/auth' />
              }} />
              <Route path='/' component={Cabinet} />
              <Route render={() => <div>404</div>} />
            </Switch>
          </ApiProvider>
        </Router>
      </Provider>
    )
  }
}

export default App
