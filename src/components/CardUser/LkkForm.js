import React, { Component } from 'react'
import is from 'is_js'

import { isValidPhoneNumber, normalizePhoneNumber } from '../../utils'

import { Input, Label, InputPhone, ErrorMessage } from '../Form'
import Button from '../Button/Button'
import OverlaySpinner from '../Loaders/OverlaySpinner'

import api from '../../api'

import './CardUser.css'

function defineCanSubmit (phone, email) {
  let canSubmit = isValidPhoneNumber(phone)

  if (canSubmit && email) {
    canSubmit = is.email(email)
  }

  return canSubmit
}

class LkkForm extends Component {
  constructor ({ phone, email }) {
    super()

    this.state = {
      phone: normalizePhoneNumber(phone),
      email: email || '',
      loading: false,
      confirm: false,
      canSubmit: false,
      success: false,
      errors: {}
    }
  }

  setErrors (errors) {
    this.setState({
      errors: Object.assign({}, this.state.errors, errors)
    })
  }

  register (id, phone, email) {
    this.regRequest = api.registerLkk(id, phone, email)

    this.setErrors({
      email: null,
      phone: null
    })

    this.setState({
      loading: true
    })

    this.regRequest
      .then(({ data: { data, success } }) => {
        if (success) {
          this.setState({
            confirm: true,
            loading: false
          })
        }
      })
      .catch(({ response: { data: { data } } }) => {
        this.setState({
          loading: false
        })

        this.setErrors({
          phone: data.message
        })
      })
  }

  activateRegistration (id, code) {
    this.activateRequest = api.activateLkk(id, code)

    this.setState({
      loading: true
    })

    this.activateRequest
      .then(({ data: { data, success } }) => {
        this.setState({
          success,
          loading: false
        })

        this.props.onFinish()
      })
      .catch(({ response: { data } }) => {
        this.setState({
          loading: false
        })

        this.setErrors({
          code: data.message
        })
      })
  }

  componentWillUnmount () {
    if (this.regRequest) {
      this.regRequest.cancel()
    }

    if (this.activateRequest) {
      this.activateRequest.cancel()
    }
  }

  render () {
    const { abonentId } = this.props
    const { phone, email, errors, loading, confirm, success } = this.state

    return (
      <div>
        {
          loading
            ? <OverlaySpinner relativeToParent={false} />
            : null
        }
        <form
          className='modal-wrapper-center'
          onSubmit={(e) => {
            e.preventDefault()

            this.register(abonentId, phone, email)
          }}
        >
          <div className='modal-line'>
            <Label>Номер телефона</Label>
            <InputPhone
              disabled={confirm || loading}
              value={phone}
              onBlur={
                () => {
                  this.setErrors({
                    phone: !isValidPhoneNumber(phone) ? 'Неверный формат номера' : null
                  })
                }
              }
              onChange={
                (e, phone) => {
                  const validPhone = isValidPhoneNumber(phone)

                  this.setState({
                    phone,
                    canSubmit: defineCanSubmit(phone, email)
                  })

                  if (validPhone) {
                    this.setErrors({
                      phone: null
                    })
                  }
                }
              }
            />
            <ErrorMessage>{ errors.phone }</ErrorMessage>

            <div className='modal-helper'>На этот номер придет СМС с кодом для подтверждения</div>
          </div>
          <div className='modal-line'>
            <Label>Электронная почта</Label>
            <Input
              disabled={confirm || loading}
              onBlur={
                (e) => {
                  this.setErrors({
                    email: email && !is.email(email) ? 'Неверный формат' : null
                  })
                }
              }
              onChange={
                (e) => {
                  const email = e.target.value
                  this.setState({
                    email,
                    canSubmit: defineCanSubmit(phone, email)
                  })

                  if (is.email(email)) {
                    this.setErrors({
                      email: null
                    })
                  }
                }
              }
            />
            <ErrorMessage>{ errors.email }</ErrorMessage>
          </div>

          {
            !confirm
              ? <Button disabled={loading || !defineCanSubmit(phone, email)}>Добавить</Button>
              : (
                <div className='modal-line modal-code'>
                  <Label>введите код из смс</Label>
                  <Input
                    disabled={loading}
                    maxLength='6'
                    onChange={
                      (e) => {
                        const { value } = e.target
                        if (value.length === 6) {
                          this.activateRegistration(abonentId, value)
                        }
                      }
                    }
                  />
                  <button type='button' onClick={() => { this.setState({ confirm: false }) }} className='content-link-uppercase'>Отмена</button>
                  <ErrorMessage>{ errors.code }</ErrorMessage>
                </div>
              )
          }
        </form>

        {
          success
            ? (
              <div className='modal-message'>
                <div>
                  <div className='modal-message-title'>Спасибо, пользователь добавлен</div>
                  <div className='modal-message-text'>Это окно закроется через несколько секунд</div>
                </div>
              </div>
            )
            : null
        }

      </div>
    )
  }
}

LkkForm.defaultProps = {
  onFinish: () => {}
}

export default LkkForm
