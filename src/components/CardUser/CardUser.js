import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { intersection } from 'lodash'

import Modal from '../Modal/Modal'
import Avatar from '../Avatar'
import LkkForm from './LkkForm'

import api from '../../api'

import './CardUser.css'

import { MobileIcon } from '../Icons'
import { formatDate } from '../../utils/index'
import { fetchAccount } from '../../redux/account/actions'
import Button from '../Button/Button'

class CardUser extends Component {
  constructor (props) {
    super(props)
    const { data } = this.props
    this.state = {
      userAdded: data.lkk_exists,
      showAddForm: false
    }
  }

  showAddForm () {
    this.setState({
      showAddForm: true
    })
  }

  hideAddForm () {
    this.setState({
      showAddForm: false
    })
  }

  update () {
    this.props.fetchAccount(this.props.id)
  }

  render () {
    const { name, contract, data, id, user } = this.props
    const { state } = this

    return (
      <div className='card-user'>
        <div className='card-user__top'>
          <div className='card-user__info'>
            <div className='card-user__info-account'>Лицевой счет: <span>{ contract }</span></div>
            <div className='card-user__info-name'>{ name }</div>
            <div className='card-user__info-location'>{ data.address }</div>
            <div
              className={classNames('card-user__info-status', {'text-red': !data.lkk_exists})}
            >
              {`${data.lkk_exists && data.last_login_date ? `Был в ЛКК ${formatDate(data.last_login_date, 'DD.MM.YYYY HH:mm')}` : 'Нет в ЛК'}`}
              {data.lkk_exists && <MobileIcon style={{ width: '15px' }} />}
            </div>
          </div>
          <div className='card-user__photo'>
            <Avatar src={data.avatar_url} />
          </div>
        </div>
        {
          !state.userAdded && <div className='card-user__bottom'>
            <button
              className='card-user__link'
              onClick={() => {
                this.showAddForm()
              }}
            >
              Добавить в ЛК
            </button>
          </div>
        }
        {/* <div className='card-user__bottom'> */}
        {/* <a className='card-user__link' href='#'>Добавить Отзыв о ЛКК</a> */}
        {/* <a className='card-user__link' href='#'>Выслать логин и пароль</a> */}
        {/* </div> */}
        {/* <div className='card-user__bottom'> */}
        {/* <Input className='card-user__input' placeholder='код из смс' /> */}
        {/* <a className='card-user__link' href='#'>Добавить</a> */}
        {/* <a className='card-user__link' href='#'>Отмена</a> */}
        {/* </div> */}
        {
          state.userAdded && <div className='card-user__bottom'>
            {
              intersection(['ROLE_SWITCH_LKK'], user.roles).length
                ? (
                  <Button
                    loading={state.lkkPending}
                    className='card-user__link'
                    onClick={async () => {
                      try {
                        this.setState({ lkkPending: true })

                        const lkkWindow = window.open('', '_blank')

                        const { data: { data, success } } = await api.lkkLogin(id)

                        if (!success) {
                          this.setState({ lkkPending: false }, () => window.alert('Ошибка:' + data.message))
                          return
                        }

                        lkkWindow.location = data.redirect_uri
                        this.setState({ lkkPending: false })
                      } catch (err) {
                        this.setState({ lkkPending: false }, () => window.alert('Ошибка:' + err))
                      }
                    }}
                  >
                    Авторизоваться в ЛКК
                  </Button>
                )
                : <span className='card-user__text text-italic'>Пользователь добавлен в ЛКК</span>
            }
          </div>
        }

        {
          !state.userAdded && (
            <Modal
              isOpen={state.showAddForm}
              onCloseClick={() => { this.hideAddForm() }}
              contentLabel='Добавить в ЛК'
            >
              <div className='modal-title'>Добавление пользователя в ЛК</div>

              <LkkForm
                abonentId={id}
                phone={data.phone}
                onFinish={() => { setTimeout(() => { this.hideAddForm(); this.update() }, 4000) }}
              />
            </Modal>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (dispatch) => {
  return {
    fetchAccount: function (id) {
      return dispatch(fetchAccount(id))
    }
  }
}

export default connect(({ user }) => ({ user }), mapStateToProps)(CardUser)
