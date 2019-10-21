import React from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import qs from 'qs'
import classNames from 'classnames'
import { searchStringToURLParams, formatDate } from '../../utils'
import { SlideAnimation } from '../Animation'
import { ArrowBoldIcon } from '../Icons'
import { InputDate } from '../Form'
import { Button } from '../Button'
import MediaQuery from '../MediaQuery'

import './TableFilter.css'

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

export default class TableFilter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showFilterForm: false
    }
  }

  componentWillUpdate (nextProps) {
    const prevLocation = this.props.location
    const { location } = nextProps

    if (prevLocation.search !== location.search) {
      this.props.onChange(searchStringToURLParams(location.search))
      this.setState({
        showFilterForm: false
      })
      this.onSubmitFilter = this.onSubmitFilter.bind(this)
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

  render () {
    const { state } = this
    const { match, className, location, loading } = this.props
    const periodFilterActive = isPeriodFilterActive(location)
    return (
      <div className={className}>
        <div className='metering-table-filters'>
          <MediaQuery rule='screen and (min-width: 780px)'><span>Показать данные за:{' '}</span></MediaQuery>
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
        <SlideAnimation>
          {
            periodFilterActive || state.showFilterForm
              ? (
                <div>
                  <form onSubmit={e => this.onSubmitFilter(e)} className='l-debts-filters'>
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
                      disabled={loading}
                      loading={loading}
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
    )
  }
}
