import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import Template from '../../components/Template'
import { Modal } from '../../components/Modal'

import './ErrorMessage.css'

/**
 * провайдер для рендеринга ошибок из api
 * что бы компонент смог рендерить эти ошибки, нужно использовать HOC withApiError(см. ниже)
 * @experimental посмотрил, как оно будет себя вести, возможно можно что-то переделать или улучшить
 */
class ApiErrorProvider extends Component {
  constructor () {
    super()

    this.state = {
      error: null,
      accessError: false,
      prevLocation: null
    }
  }

  reset () {
    this.setState({
      error: null
    })
  }

  componentWillReceiveProps () {
    this.setState({prevLocation: this.props.location})
  }

  componentDidMount () {
    const { api, history, location } = this.props

    // TODO: посмотреть, как оно будет себя вести
    if (history) {
      history.listen(() => {
        this.reset()
      })
    }

    api.on('request', () => {
      this.reset()
    })

    api.on('error', (err) => {
      const { response, config } = err

      if (response.status === 401) {
        history.replace('/auth', {
          ref: `${location.pathname}${location.search || ''}`
        })

        return
      }

      if (response.status === 403) {
        this.setState({
          accessError: true
        })
        // if (this.state.prevLocation) {
        //   this.props.history.push(this.state.prevLocation.pathname)
        // } else {
        //   this.props.history.push('/auth')
        // }

        return
      }

      // FIXME: это быстрый фикс. Надо сделать как-то умнее
      if (config.method === 'get') {
        this.setState({
          error: {
            status: response.status,
            statusText: response.statusText,
            message: response.data ? response.data.data.message : 'Неизвестная ошибка'
          }
        })
      }
    })
  }

  getChildContext () {
    return {
      error: this.state.error
    }
  }

  render () {
    const { children, user } = this.props

    return (
      <div style={{ minHeight: '70vh' }}>
        <Template>
          <Modal
            isOpen={this.state.accessError}
            onCloseClick={() => {
              this.setState({accessError: false})
              this.props.history.push('/')
              // if (this.state.prevLocation) {
              //   this.props.history.push(this.state.prevLocation.pathname)
              // } else {
              //   this.props.history.push('/')
              // }
            }}
            contentLabel='Modal'
          >
            <div className='content-text-medium'>У вас недостаточно прав</div>
            {
              ((user.roles && user.roles.indexOf('ROLE_CALL_OPERATOR') !== -1))
                ? 'Доступ к карточкам абонентов возможен только при наличии активного входящего звонка. В текущий момент времени для вашего пользователя активного входящего звонка нет.'
                : null
            }
          </Modal>
          { children }
        </Template>
      </div>
    )
  }
}

ApiErrorProvider.childContextTypes = {
  error: PropTypes.object
}

export default withRouter(connect(({ user }) => ({ user }))(ApiErrorProvider))

const renderError = (error) => {
  return error.status === 401
    ? renderUnauthorized()
    : (
      <div className='error-message'>
        <h2 className='content-title'>Ошибка</h2>
        { error.message }
      </div>
    )
}

const renderUnauthorized = (location) => {
  return <Redirect to={{
    pathname: '/auth',
    state: { ref: `${location.pathname}${location.search || ''}` }
  }} />
}

/**
 * HOC для привязки компонента к ApiErrorProvider
 * @param {Boolean} onlyUnauthorized – если true, то компонент будет реагировать только на 401 статус
 * @return {Function}
 * @example withRouter(true)(MyComponent) // реагировать только на 401
 */
export function withApiError (onlyUnauthorized = false) {
  return function (WrappedComponent) {
    const WithApiError = (props, context) => {
      const { error } = context

      if (error) {
        if (onlyUnauthorized) {
          if (error.status === 401) {
            return renderUnauthorized(props.location)
          }
        } else if (error) {
          return renderError(error)
        }
      }

      return <WrappedComponent {...props} />
    }

    WithApiError.contextTypes = {
      error: PropTypes.object
    }

    return WithApiError
  }
}
