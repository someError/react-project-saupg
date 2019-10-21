import React, { Component } from 'react'
import { connect } from 'react-redux'
import qs from 'qs'
import Animate from 'rc-animate'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import moment from 'moment'
import MediaQuery from '../../components/MediaQuery'

import Spinner from '../../components/Loaders/Spinner'
import { fetchMetering } from '../../redux/account/actions'
import { InputDate, Label, Input, ErrorMessage } from '../../components/Form'
import { CheckIcon, ArrowBoldIcon } from '../../components/Icons'
import { Button } from '../../components/Button'
import { SlideAnimation } from '../../components/Animation'

import Table from '../../components/Table'
import MeteringRow from '../../components/MeteringRow'

import api from '../../api'
import OverlaySpinner from '../../components/Loaders/OverlaySpinner'
import { formatBalance, strToAbsNum, formatDate, searchStringToURLParams } from '../../utils/index'

function isFilterActive (location, key, val) {
  const parsedQs = searchStringToURLParams(location.search)

  const queryVal = parsedQs.get(key)

  return !parsedQs.get('date_end') && queryVal && queryVal === val
}

function isPeriodFilterActive (location) {
  const parsedQs = searchStringToURLParams(location.search)

  const start = parsedQs.get('date_start')
  const end = parsedQs.get('date_end')

  return !!start && !!end
}

