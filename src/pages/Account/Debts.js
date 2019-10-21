import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import qs from 'qs'
import axios from 'axios'
import classnames from 'classnames'
import MediaQuery from '../../components/MediaQuery'

import './index.css'

import { formatDate, formatBalance, searchStringToURLParams } from '../../utils'

import Template from '../../components/Template'
import Spinner from '../../components/Loaders/Spinner'

import { fetchDebtsByMonths, fetchMetering, fetchEquipment } from '../../redux/account/actions'
import { InputDate, Label } from '../../components/Form'
import { Button } from '../../components/Button'

import Table from '../../components/Table'

class Debts extends Component {
  constructor (props) {
    super(props)

    const { location } = props

    let selectedStartDay = moment().subtract(3, 'years')
    let selectedEndDay = new Date()

    if (location.search) {
      let dateParams

      dateParams = searchStringToURLParams(location.search)

      if (dateParams.get('date_start')) {
        selectedStartDay = dateParams.get('date_start')
      }

      if (dateParams.get('end_start')) {
        selectedEndDay = dateParams.get('end_start')
      }
    }

    this.state = {
      selectedStartDay,
      selectedEndDay
    }
  }

  fetch (query = '') {
    const { match, account, account: { accountSummary } } = this.props
    this.req = axios.all([
      accountSummary.has_meter && this.props.fetchEquipment(match.params.id, account.isOrg),
      this.props.fetchDebtsByMonths(match.params.id, query, account.isOrg)
    ])
      .then((_data) => {
        if (!accountSummary.has_meter) {
          this.setState({
            initiallyLoaded: true
          })
          return
        }
        const { data: { data } } = _data[0]
        let meterRequest = []
        if (data && data.length) {
          data.map(eq => {
            eq.is_meter && meterRequest.push(
              this.props.fetchMetering(eq.id, query)
            )
          })
        }

        if (meterRequest.length) {
          this.req = axios.all(meterRequest)
            .then(data => {
              const metering = data.map((meter) => {
                return meter.data.data
              })
              this.setState({
                initiallyLoaded: true,
                metering
              })
            })
        } else {
          this.setState({
            initiallyLoaded: true
          })
        }
      })
    return this.req
  }

  componentDidMount () {
    const { location } = this.props

    this.req = this.fetch(location.search ? searchStringToURLParams(location.search) : null)

    this.props.setBreadcrumbs(location)
  }

  componentWillUpdate (nextProps) {
    const prevLocation = this.props.location
    const { location } = nextProps

    if (prevLocation.search !== location.search) {
      this.fetch(searchStringToURLParams(location.search))
    }
  }

  componentWillUnmount () {
    // if (this.req) {
    //   this.req.cancel()
    // }
  }

  onSubmit (e) {
    e.preventDefault()

    const { state } = this

    const { history, match } = this.props

    const query = qs.stringify({
      date_start: formatDate(state.selectedStartDay, 'YYYY-MM-DD'),
      date_end: formatDate(state.selectedEndDay, 'YYYY-MM-DD')
    })

    history.push(`${match.url}?${query}`)
  }

