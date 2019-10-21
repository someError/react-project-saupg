import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import './index.css'

import { formatDate } from '../../utils'

import { fetchDocCalculation } from '../../redux/account/actions'
import { Select } from '../../components/Form'
import { Button } from '../../components/Button'

import { OverlaySpinner } from '../../components/Loaders'
import Template from '../../components/Template'

class DocumentCalculation extends Component {
  constructor () {
    super()
    this.state = {
      month: moment().month(),
      year: moment().year()
    }
  }
  componentDidMount () {
    const { match } = this.props
    this.req = this.props.fetchDocCalculation(match.params.id)
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  onSubmit (e) {
    e.preventDefault()
    const { year, month } = this.state
    const { history, match } = this.props
    let sendMonth = month
    if (Number(year) === moment().year() && Number(month) > moment().month()) {
      sendMonth = '01'
    }
    history.push(`${match.url}?date=${formatDate(`${this.state.year}-${sendMonth}-01`, 'YYYY-MM-DD')}`)
  }

  onChange (name, e) {
    this.setState({[name]: e.target.value})
  }

  render () {
    const { account: { docCalculationLoading } } = this.props
    const months = moment.months()
    const curMonth = moment().month()
    const years = []
    const curYear = moment().year()
    if (docCalculationLoading) {
      return <OverlaySpinner />
    }
    for (let i = 2007; i <= moment().year(); i++) {
      years.push(i)
    }
    return (
      <Template>
        <div className='content content-bg-gray'>
          <div className='content-title'>Расшифровка взаиморасчетов по договору</div>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <div className='l-two-cols'>
              <div className='l-two-cols-col'>
                <Select
                  value={this.state.month}
                  onChange={e => this.onChange('month', e)}
                >
                  {
                    months.map((month, i) => {
                      if (i + 1 > curMonth && Number(this.state.year) === curYear) return false
                      return <option key={`month-${month}`} value={i + 1}>{month}</option>
                    })
                  }
                </Select>
              </div>
              <div className='l-two-cols-col'>
                <Select
                  value={this.state.year}
                  onChange={e => this.onChange('year', e)}
                >
                  {
                    years.map((year) => {
                      return <option key={`year-${year}`} value={year}>{year}</option>
                    })
                  }
                </Select>
              </div>
            </div>
            <div className='content-text-center'><Button>Показать расшифровку</Button></div>
          </form>
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
    fetchDocCalculation (id, date) {
      return dispatch(fetchDocCalculation(id, date))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentCalculation)
