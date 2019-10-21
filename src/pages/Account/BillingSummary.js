import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import qs from 'qs'

import Spinner from '../../components/Loaders/Spinner'

import { formatBalance, strToAbsNum, stateToUrlParams } from '../../utils'

import { fetchBillingSummary } from '../../redux/account/actions'
import { fetchServices, fetchBudgets, fetchLocalities, fetchDistrictOperators, fetchConsumptionGroups } from '../../redux/forms/actions'

import Table from '../../components/Table'
import { TableDebtServices } from '../../components/TableDebtServices'
import AccordionLine from '../../components/AccordionLine'
import Template from '../../components/Template'
import { Select, Label, Checkbox } from '../../components/Form'
import { Button } from '../../components/Button'

class BillingSummary extends Component {
  constructor () {
    super()
    this.state = {
      loading: true,
      submitLoading: false,
      service_id: '',
      budget_id: '',
      district_operator_id: '',
      locality_id: '',
      consumption_group_id: '',
      filial_id: '',
      turnover_type: '',
      summarize: false
    }
  }

  componentWillMount () {
    const { location } = this.props
    if (location.search.length) {
      this.setState(qs.parse(location.search.replace(/^\?/, '')).filters)
    }
  }

  componentDidMount () {
    const { account, forms } = this.props
    const { loading, submitLoading, ...sendData } = this.state
    this.req = this.props.fetch(this.props.match.params.id, account.isOrg, stateToUrlParams(sendData))
    this.req.then(() => {
      if (account.isOrg) {
        axios.all([
          !forms.budgets && this.props.fetchBudgets(),
          !forms.services && this.props.fetchServices(),
          !forms.districtOperators && this.props.fetchDistrictOperators(),
          !forms.localities && this.props.fetchLocalities(),
          !forms.consumptionGroups && this.props.fetchConsumptionGroups()
        ]).then(() => {
          this.setState({
            loading: false
          })
        })
      } else {
        this.setState({loading: false})
      }
    })

    this.props.setBreadcrumbs(this.props.location)
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  onChange (stateField, value) {
    this.setState({ [stateField]: value })
  }

  onSubmit (e) {
    const { account, match, history } = this.props
    const { loading, submitLoading, ...sendData } = this.state
    e.preventDefault()
    this.setState({submitLoading: true})
    this.props.fetch(this.props.match.params.id, account.isOrg, stateToUrlParams(sendData))
      .then(() => {
        history.push(`${match.url}?${stateToUrlParams(sendData)}`)
        this.setState({submitLoading: false})
      })
  }

  render () {
    const { account, match, forms, user } = this.props
    const { state } = this

    if ((account.billingSummaryLoading && !account.isOrg) || this.state.loading) {
      return <div className='account-inner-spinner'><Spinner /></div>
    }

    const { accountSummary, billingSummary, isOrg } = account
    const { balance } = accountSummary
    const hasMeter = accountSummary.has_meter

    return (
      <Template>
        <div className='content content-bg-gray'>
          <div className='content-title'>Контроль задолженности</div>
          {
            balance && balance < 0 &&
              <div className='content-bg-gray-wrapper'>
                <div className='content-sub-title text-red'>
                  Долг: { formatBalance(strToAbsNum(balance)) }
                </div>
              </div>
          }
        </div>
        {
          isOrg ? (
            <Template>
              <AccordionLine title='Оплата' to={`${match.url}/payments`} />
              <div className='content'>
                <div className='content-title-uppercase'>Обороты по абонентам и услугам за период</div>
                <form onSubmit={e => this.onSubmit(e)}>
                  <div className='l-two-cols'>
                    <div className='l-two-cols-col'>
                      <Label>Услуга</Label>
                      <Select
                        onChange={(e) => this.onChange('service_id', e.target.value)}
                        value={state.service_id}>
                        <option value=''>Все услуги</option>
                        {
                          forms.services.map((service) => {
                            return (
                              <option key={service.id} value={service.id}>{service.title}</option>
                            )
                          })
                        }
                      </Select>
                    </div>
                    <div className='l-two-cols-col'>
                      <Label>Бюджет</Label>
                      <Select
                        onChange={(e) => this.onChange('budget_id', e.target.value)}
                        value={state.budget_id}>
                        >
                        <option value=''>Не выбран</option>
                        {
                          forms.budgets.map((budget) => {
                            return (
                              <option key={budget.id} value={budget.id}>{budget.title}</option>
                            )
                          })
                        }
                      </Select>
                    </div>
                    <div className='l-two-cols-col'>
                      <Label>Рэс</Label>
                      <Select
                        onChange={(e) => this.onChange('district_operator_id', e.target.value)}
                        value={state.district_operator_id}>
                        >
                        <option value=''>Не выбран</option>
                        {
                          forms.districtOperators.map((item) => {
                            return (
                              <option key={item.id} value={item.id}>{item.title}</option>
                            )
                          })
                        }
                      </Select>
                    </div>
                    <div className='l-two-cols-col'>
                      <Label>Район</Label>
                      <Select
                        onChange={(e) => this.onChange('locality_id', e.target.value)}
                        value={state.locality_id}>
                        >
                        <option value=''>Не выбран</option>
                        {
                          forms.localities.map((item) => {
                            return (
                              <option key={item.id} value={item.id}>{item.title}</option>
                            )
                          })
                        }
                      </Select>
                    </div>
                    <div className='l-two-cols-col'>
                      <Label>Гр. потр.</Label>
                      <Select
                        onChange={(e) => this.onChange('consumption_group_id', e.target.value)}
                        value={state.consumption_group_id}>
                        >
                        <option value=''>Не выбран</option>
                        {
                          forms.consumptionGroups.map((item) => {
                            return (
                              <option key={item.id} value={item.id}>{item.title}</option>
                            )
                          })
                        }
                      </Select>
                    </div>
                    <div className='l-two-cols-col'>
                      <Label>Филиал</Label>
                      <Select
                        onChange={(e) => this.onChange('filial_id', e.target.value)}
                        value={state.filial_id}>
                        >
                        <option value=''>Не выбран</option>
                        {
                          forms.filials.map((item) => {
                            return (
                              <option key={item.id} value={item.id}>{item.title}</option>
                            )
                          })
                        }
                      </Select>
                    </div>
                    <div className='l-two-cols-col'>
                      <Label>Сумма оборота</Label>
                      <Select
                        onChange={(e) => this.onChange('turnover_type', e.target.value)}
                        value={state.turnover_type}>
                        >
                        <option value=''>Не выбран</option>
                        <option value={0}>Полная</option>
                        <option value={1}>Частичная</option>
                        <option value={2}>НДС</option>
                      </Select>
                    </div>
                  </div>
                  <div className='content-text-center'>
                    <Button
                      className='btn--modified'
                      loading={state.submitLoading}
                    >
                      Обновить отчет
                    </Button>
                  </div>
                  <div className='content-text-center'>
                    <Checkbox
                      id='summarize'
                      label='Вывести общую сумму услуг'
                      checked={state.summarize}
                      value={state.summarize}
                      onChange={() => this.setState({summarize: !state.summarize})}
                    />
                  </div>
                </form>
              </div>
              <div className='content'>
                <TableDebtServices>
                  <tr className='table-debt-services__header'>
                    <th>Дебет <br />входящий</th>
                    <th>Кредит <br />входящий</th>
                    <th>Начислено</th>
                    <th>Оплачено</th>
                    <th>Дебет <br />исходящий</th>
                    <th>Кредит                       <br />исходящий</th>
                  </tr>
                  {
                    !billingSummary.length ? (
                      <tr className='table-debt-services_title'>
                        <td colSpan='6'>Ничего не найдено</td>
                      </tr>
                    ) : (
                      billingSummary.map((item, i) => {
                        return (
                          <Template key={`billingSummary-${i}`}>
                            <tr className='table-debt-services_title'>
                              <td colSpan='6'>{item.title}</td>
                            </tr>
                            <tr className='table-debt-services_column'>
                              <td><span>Дебет входящий</span>{formatBalance(item.saldo_in, 'р.')}</td>
                              <td><span>Кредит входящий</span>{formatBalance(item.saldo_in_credit, 'р.')}</td>
                              <td><span>Начислено</span>{formatBalance(item.charged, 'р.')}</td>
                              <td><span>Оплачено</span>{formatBalance(item.payed, 'р.')}</td>
                              {
                                item.saldo_out ? (
                                  <Template>
                                    <td><span>Дебет исходящий</span>{formatBalance(item.saldo_out, 'р.')}</td>
                                    <td><span>Кредит исходящий</span>{formatBalance(item.saldo_out.credit, 'р.')}</td>
                                  </Template>
                                ) : null
                              }
                            </tr>
                          </Template>
                        )
                      })
                    )
                  }
                </TableDebtServices>
              </div>
            </Template>
          ) : (
            <Template>
              <div className='content'>
                <Table>
                  <tr className='c-table__row--head'>
                    <th style={{ width: '30%' }}>Поставка газа</th>
                    { !hasMeter ? <th>Всего</th> : null }
                    <th>В т.ч. по счетч.</th>
                    <th>По пп. 549</th>
                  </tr>
                  <tr>
                    <td className='text-medium'>Сальдо</td>
                    { !hasMeter ? <td>{formatBalance(billingSummary.tariff_saldo_in)}</td> : null }
                    <td>{formatBalance(billingSummary.meter_saldo_in)}</td>
                    <td>{formatBalance(billingSummary.penalty_saldo_in)}</td>
                  </tr>
                  <tr>
                    <td className='text-medium'>Начислено</td>
                    { !hasMeter ? <td>{formatBalance(billingSummary.tariff_charged)}</td> : null }
                    <td>{formatBalance(billingSummary.meter_charged)}</td>
                    <td>{formatBalance(billingSummary.penalty_charged)}</td>
                  </tr>
                  <tr>
                    <td className='text-medium'>В т.ч. доначислено</td>
                    { !hasMeter ? <td>{formatBalance(billingSummary.tariff_additional_charged)}</td> : null }
                    <td>{formatBalance(billingSummary.meter_additional_charged)}</td>
                    <td>{formatBalance(billingSummary.penalty_additional_charged)}</td>
                  </tr>
                  <tr>
                    <td className='text-medium'>Льгота</td>
                    { !hasMeter ? <td>{formatBalance(billingSummary.tariff_benefits)}</td> : null }
                    <td>{formatBalance(billingSummary.meter_benefits)}</td>
                    <td>{formatBalance(billingSummary.penalty_benefits)}</td>
                  </tr>
                  <tr>
                    <td className='text-medium'>Оплачено</td>
                    { !hasMeter ? <td>{formatBalance(billingSummary.tariff_payed)}</td> : null }
                    <td>{formatBalance(billingSummary.meter_payed)}</td>
                    <td>{formatBalance(billingSummary.penalty_payed)}</td>
                  </tr>
                  <tr>
                    <td className='text-medium'>Сальдо</td>
                    { !hasMeter ? <td>{formatBalance(billingSummary.tariff_saldo_out)}</td> : null }
                    <td>{formatBalance(billingSummary.meter_saldo_out)}</td>
                    <td>{formatBalance(billingSummary.penalty_saldo_out)}</td>
                  </tr>
                </Table>
              </div>
              <div className='content'>
                <Table>
                  <tr className='c-table__row--head'>
                    <th style={{width: '30%'}}>Техническое обслуживание</th>
                    <th>Всего</th>
                  </tr>
                  <tr>
                    <td className='text-medium'>Сальдо</td>
                    <td>{formatBalance(billingSummary.tech_saldo_in)}</td>
                  </tr>
                  <tr>
                    <td className='text-medium'>Начислено</td>
                    <td>{formatBalance(billingSummary.tech_charged)}</td>
                  </tr>
                  <tr>
                    <td className='text-medium'>Оплачено</td>
                    <td>{formatBalance(billingSummary.tech_payed)}</td>
                  </tr>
                  <tr>
                    <td className='text-medium'>Сальдо</td>
                    <td>{formatBalance(billingSummary.tech_saldo_out)}</td>
                  </tr>
                </Table>
              </div>
              <AccordionLine to={`${match.url}/debts-by-months`} title='Долги по месяцам' >
                {
                  balance && balance < 0 && <div className='accordion-line-text'>
                    <div className='accordion-line-text_item text-red'>
                      Долг: { formatBalance(strToAbsNum(balance)) }
                    </div>
                  </div>
                }
              </AccordionLine>
            </Template>
          )
        }
      </Template>
    )
  }
}

const mapStateToProps = ({account, forms, user}) => {
  return {
    account,
    forms,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch (id, isOrg, query) {
      return dispatch(fetchBillingSummary(id, isOrg, query))
    },
    fetchBudgets () {
      return dispatch(fetchBudgets())
    },
    fetchServices () {
      return dispatch(fetchServices())
    },
    fetchLocalities () {
      return dispatch(fetchLocalities())
    },
    fetchDistrictOperators () {
      return dispatch(fetchDistrictOperators())
    },
    fetchConsumptionGroups () {
      return dispatch(fetchConsumptionGroups())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingSummary)
