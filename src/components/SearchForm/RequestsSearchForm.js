import React, { Component } from 'react'

import { Select, Input, Label } from '../Form'
import { Button } from '../Button'
import qs from 'qs'

import { stateToUrlParams, pluralize } from '../../utils/index'
import accounting from 'accounting'
import classNames from 'classnames'

import './SearchForm.css'
import Suggestions from '../Dadata/Suggestions'

const LABELS = {
  name: 'ФИО',
  contract: 'Лицевой счет',
  title: 'Название организации',
  address: 'Адрес',
  flat: 'Квартира',
  inn: 'ИНН',
  okpo: 'ОКПО',
  ogrn: 'ОГРН'
}

const abonentState = {
  name: '',
  address: '',
  flat: '',
  contract: ''
}

const orgState = {
  title: '',
  address: '',
  contract: '',
  inn: '',
  okpo: '',
  ogrn: ''
}

class RequestsSearchForm extends Component {
  constructor () {
    super()
    this.state = {
      filters: Object.assign({}, abonentState),
      parent: 'abonent',
      filial: ''
    }
  }

  saveInput (name, val) {
    const newState = this.state.filters
    newState[name] = val
    this.setState({
      filters: newState
    })
  }

  onSubmit (e) {
    const {history, location: { pathname }} = this.props
    e.preventDefault()
    let path = '/requests'
    if (pathname.indexOf('/rejected') !== -1) path = '/requests/rejected'
    const query = stateToUrlParams(this.state.filters, `[${this.state.parent}]`)
    if (this.state.filial !== '') {
      query.set('filters[filial]', this.state.filial)
    }
    if (query.toString() === '') {
      query.set('filters[legal_type]', this.state.parent)
    }
    history.push(`${path}?${query}`)
  }

  componentWillMount () {
    const searchObj = qs.parse(this.props.location.search.replace(/^\?/, '')).filters
    if (searchObj && (searchObj.abonent || searchObj.legal_type === 'abonent')) {
      this.setState({filters: Object.assign(abonentState, searchObj.abonent)})
    }
    if (searchObj && (searchObj.organization || searchObj.legal_type === 'organization')) {
      this.setState({
        filters: Object.assign(orgState, searchObj.organization),
        parent: 'organization'
      })
    }
  }

  render () {
    const { filials, total, fetching } = this.props

    return (
      <form className='c-filter' onSubmit={(e) => this.onSubmit(e)}>
        <div className='c-filter__switch'>
          <a href='#' className={classNames({'active': this.state.parent === 'abonent'})} onClick={(e) => {
            e.preventDefault()
            if (this.state.parent !== 'abonent') {
              this.setState({
                parent: 'abonent',
                filters: Object.assign({}, abonentState)
              })
            }
          }}>Физ. лица</a>
          <a href='#' className={classNames({'active': this.state.parent === 'organization'})} onClick={(e) => {
            e.preventDefault()
            if (this.state.parent !== 'organization') {
              this.setState({
                parent: 'organization',
                filters: Object.assign({}, orgState)
              })
            }
          }}>Юр. лица</a>
        </div>
        <div className='l-filter-line'>
          <Label>Филиал</Label>
          <Select
            disabled={fetching}
            value={this.state.filial_id}
            onChange={(e) => { this.setState({filial: e.target.value}) }}
          >
            <option value=''>Все филиалы</option>
            {
              filials.map((filial) => {
                return <option key={filial.id} value={filial.id}>{ filial.title }</option>
              })
            }
          </Select>
        </div>
        {
          Object.keys(this.state.filters).map((key) => {
            if (key === 'address') {
              return (
                <div key={key} className='l-filter-line'>
                  <Label>{LABELS[key]}</Label>
                  <Suggestions
                    inputProps={{
                      value: this.state.filters.address,
                      disabled: fetching,
                      onChange: (e, { newValue }) => { this.saveInput('address', newValue) }
                    }}
                    onSuggestionSelected={(e, { method }) => {
                      if (method === 'enter') {
                        e.preventDefault()
                      }
                    }}
                  />
                </div>
              )
            }
            return (
              <div key={key} className='l-filter-line'>
                <Label>{LABELS[key]}</Label>
                <Input
                  value={this.state.filters[key]}
                  disabled={fetching}
                  onChange={(e) => { this.saveInput(key, e.target.value) }}
                />
              </div>
            )
          })
        }

        <Button disabled={fetching} className='btn--fill'>Найти</Button>
        {
          total
            ? <div className='found-total'><b>{ accounting.formatNumber(total, 0, ' ') }</b> { pluralize(total, 'результат', 'результата', 'результатов') }</div>
            : null
        }
      </form>
    )
  }
}

export default RequestsSearchForm