class MeteringDetail extends Component {
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
      selectedEndDay,
      meterDate: new Date(),
      meterValue: '',
      showForm: false,
      sent: false,
      showFilterForm: false
    }

    this.changeInput = this.changeInput.bind(this)
    this.showForm = this.showForm.bind(this)
    this.hideForm = this.hideForm.bind(this)
    this.onSubmitMetering = this.onSubmitMetering.bind(this)
    this.onSubmitFilter = this.onSubmitFilter.bind(this)
  }

  fetch (query = '') {
    const { match } = this.props

    this.req = this.props.fetch(match.params.counterId, query)

    return this.req
  }

  // FIXME: по факту хардкод, пределать, когда доделается api
  renderCount (currentVal, prevVal, balance, cost) {
    const meterPay = (currentVal - prevVal) * cost

    const style = { marginTop: '15px', fontWeight: 'bold', color: '#000', fontStyle: 'normal', fontSize: '1.2rem' }

    if (balance < 0) {
      return <div style={style}><span className='text-red'>{ formatBalance(strToAbsNum(balance), false) }</span> + { currentVal - prevVal } × { formatBalance(cost) } = { formatBalance(strToAbsNum(balance) + meterPay) }</div>
    } else {
      return <div style={style}>{ currentVal - prevVal } × { formatBalance(cost) } = { formatBalance(meterPay) }</div>
    }
  }

  componentDidMount () {
    const { match, location } = this.props

    this.fetch(location.search ? searchStringToURLParams(location.search) : null).then(({ data: { data } }) => {
      this.props.setBreadcrumbs(this.props.location, {[match.params.counterId]: data.title})
      this.setState({
        initiallyLoaded: true
      })
    })
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }

    if (this.sendReq) {
      this.sendReq.cancel()
    }
  }

  changeInput (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentWillUpdate (nextProps) {
    const prevLocation = this.props.location
    const { location } = nextProps

    if (prevLocation.search !== location.search) {
      this.fetch(searchStringToURLParams(location.search))
      this.setState({
        showFilterForm: false
      })
    }
  }

  onSubmitFilter (e) {
    e.preventDefault()

    const { state } = this

    const { history, match } = this.props

    const query = qs.stringify({
      date_start: formatDate(state.selectedStartDay, 'YYYY-MM-DD'),
      date_end: formatDate(state.selectedEndDay, 'YYYY-MM-DD')
    })

    history.push(`${match.url}?${query}`)
  }

  onSubmitMetering (e) {
    const { history, match, location } = this.props
    const { meterDate, meterValue } = this.state
    e.preventDefault()

    this.setState({
      sendLoading: true,
      error: null
    })

    this.sendReq = api.sendMetering(this.props.match.params.counterId, moment(meterDate).format('YYYY-MM-DD'), meterValue)
    this.sendReq
      .then(({ data }) => {
        if (data.success) {
          this.setState({cost: data.data.cubic_meter_cost})
          if (!location.search) {
            this.req = this.props.fetch(this.props.match.params.counterId, this.state.queryString)
          } else {
            history.replace(`${match.url}`)
          }

          this.req.then(({ data }) => {
            if (data.success) {
              this.setState({ sent: true, sendLoading: false, meterValue: '' })
              console.log(data.data.values)
              this.setState({
                prevValue: data.data.values[1] ? data.data.values[1].value : 0,
                sentValue: data.data.values[0].value
              })
            }
          })
        }
      })
      .catch(({ response: { data: { data } } }) => {
        this.setState({
          error: data.message,
          sendLoading: false
        })
      })
  }

  showForm () {
    this.setState({
      showForm: true,
      sent: false
    })
  }

  hideForm () {
    this.setState({
      showForm: false
    })
  }

  renderTable () {
    const { account, location } = this.props
    const { metering } = account

    if (metering.values && !metering.values.length) {
      return <div className='content-text-helper content-text-center'><br />Нет показаний</div>
    }

    return (
      <Table className='c-table-metering'>
        <tr className='c-table__row--head'>
          <th>Посл. показания</th>
          <th>Дата ввода</th>
          <th>Расход</th>
          <th>Тип</th>
          <th style={{ width: '30%' }}>Служба ввода</th>
          <th />
        </tr>
        {
          metering.values.map((item) => {
            return (
              <MeteringRow
                key={item.id}
                {...item}
                meterId={this.props.match.params.counterId}
                onRemoved={() => { this.fetch(location.search ? searchStringToURLParams(location.search) : null) }}
              />
            )
          })
        }
      </Table>
    )
  }

  render () {
    const { account, match, location } = this.props
    const { metering, meteringLoading, accountSummary } = account
    const { state } = this

    if (!state.initiallyLoaded && meteringLoading) {
      return <div className='account-inner-spinner'><Spinner /></div>
    }

    const periodFilterActive = isPeriodFilterActive(location)

    return (
      <div>
        <div className='content'>
          <div className='content-title content-title--modified'>Счетчик {metering.title}
            <sup className={classNames({'text-red': !metering.enabled})}>
              {metering.enabled ? ' вкл' : ' выкл'}
            </sup>
          </div>
          {
            // (!account.isOrg && accountSummary.data.lkk_exists)
            !account.isOrg && <div className='content-text-right'>
              <button className='content-link-uppercase' onClick={this.showForm}>ввести показания счетчика</button>
            </div>
          }
        </div>

        <SlideAnimation>
          {
            state.showForm
              ? (
                <div className='content metering-form'>
                  <form onSubmit={this.onSubmitMetering}>
                    <div className='l-two-cols l-two-cols-group-param l-two-cols-valign-top'>
                      <div className='l-two-cols-col'>
                        <Label>Ввести показания</Label>
                        <Input autoFocus name='meterValue' value={state.meterValue} onChange={this.changeInput} />
                        {state.error && <ErrorMessage>{state.error}</ErrorMessage>}
                      </div>
                      <div className='l-two-cols-col'>
                        <Label>дата ввода показания</Label>
                        <InputDate
                          dayPickerProps={{
                            disabledDays: (day) => day > (new Date())
                          }}
                          onDayChange={
                            (day) => {
                              this.setState({meterDate: day})
                            }
                          }
                          value={formatDate(state.meterDate, 'DD.MM.YYYY')}
                        />
                      </div>
                    </div>
                    <div className='content-text-center'>
                      <Button
                        disabled={state.sendLoading}
                        loading={state.sendLoading}
                        className='btn--modified'
                      >
                          Передать показания
                      </Button>
                      <br />
                      <button onClick={this.hideForm} type='button' className='content-link-uppercase'>Отмена</button>
                    </div>
                  </form>

                  <Animate
                    component={''}
                    transitionName='fade'
                  >
                    {
                      state.sent
                        ? (
                          <div className='metering-form__success'>
                            <div className='content-text-center'>
                              <div className='content-text-check'>
                                <CheckIcon size={11} color='inherit' /> Показания переданы
                                { this.renderCount(state.sentValue, state.prevValue, accountSummary.balance, state.cost) }
                              </div>
                            </div>
                          </div>
                        ) : null
                    }
                  </Animate>

                </div>
              )
              : null
          }
        </SlideAnimation>

        <div className='content content-bg-gray'>
          {
            meteringLoading
              ? <OverlaySpinner />
              : null
          }

          <div className='metering-table-header'>
            <div className='metering-table-header__wrap'>
              <div className='content-title-uppercase'>Предыдущие показания</div>
              <MediaQuery rule='screen and (min-width: 1279px)'>
                <div className='metering-table-filters'>
                  Показать данные за:{' '}
                  <NavLink
                    to={{ path: match.url, search: `date_start=${moment().subtract(1, 'month').format('YYYY-MM-DD')}` }}
                    isActive={(match, location) => {
                      return isFilterActive(location, 'date_start', moment().subtract(1, 'month').format('YYYY-MM-DD'))
                    }}
                  >
                    месяц
                  </NavLink>{' '}
                  <NavLink
                    to={{ path: match.url, search: `date_start=${moment().subtract(3, 'month').format('YYYY-MM-DD')}` }}
                    isActive={(match, location) => {
                      return isFilterActive(location, 'date_start', moment().subtract(3, 'month').format('YYYY-MM-DD'))
                    }}
                  >
                    квартал
                  </NavLink>{' '}
                  <NavLink
                    to={{ path: match.url, search: `date_start=${moment().subtract(1, 'year').format('YYYY-MM-DD')}` }}
                    isActive={(match, location) => {
                      return isFilterActive(location, 'date_start', moment().subtract(1, 'year').format('YYYY-MM-DD'))
                    }}
                  >
                    год
                  </NavLink>{' '}
                  <a
                    className={classNames('metering-period-toggle', { active: periodFilterActive })}
                    onClick={
                      () => {
                        if (!periodFilterActive) {
                          this.setState({
                            showFilterForm: !state.showFilterForm
                          })
                        }
                      }
                    }>
                    за период <ArrowBoldIcon size='0.4em' style={{ width: '10px', verticalAlign: 'center', transform: state.showFilterForm ? 'rotate(180deg)' : null }} />
                  </a>
                </div>
              </MediaQuery>
            </div>

            <SlideAnimation>
              {
                periodFilterActive || state.showFilterForm
                  ? (
                    <div>
                      <form onSubmit={this.onSubmitFilter} className='l-debts-filters'>
                        <InputDate onDayChange={
                          (day) => {
                            this.setState({selectedStartDay: day})
                          }
                        } value={formatDate(state.selectedStartDay, 'DD.MM.YYYY')} className='input-date--full-width' />
                        <InputDate onDayChange={
                          (day) => {
                            this.setState({selectedEndDay: day})
                          }
                        } value={formatDate(state.selectedEndDay, 'DD.MM.YYYY')} className='input-date--full-width' />
                        <Button
                          disabled={meteringLoading}
                          loading={meteringLoading}
                          className='btn--spinner-absolute'
                        >
                          Показать
                        </Button>
                      </form>
                    </div>
                  )
                  : null
              }
            </SlideAnimation>
          </div>

          { this.renderTable() }
        </div>
      </div>
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
    fetch (id, sort) {
      return dispatch(fetchMetering(id, sort))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeteringDetail)