  render () {
    const { state, props } = this
    const { account } = props
    const { accountSummary: { has_meter } } = account

    if (!state.initiallyLoaded || account.debtsByMonthsLoading) {
      return <div className='account-inner-spinner'><Spinner /></div>
    }

    const _debtsByMonths = account.debtsByMonths
    if (state.metering && state.metering.length) {
      _debtsByMonths.map(debts => {
        const debtsIntervalEnd = moment(debts.date).endOf('month').valueOf()
        const debtsIntervalStart = moment(debts.date).startOf('month').valueOf()
        debts.metering = []

        state.metering.map(meter => {
          const { title, id } = meter
          const monthValues = meter.values.filter(val => {
            const meterValueDate = moment(val.month).valueOf()
            return meterValueDate >= debtsIntervalStart && meterValueDate <= debtsIntervalEnd && val.value
          })
          let m3 = 0
          monthValues.map(val => {
            if (val.m3) m3 += val.m3
          })
          if (monthValues.length) {
            debts.metering.push({title, id, data: {...monthValues[0], m3}})
          }
        })
      })
    }

    return (
      <div>
        <div className='content content-bg-gray overflow-visible'>
          <div className='content-title'>Долги по месяцам</div>
          <div className='content-bg-gray-wrapper'>
            <Label className='label-debts'>Вывести платежи за период</Label>
            <form onSubmit={(e) => this.onSubmit(e)} className='l-debts-filters debts-filters'>
              <InputDate onDayChange={
                (day) => {
                  this.setState({ selectedStartDay: day })
                }
              } value={formatDate(state.selectedStartDay, 'DD.MM.YYYY')} className='input-date--full-width' />
              <InputDate onDayChange={
                (day) => {
                  this.setState({ selectedEndDay: day })
                }
              } value={formatDate(state.selectedEndDay, 'DD.MM.YYYY')} className='input-date--full-width' />
              <Button
                loading={account.debtsByMonthsLoading}
                disabled={account.debtsByMonthsLoading}
                className='btn--spinner-absolute'
              >
                Показать
              </Button>
            </form>
          </div>
        </div>
        <div className='content'>
          <Table className={classnames('c-table-responsive', { 'c-table--has-meter': has_meter })}>
            <tr className='c-table__row--head'>
              <th>Месяц <br />образования</th>
              {
                state.metering && state.metering.length
                  ? <Template>
                    <th>Пред. показания</th>
                    <th>Посл. показания</th>
                    <th>Кубы</th>
                    <th>Тариф</th>
                  </Template>
                  : null
              }
              { !has_meter ? <th>Сальдо <br />входящее</th> : null }
              <th>Начислено</th>
              { has_meter ? <th>Пени</th> : null }
              <th>Оплачено</th>
              <th>Факт. <br />недоплата</th>
              { has_meter ? <th>Вид послед. показания</th> : null }
              { has_meter ? <th>Заводской номер</th> : null }
              { !has_meter ? <th>Сальдо <br />исходящее</th> : null }
            </tr>
            {
              _debtsByMonths.map((item, key) => {
                let prevItem = null

                /* если есть показания за месяц, ищем предыдущие показания */
                if (has_meter && item.metering.length) {
                  let prevHasValue = false

                  /* проверяем предыдущий месяц на наличие показаний */
                  prevItem = _debtsByMonths[key + 1]
                  _debtsByMonths[key + 1] && _debtsByMonths[key + 1].metering.map(meter => {
                    if (meter.data.value) prevHasValue = true
                  })

                  /* если показаний за пред. месяц нет, ищем ближайший месяц с показаниями */
                  if (!prevHasValue) {
                    loop1:
                    for (let cnt = key + 2; cnt < _debtsByMonths.length; cnt++) {
                      for (let meterCnt = 0; meterCnt < _debtsByMonths[cnt].metering.length; meterCnt++) {
                        if (_debtsByMonths[cnt].metering[meterCnt].data.value) {
                          prevItem = _debtsByMonths[cnt]
                          break loop1
                        }
                      }
                    }
                  }
                }

                let hasHover = false
                let cub = 0
                let prevMeteringCnt = 0
                item.metering && item.metering.map((meter, i) => {
                  if (meter.data.m3) cub += meter.data.m3
                  if ((meter.data.m3 || meter.data.value) && state.metering.length > 1) hasHover = true
                })
                return (
                  <Template key={`debts-row-${key}`}>
                    <tr
                      className={classnames({'has-hover': hasHover, 'active': state.activeRow === key})}
                      key={key}
                      onClick={() => { state.metering && state.metering.length > 1 && hasHover && this.setState({activeRow: key}) }}>
                      <td data-th='Месяц образования' className='text-medium'>{formatDate(item.date, 'MM.YYYY')}</td>
                      {
                        state.metering && state.metering.length
                          ? (
                            <Template>
                              <td data-th='Пред. показания'>
                                {
                                  prevItem
                                    ? (
                                      prevItem.metering.length === 1
                                        ? prevItem.metering[0].data.value
                                        : (
                                          state.metering.map((meter, meterIndex) => {
                                            const metering = this.getCurMeter(meter, item)
                                            const prevMetering = this.getCurMeter(meter, prevItem)
                                            if (!prevMetering || !metering) return
                                            prevMeteringCnt++
                                            return (
                                              `${prevMeteringCnt > 1 ? ' / ' : ''}${prevMetering.data.value} `
                                            )
                                          })
                                        )
                                    )
                                    : null
                                }
                              </td>
                              {
                                prevItem && prevItem.metering.length > 1 && prevItem.metering[0].data.value
                                  ? (
                                    <MediaQuery rule='(max-width: 767px)'>
                                      <Template>
                                        {
                                          prevItem.metering.map((meter, i) => {
                                            return <td key={`prev-metering-${i}`} className='c-table__descr-row' data-th={meter.title}>{meter.data.value}</td>
                                          })
                                        }
                                      </Template>
                                    </MediaQuery>
                                  ) : null
                              }
                              <td data-th='Посл. показания'>
                                {
                                  item.metering.length === 1
                                    ? item.metering[0].data.value
                                    : item.metering.map((meter, i) => {
                                      return (
                                        `${meter.data.value}
                                         ${item.metering[i + 1] && item.metering[i + 1].data.value ? ' / ' : ' '}`
                                      )
                                    })
                                }
                              </td>
                              {
                                item.metering.length > 1
                                  ? (
                                    <MediaQuery rule='(max-width: 767px)'>
                                      <Template>
                                        {
                                          item.metering.map((meter, i) => {
                                            if (!meter.data || (meter.data && !meter.data.value)) return
                                            return <td key={`metering-${i}`} className='c-table__descr-row' data-th={meter.title}>{meter.data.value}</td>
                                          })
                                        }
                                      </Template>
                                    </MediaQuery>
                                  ) : null
                              }
                              <td data-th='Кубы'>
                                { cub || ' ' }
                              </td>
                              <td data-th='Тариф'>
                                {
                                  item.metering.length === 1
                                    ? item.metering[0].data.cubic_meter_cost
                                    : null
                                }
                              </td>
                              {
                                item.metering.length > 1
                                  ? (
                                    <MediaQuery rule='(max-width: 767px)'>
                                      <Template>
                                        {
                                          item.metering.map((meter, i) => {
                                            if (!meter.data || (meter.data && !meter.data.cubic_meter_cost)) return
                                            return <td
                                              key={`cubic-meter-cost-${i}`}
                                              className='c-table__descr-row'
                                              data-th={meter.title}
                                            >
                                              { meter.data.cubic_meter_cost }
                                            </td>
                                          })
                                        }
                                      </Template>
                                    </MediaQuery>
                                  ) : null
                              }
                            </Template>
                          )
                          : null
                      }
                      { /* TODO: после правок на бэке, убрать костыль (* -1) */ }
                      { !has_meter ? <td data-th='Сальдо входящее'>{formatBalance(item.saldo_in * -1, false)}</td> : null }
                      <td data-th='Начислено'>{formatBalance(item.charged, false)}</td>
                      { has_meter ? <td data-th='Пени'>{formatBalance(item.fines, false)}</td> : null}
                      <td data-th='Оплачено'>{formatBalance(item.payed, false)}</td>
                      <td data-th='Факт. недоплата'>{formatBalance(item.fact_underpayment_in, false)}</td>
                      { has_meter
                        ? <td data-th='Вид послед. показания'>
                          { item.metering.length === 1 ? item.metering[0].data.type : null }
                        </td>
                        : null
                      }
                      { has_meter
                        ? <td data-th='Заводской номер'>
                          { item.metering.length === 1 ? item.metering[0].id : null }
                        </td>
                        : null
                      }
                      { !has_meter ? <td data-th='Сальдо исходящее'>{formatBalance(item.saldo_out * -1, false)}</td> : null }
                    </tr>
                    {
                      key === state.activeRow
                        ? (
                          <MediaQuery rule='(min-width: 768px)'>
                            <Template>
                              {
                                state.metering.map((meter, meterIndex) => {
                                  const metering = this.getCurMeter(meter, item)
                                  const prevMetering = this.getCurMeter(meter, prevItem)
                                  if (!metering) return
                                  return (
                                    <tr key={`metering-dscr-${key + '-' + meterIndex}`} className={classnames({'has-hover': hasHover, 'active': state.activeRow === key})}>
                                      <td>{ meter.title }</td>
                                      <td>{ prevMetering && metering && prevMetering.data.value }</td>
                                      <td>{ metering && metering.data && metering.data.value }</td>
                                      <td>{ metering && ((metering.data && metering.data.m3) || ' ') }</td>
                                      <td>{ metering && ((metering.data && metering.data.cubic_meter_cost) || ' ') }</td>
                                      <td colSpan={4} />
                                      <td>{ metering.data.type }</td>
                                      <td>{ metering.id }</td>
                                    </tr>
                                  )
                                })
                              }
                            </Template>
                          </MediaQuery>
                        )
                        : null
                    }
                  </Template>
                )
              })
            }
          </Table>
        </div>
      </div>
    )
  }
  getCurMeter (meter, item) {
    let _meter = item.metering.filter(curMeter => {
      return meter.id === curMeter.id
    })
    return _meter[0]
  }
}

const mapStateToProps = ({account}) => {
  return {
    account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDebtsByMonths (id, sort) {
      return (
        dispatch(fetchDebtsByMonths(id, sort))
      )
    },
    fetchEquipment (id, isOrg) {
      return dispatch(fetchEquipment(id, isOrg))
    },
    fetchMetering (id, sort) {
      return dispatch(fetchMetering(id, sort))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Debts)
