import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchDistrictOperators } from '../../redux/forms/actions'

import { Select, Input, Label, InputPhone } from '../Form'
import { Button } from '../Button'

import { pluralize } from '../../utils/index'
import accounting from 'accounting'

import './SearchForm.css'
import Suggestions from '../Dadata/Suggestions'

class CallSearchForm extends Component {
  constructor ({ initialFilters, user }) {
    super()

    this.state = {
      filial_id: (user.filial && user.filial.id) || '',
      name: '',
      address: '',
      contract: '',
      meter_factory_num: '',
      district_operatior_id: '',
      phone: '',
      email: '',
      ...initialFilters
    }
  }

  saveInput (name, val, cb) {
    console.log(cb)
    this.setState({
      [name]: val
    }, () => cb && cb())
  }

  componentDidMount () {
    const { initialFilters, districtOperators } = this.props
    const filial = initialFilters && initialFilters.filial_id

    if (!districtOperators.length && filial) {
      this.props.fetchDistrictOperators(filial)
    }
  }

  render () {
    const { filials, onSubmit, total, fetching, districtOperators, user } = this.props
    const userFilial = user.filial && user.filial.id

    const disabled = this.props.disabled || fetching

    return (
      <form className='c-filter' onSubmit={(e) => {
        if (this.props.disabled) return
        onSubmit(e, this.state)
      }}>
        <div className='l-filter-line'>
          <Label>Филиал</Label>
          <Select
            disabled={userFilial || disabled}
            value={this.state.filial_id}
            onChange={(e) => {
              this.saveInput('filial_id', e.target.value, () => {
                this.state.filial_id
                  ? this.props.fetchDistrictOperators(this.state.filial_id)
                  : this.setState({ district_operatior_id: '' })
              })
            }}
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
          <Label>ФИО</Label>
          <Input
            value={this.state.name}
            disabled={disabled}
            onChange={(e) => { this.saveInput('name', e.target.value) }}
          />
        </div>
        <div className='l-filter-line'>
          <Label>Адрес</Label>
          <Suggestions
            inputProps={{
              value: this.state.address,
              disabled: disabled,
              onChange: (e, { newValue }) => { this.saveInput('address', newValue) }
            }}
            onSuggestionSelected={(e, { method }) => {
              if (method === 'enter') {
                e.preventDefault()
              }
            }}
          />
        </div>
        <div className='l-filter-line l-filter-line--modified l-filter-line--inner'>
          <Label>Лицевой счет</Label>
          <Input
            value={this.state.contract}
            disabled={disabled}
            onChange={(e) => { this.saveInput('contract', e.target.value) }}
          />
        </div>
        <div className='l-filter-line l-filter-line--modified'>
          <Label>№ счетчика</Label>
          <Input
            value={this.state.meter_factory_num}
            disabled={disabled}
            onChange={(e) => { this.saveInput('meter_factory_num', e.target.value) }}
          />
        </div>

        <div className='l-filter-line'>
          <Label>РЭС</Label>
          <Select
            disabled={disabled}
            value={this.state.district_operatior_id}
            onChange={(e) => { this.saveInput('district_operatior_id', e.target.value) }}
          >
            <option value=''>Без подразделения</option>
            {
              districtOperators.map(({ id, title }) => {
                return <option key={id} value={id}>{ title }</option>
              })
            }
          </Select>
        </div>

        <div className='l-filter-line'>
          <Label>Телефон</Label>
          <InputPhone
            value={this.state.phone}
            disabled={disabled}
            onChange={(e) => { this.saveInput('phone', e.target.value) }}
          />
        </div>

        <div className='l-filter-line'>
          <Label>Электронная почта</Label>
          <Input
            value={this.state.email}
            disabled={disabled}
            onChange={(e) => { this.saveInput('email', e.target.value) }}
          />
        </div>

        <Button disabled={disabled} className='btn--fill'>Найти</Button>
        {
          total
            ? <div className='found-total'><b>{ accounting.formatNumber(total, 0, ' ') }</b> { pluralize(total, 'результат', 'результата', 'результатов') }</div>
            : null
        }
      </form>
    )
  }
}

CallSearchForm.defaultProps = {
  filials: [],
  districtOperators: [],
  total: 0,
  fetching: false,
  onSubmit: () => {}
}

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDistrictOperators: filialId => (dispatch(fetchDistrictOperators(filialId)))
})

export default connect(mapStateToProps, mapDispatchToProps)(CallSearchForm)
