import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Spinner from '../../components/Loaders/Spinner'

import { fetchChargeData } from '../../redux/account/actions'

class ChargeData extends Component {
  componentDidMount () {
    const { location, match } = this.props

    this.req = this.props.fetchAccountChargeData(match.params.id)

    this.props.setBreadcrumbs(location)
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  render () {
    const { account } = this.props

    if (account.chargeDataLoading) {
      return <div className='account-inner-spinner'><Spinner /></div>
    }

    const { chargeData } = account

    return (
      <div>
        <div className='content content-bg-gray'>
          <div className='content-title'>Поставка газа физ. лицам</div>
        </div>
        <div className='content-default-wrapper content-default-wrapper--inner'>
          <div className='l-two-cols'>
            <div className='l-two-cols-col'>
              <div className='content-text-uppercase'>Прописано</div>
              <div className='content-text-medium'>{ chargeData.people_registered }</div>
            </div>

            <div className='l-two-cols-col'>
              <div className='content-text-uppercase'>Общая площадь</div>
              <div className='content-text-medium'>{ chargeData.area ? `${chargeData.area}м` : '–' }</div>
            </div>

            <div className='l-two-cols-col'>
              <div className='content-text-uppercase'>Всего жителей</div>
              <div className='content-text-medium'>{ chargeData.people_total }</div>
            </div>
          </div>
        </div>
        <div className='content-default-wrapper'>
          <div className='l-text-list'>
            <div className='l-text-list-item'>
              <div className='content-text-uppercase'>категория газоснабжения</div>
              <div className='content-text-medium'>{ chargeData.category }</div>
            </div>
            <div className='l-text-list-item'>
              <div className='content-text-uppercase'>Адрес сновного подобъект (жил. часть дома)</div>
              <div className='content-text-medium'>{ chargeData.sub_address }</div>
            </div>
          </div>
        </div>
        <div className='content-default-wrapper'>
          <div className='l-text-list'>
            <div className='l-text-list-item'>
              <div className='content-text-uppercase'>Фактически отапл. площадь от приборов мест. отопления:</div>
              <div className='content-text-medium'>{`${chargeData.area_fact ? chargeData.area_fact + ' м' : '-'} `} </div>
            </div>
            <div className='l-text-list-item'>
              <div className='content-text-uppercase'>жителей с учетом прибывших/выбыших</div>
              <div className='content-text-medium'>{ chargeData.people_grand_total }</div>
            </div>
          </div>
        </div>
        <div className='content-default-wrapper'>
          <div className='l-text-list'>
            <div className='l-text-list-item'>
              <div className='content-text-uppercase'>Обслуживающий РКЦ:</div>
              <div className='content-text-medium'>{ chargeData.rkc || '–' }</div>
            </div>
            <div className='l-text-list-item'>
              <div className='content-text-uppercase'>ЕИРЦ</div>
              <div className='content-text-medium'>{ chargeData.eirkc || '–' }</div>
            </div>
            <div className='l-text-list-item'>
              <div className='content-text-uppercase'>Статус</div>
              <div className='content-text-medium'>{ chargeData.eirkc_status }</div>
            </div>
          </div>
        </div>
        <div className='content-default-wrapper'>
          <div className='l-three-cols content-text-three-cols'>
            <div className='l-three-cols-col'><span className={classnames({ check: chargeData.is_registered })}>Наличие прописанных</span></div>
            <div className='l-three-cols-col'><span className={classnames({ check: chargeData.is_communal })}>Коммунальная квартира</span></div>
            <div className='l-three-cols-col'><span className={classnames({ check: chargeData.is_veteran })}>Ветеран ВОВ</span></div>
            <div className='l-three-cols-col'><span className={classnames({ check: chargeData.is_pensioner })}>Одинокий пенсионер</span></div>
            <div className='l-three-cols-col'><span className={classnames({ check: chargeData.is_new_software })}>Переведен на новое ПО</span></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ account }) => {
  return {
    account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccountChargeData (id) {
      return dispatch(fetchChargeData(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChargeData)
