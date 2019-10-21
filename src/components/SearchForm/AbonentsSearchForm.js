import React, { Component } from 'react'
import { connect } from 'react-redux'
import intersection from 'lodash/intersection'

import { fetchDistrictOperators } from '../../redux/forms/actions'

import { Select, Input, Label, InputDate, InputPhone } from '../Form'
import { Button } from '../Button'

import { pluralize, formatDate } from '../../utils'
import accounting from 'accounting'

import './SearchForm.css'
import Suggestions from '../Dadata/Suggestions'

class AbonentsSearchForm extends Component {
  constructor ({ initialFilters, user }) {
    super()
    this.state = {
      filial_id: (user.filial && user.filial.id) || '',
      house_category_id: '',
      name: '',
      address: '',
      flat: '',
      contract: '',
      meter_factory_num: '',
      contract_renewal_needed: '',
      phone: '',
      email: '',
      district_operatior_id: '',
      debt_limit: '',
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
    const { filials, houseCategories, onSubmit, total, fetching, user, districtOperators } = this.props
    const userFilial = user.filial && user.filial.id
    console.log(this.state)

    return (
      <form className='c-filter' onSubmit={(e) => { onSubmit(e, this.state) }}>
        <div className='l-filter-line'>
          <Label>Филиал</Label>
          <Select
            disabled={userFilial || fetching}
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
                return <option key={filial.id} value={filial.id}>{filial.title}</option>
              })
            }
          </Select>
        </div>
        <div className='l-filter-line'>
          <Label>Категория жилья</Label>
          <Select
            disabled={fetching}
            value={this.state.house_category_id}
            onChange={(e) => { this.saveInput('house_category_id', e.target.value) }}
          >
            <option value=''>Любая</option>
            {
              houseCategories.map((category) => {
                return <option key={category.id + 'h-cat'} value={category.id}>{category.title}</option>
              })
            }
          </Select>
        </div>
        <div className='l-filter-line'>
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
        <div className='l-filter-line'>
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
        <div className='l-filter-line'>
          <Label>ФИО</Label>
          <Input
            value={this.state.name}
            disabled={fetching}
            onChange={(e) => { this.saveInput('name', e.target.value) }}
          />
        </div>
        <div className='l-filter-line l-filter-line--two-col'>
          <div className='l-filter-line__col'>
            <Label>Адрес</Label>
            <Suggestions
              inputProps={{
                value: this.state.address,
                disabled: fetching,
                onChange: (e, {newValue}) => { this.saveInput('address', newValue) }
              }}
              onSuggestionSelected={(e, {method}) => {
                if (method === 'enter') {
                  e.preventDefault()
                }
              }}
            />
          </div>
          <div className='l-filter-line__col'>
            <Label>Квартира</Label>
            <Input
              value={this.state.flat}
              disabled={fetching}
              onChange={(e) => { this.saveInput('flat', e.target.value) }}
            />
          </div>
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
            <Label>РЭС</Label>
            <Select
              disabled={fetching || !districtOperators.length || !this.state.filial_id}
              value={this.state.district_operatior_id}
              onChange={(e) => { this.saveInput('district_operatior_id', e.target.value) }}
            >
              <option value=''>Без подразделения</option>
              {
                districtOperators.map(({ id, title }) => {
                  return <option key={id} value={id}>{title}</option>
                })
              }
            </Select>
          </div>
          <div className='l-filter-line__col'>
            <Label>Телефон</Label>
            <InputPhone
              value={this.state.phone}
              disabled={fetching}
              onChange={(e) => { this.saveInput('phone', e.target.value) }}
            />
          </div>
        </div>

        <div className='l-filter-line l-filter-line--two-col'>
          <div className='l-filter-line__col'>
            <Label>Электронная почта</Label>
            <Input
              value={this.state.email}
              disabled={fetching}
              onChange={(e) => { this.saveInput('email', e.target.value) }}
            />
          </div>
        </div>

        <Button disabled={fetching} className='btn--fill'>Найти</Button>
        {
          total
            ? <div className='found-total'>
              <b>{accounting.formatNumber(total, 0, ' ')}</b> {pluralize(total, 'результат', 'результата', 'результатов')}
            </div>
            : null
        }
      </form>
    )
  }
}

AbonentsSearchForm.defaultProps = {
  filials: [],
  houseCategories: [],
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

export default connect(mapStateToProps, mapDispatchToProps)(AbonentsSearchForm)
