import React, { Component } from 'react'
import { connect } from 'react-redux'

import './index.css'

import { OverlaySpinner } from '../../components/Loaders'

import { fetchRequisites } from '../../redux/account/actions'
import Template from '../../components/Template'

class Contacts extends Component {
  componentDidMount () {
    const { match } = this.props
    this.req = this.props.fetch(match.params.id)
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  render () {
    const { account: { accountSummary, requisites, requisitesLoading } } = this.props
    const { code, title } = accountSummary
    if (requisitesLoading) {
      return <OverlaySpinner />
    }
    return (
      <Template>
        <div className='content content-bg-gray'>
          <div className='content-title'>Контакты и реквизиты</div>
        </div>
        <div className='card-user'>
          <div className='card-user__info-account'>Код клиента: { code }</div>
          <div className='card-user__info-name'>{ title }</div>
        </div>
        <div className='content-default-wrapper'>
          <div className='content-title-uppercase'>
            Адрес и контактные данные
          </div>
          <div className='l-two-cols l-requisites'>
            {
              requisites.address && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>
                  почтовый адрес
                </div>
                <div className='content-text-medium'>
                  { requisites.address }
                </div>
              </div>
            }
            {
              requisites.zip_code && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>
                  почтовый индекс
                </div>
                <div className='content-text-medium'>
                  { requisites.zip_code }
                </div>
              </div>
            }
            {
              requisites.flat && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>
                  номер квартиры
                </div>
                <div className='content-text-medium'>
                  { requisites.flat }
                </div>
              </div>
            }
            {
              requisites.legal_address && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>
                  юридический адрес
                </div>
                <div className='content-text-medium'>
                  { requisites.legal_address }
                </div>
              </div>
            }
            {
              requisites.phone && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>
                  телефон
                </div>
                <div className='content-text-medium'>
                  { requisites.phone }
                </div>
              </div>
            }
            {
              requisites.fax && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>
                  факс
                </div>
                <div className='content-text-medium'>
                  { requisites.fax }
                </div>
              </div>
            }
            {
              requisites.email && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>
                  email
                </div>
                <div className='content-text-medium'>
                  { requisites.email }
                </div>
              </div>
            }
            {
              requisites.locality && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>
                  администрация
                </div>
                <div className='content-text-medium'>
                  { requisites.locality.title }
                </div>
              </div>
            }
          </div>
        </div>
        <div className='content-default-wrapper'>
          <div className='content-title-uppercase'>
            Реквизиты организации
          </div>
          <div className='l-two-cols l-requisites'>
            {
              requisites.inn && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>
                  инн
                </div>
                <div className='content-text-medium'>
                  { requisites.inn }
                </div>
              </div>
            }
            {
              requisites.kpp && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>
                  кпп
                </div>
                <div className='content-text-medium'>
                  { requisites.kpp }
                </div>
              </div>
            }
            {
              requisites.ifns && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>
                  код ифнс
                </div>
                <div className='content-text-medium'>
                  { requisites.ifns }
                </div>
              </div>
            }
            {
              requisites.okved && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>
                  код оквэд
                </div>
                <div className='content-text-medium'>
                  { requisites.okved }
                </div>
              </div>
            }
            {
              requisites.okpo && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>
                  код окпо
                </div>
                <div className='content-text-medium'>
                  { requisites.okpo }
                </div>
              </div>
            }
            {
              requisites.ogrn && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>
                  код огрн/огрнип
                </div>
                <div className='content-text-medium'>
                  { requisites.ogrn }
                </div>
              </div>
            }
          </div>
        </div>
      </Template>
    )
  }
}

const mapStateToProps = ({account}) => {
  return {
    account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch (id) {
      return dispatch(fetchRequisites(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
