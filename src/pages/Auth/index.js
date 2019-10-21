import React, { Component } from 'react'

import './index.css'

import { Input, Label, ErrorMessage } from '../../components/Form'
import { Button } from '../../components/Button'

import api from '../../api'

class IndexPage extends Component {
  constructor () {
    super()

    this.state = {
      login: '',
      password: '',
      loggedIn: true
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (e) {
    const { history, location } = this.props
    const { login, password } = this.state

    e.preventDefault()

    this.setState({
      error: null,
      loading: true
    })

    this.req = api.auth(login, password)

    this.req
      .then(({ data }) => {
        if (data.success) {
          api.storeToken(data.data.token)
          history.push((location.state && location.state.ref) || '/')
        }
      })
      .catch(({ response: { data: { data } } }) => {
        this.setState({
          error: data.message,
          loading: false
        })
      })
  }

  saveInput (e, key) {
    this.setState({
      [key]: e.target.value
    })
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  render () {
    const { password, login, error, loading } = this.state

    return (
      <div className='main-bg'>
        <form onSubmit={this.onSubmit} className='main-center-content'>
          <div className='main-logo'><img src={require('../../images/logo-lg.svg')} alt='Мособгаз САУПГ' /></div>
          <div className='auth-form'>
            <div className='auth-form__row'>
              <Label>E-mail</Label>
              <Input
                value={login}
                onChange={(e) => { this.saveInput(e, 'login') }}
                type='text'
              />
              {
                error
                  ? <ErrorMessage>{ error }</ErrorMessage>
                  : null
              }
            </div>

            <div className='auth-form__row'>
              <Label>Пароль</Label>
              <Input
                value={password}
                onChange={(e) => { this.saveInput(e, 'password') }}
                type='password'
                placeholder='пароль'
              />
            </div>

            <Button
              disabled={(!login || !password) || loading}
              loading={loading}
              type='submit'
              className='btn--fill auth-form__btn'
            >
              Войти
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default IndexPage
