import React, { Component } from 'react'
import { connect } from 'react-redux'
import intersection from 'lodash/intersection'

import { Select, Input, Label, InputDate } from '../Form'
import { Button } from '../Button'

import { pluralize, formatDate } from '../../utils/index'
import accounting from 'accounting'

import './SearchForm.css'
import Suggestions from '../Dadata/Suggestions'

class OrgsSearchForm extends Component {
  constructor ({ initialFilters, user }) {
    super()

    this.state = {
      filial_id: (user.filial && user.filial.id) || '',
      title: '',
      address: '',
      contract: '',
      meter_factory_num: '',
      document_type_id: '',
      contract_renewal_needed: '',
      ...initialFilters
    }
  }

  saveInput (name, val) {
    this.setState({
      [name]: val
    })
  }

  render () {
    const { filials, docTypes, onSubmit, total, fetching, user } = this.props

    return (
      <form className='c-filter' onSubmit={(e) => { onSubmit(e, this.state) }}>
        <div className='l-filter-line'>
          <Label>Филиал</Label>
          <Select
            disabled={intersection(['ROLE_WEBSAUPG_USER'], user.roles).length || fetching}
            value={this.state.filial_id}
            onChange={(e) => { this.saveInput('filial_id', e.target.value) }}
          >
            <option value=''>Все филиалы</option>
            {
              filials.map((filial) => {
                return <option key={filial.id} value={filial.id}>{ filial.title }</option>
              })
            }
          </Select>
        </div>
        <div className='l-filter-line'>
          <Label>Адрес</Label>
          <Suggestions
            inputProps={{
              value: this.state.address,
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
        <div className='l-filter-line l-filter-line--two-col'>
          <div className='l-filter-line__col'>
            <Label>Лицевой счет</Label>
            <Input
              value={this.state.contract}
              disabled={fetching}
              onChange={(e) => { this.saveInput('contract', e.target.value) }}
            />
          </div>
          <div className='l-filter-line__col'>
            <Label>№ счетчика</Label>
            <Input
              value={this.state.meter_factory_num}
              disabled={fetching}
              onChange={(e) => { this.saveInput('meter_factory_num', e.target.value) }}
            />
          </div>
        </div>
        <div className='l-filter-line l-filter-line--two-col'>
          <div className='l-filter-line__col'>
            <Label>Тип договора</Label>
            <Select
              disabled={fetching}
              value={this.state.document_type_id}
              onChange={(e) => { this.saveInput('document_type_id', e.target.value) }}
            >
              <option value=''>Все организации</option>
              {
                docTypes.map((type) => {
                  return <option key={type.id} value={type.id}>{ type.title }</option>
                })
              }
            </Select>
          </div>
          <div className='l-filter-line__col'>
            <Label>Актуальность договора</Label>
            <Select
              disabled={fetching}
              value={this.state.contract_renewal_needed}
              onChange={(e) => { this.saveInput('contract_renewal_needed', e.target.value) }}
            >
              <option value=''>Актуальность договора</option>
              <option value='false'>Перезаключение не требуется</option>
              <option value='true'>Требуется перезаключение одного из договоров</option>
            </Select>
          </div>
        </div>
        <div className='l-filter-line l-filter-line--two-col'>
          <div className='l-filter-line__col'>
            <Label>Срок поверки оборудования</Label>
            <InputDate
              format='до DD.MM.YYYY'
              onDayChange={(day) => {
                this.setState({ nearest_check_date_end: day ? formatDate(day, 'YYYY-MM-DD') : '' })
              }}
              value={
                this.state.nearest_check_date_end
                  ? formatDate(this.state.nearest_check_date_end, 'до DD.MM.YYYY')
                  : 'Выберите дату'
              }
              className='input-date--full-width'
            />
          </div>
          <div className='l-filter-line__col'>
            <Label>Наименование организации</Label>
            <Input
              value={this.state.title}
              disabled={fetching}
              onChange={(e) => { this.saveInput('title', e.target.value) }}
            />
          </div>
        </div>
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

OrgsSearchForm.defaultProps = {
  filials: [],
  total: 0,
  fetching: false,
  onSubmit: () => {}
}

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}

export default connect(mapStateToProps, null)(OrgsSearchForm)
