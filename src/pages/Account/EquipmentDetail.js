import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { Link } from 'react-router-dom'

import Spinner from '../../components/Loaders/Spinner'

import { fetchEquipmentItem } from '../../redux/account/actions'
import { formatDate } from '../../utils'

class EquipmentDetail extends Component {
  componentDidMount () {
    this.req = this.props.fetchItem(this.props.match.params.equipmentId)

    this.req.then(({ data: { data } }) => {
      this.props.setBreadcrumbs(this.props.location, {[data.id]: data.title})
    })
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  render () {
    const { account, mainPath } = this.props
    const { equipmentItem } = account

    if (account.equipmentItemLoading) {
      return <div className='account-inner-spinner'><Spinner /></div>
    }

    const showMoreInfo = equipmentItem.is_meter || equipmentItem.mounting_place || equipmentItem.inventory_number

    return <div>
      <div className='content'>
        <div className='content-title'>
          { equipmentItem.is_meter ? 'Счетчик ' + equipmentItem.title : equipmentItem.title }
          <sup className={classNames({'text-red': !equipmentItem.summary.enabled})}>
            {(equipmentItem.summary && equipmentItem.summary.enabled) ? ' вкл' : ' выкл'}
          </sup>
        </div>
        <div className='content__text-item'>
          {/* <div className='content-text-medium'>{ equipmentItem.is_meter ? 'Счетчик ' + equipmentItem.title : equipmentItem.title }</div> */}
          {
            equipmentItem.factory_number && <div className='text-gray content-text-small'>
              Заводской номер: {equipmentItem.factory_number}
            </div>
          }
        </div>
        {
          equipmentItem.meter_data.seal_number && <div className='content__text-item'>
            <div className='content-text-medium'>Номер пломбы: {equipmentItem.meter_data.seal_number}</div>
            <div className='text-gray content-text-small'>
              Дата проверки: { formatDate(equipmentItem.meter_data.date_last_check) }
            </div>
          </div>
        }
        {
          equipmentItem.meter_data.last_value && <div className='content__text-item'>
            <div className='content-text-medium'>
              Последние показания счетчика: {equipmentItem.meter_data.last_value.value}
            </div>
            <div className='text-gray content-text-small'>
              Дата показания: { formatDate(equipmentItem.meter_data.last_value.date) }
            </div>
          </div>
        }
        {
          equipmentItem.is_meter && <div className='content-text-right content-bottom-border'>
            <Link className='content-link-uppercase'
              to={`${mainPath}/metering/${equipmentItem.id}`}>
              Перейти к показаниям счетчика
            </Link>
          </div>
        }
      </div>
      {
        showMoreInfo && <div className='content-default-wrapper'>
          <div className='content-title-uppercase'>Дополнительная информация</div>
          <div className='l-two-cols l-requisites'>
            {
              equipmentItem.meter_data.digits && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>Разрядность</div>
                <div className='content-text-medium'>{ equipmentItem.meter_data.digits }</div>
              </div>
            }
            {
              equipmentItem.mounting_place && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>Место установки на объекте</div>
                <div className='content-text-medium'>{ equipmentItem.mounting_place }</div>
              </div>
            }
            {
              equipmentItem.meter_data.max_flow && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>Предельная пропускная способность</div>
                <div className='content-text-medium'>{ equipmentItem.meter_data.max_flow }</div>
              </div>
            }
            {
              equipmentItem.inventory_number && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>Инвентарный №</div>
                <div className='content-text-medium'>{ equipmentItem.inventory_number}</div>
              </div>
            }
            {
              equipmentItem.date_last_check && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>Дата поверки</div>
                <div className='content-text-medium'>{ formatDate(equipmentItem.date_last_check) }</div>
              </div>
            }
            {
              equipmentItem.meter_data.pulseWeight && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>Вес импульса</div>
                <div className='content-text-medium'>{ equipmentItem.meter_data.pulseWeight }</div>
              </div>
            }
          </div>
        </div>
      }
      <div className='content-default-wrapper'>
        <div className='content-title-uppercase'>Характеристики оборудования</div>
        <div className='l-two-cols l-requisites'>
          {
            equipmentItem.state && <div className='l-two-cols-col'>
              <div className='content-text-uppercase'>Состояние прибора</div>
              <div className='content-text-medium'>{ equipmentItem.state }</div>
            </div>
          }
          {
            equipmentItem.date_manufactured && <div className='l-two-cols-col'>
              <div className='content-text-uppercase'>Дата выпуска</div>
              <div className='content-text-medium'>{ formatDate(equipmentItem.date_manufactured) }</div>
            </div>
          }
          {
            equipmentItem.passport && <div className='l-two-cols-col'>
              <div className='content-text-uppercase'>Наличие паспорта</div>
              <div className='content-text-medium'>{ equipmentItem.passport }</div>
            </div>
          }
          {
            equipmentItem.date_added && <div className='l-two-cols-col'>
              <div className='content-text-uppercase'>Дата ввода прибора в БД САУПГ</div>
              <div className='content-text-medium'>{ formatDate(equipmentItem.date_added) }</div>
            </div>
          }
          {
            equipmentItem.meter_data.check_period && <div className='l-two-cols-col'>
              <div className='content-text-uppercase'>Периодичность госпроверки</div>
              <div className='content-text-medium'>{ equipmentItem.meter_data.check_period }</div>
            </div>
          }
          {
            equipmentItem.suitability && <div className='l-two-cols-col'>
              <div className='content-text-uppercase'>Оценка пригодности прибора</div>
              <div className='content-text-medium'>{ equipmentItem.suitability }</div>
            </div>
          }
          {
            equipmentItem.date_disabled && <div className='l-two-cols-col'>
              <div className='content-text-uppercase'>Дата прекращения</div>
              <div className='content-text-medium'>{ formatDate(equipmentItem.disabled) }</div>
            </div>
          }
          {
            equipmentItem.relevance && <div className='l-two-cols-col'>
              <div className='content-text-uppercase'>Техническая актуальность</div>
              <div className='content-text-medium'>{ equipmentItem.relevance }</div>
            </div>
          }
          {
            equipmentItem.date_enabled && <div className='l-two-cols-col'>
              <div className='content-text-uppercase'>Дата возобновления</div>
              <div className='content-text-medium'>{ formatDate(equipmentItem.date_enabled) }</div>
            </div>
          }
          {
            equipmentItem.date_last_check && <div className='l-two-cols-col'>
              <div className='content-text-uppercase'>Дата поверки</div>
              <div className='content-text-medium'>{ formatDate(equipmentItem.date_last_check) }</div>
            </div>
          }
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({account}) => {
  return {
    account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItem (id) {
      return dispatch(fetchEquipmentItem(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentDetail)
