import React, { Component } from 'react'
import { connect } from 'react-redux'

import './index.css'
import { ArrowIcon } from '../../components/Icons'

import { formatDate } from '../../utils'
import { fetchOfficials, fetchBankAccounts } from '../../redux/account/actions'
import classNames from 'classnames'

import { OverlaySpinner } from '../../components/Loaders'
import { AccordionTable, AccordionHiddenRow } from '../../components/AccordionTable'
import Template from '../../components/Template'
import MediaQuery from '../../components/MediaQuery'

class Officials extends Component {
  constructor () {
    super()
    this.state = {

    }
  }
  componentDidMount () {
    const { match } = this.props
    this.req = this.props.fetchOfficials(match.params.id)
    this.req.then(() => {
      this.props.fetchBankAccounts(match.params.id)
    })
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  render () {
    const { account: { officialsLoading, bankAccountsLoading, officials, bankAccounts } } = this.props
    const { state } = this
    if (officialsLoading || bankAccountsLoading) {
      return <OverlaySpinner />
    }
    return (
      <Template>
        <MediaQuery rule='screen and (min-width: 1280px)'>
          <div className='content content-bg-gray'>
            <div className='content-title'>Должностные лица, расчетные счета, дополнительная информация</div>
          </div>
        </MediaQuery>
        <div className='content-default-wrapper content--officials'>
          <div className='content-title-uppercase'>
            Должностные лица
          </div>
          <AccordionTable className='c-accordion-table--static'>
            <tr className='c-accordion-table__header'>
              <th style={{width: '300px'}}>Фамилия</th>
              <th>Телефон</th>
              <th>Должность</th>
              <th />
            </tr>
            {
              officials.map((item, i) => {
                return (
                  <Template key={`official-${i}`}>
                    <tr
                      id={`official-${i}`}
                      className={'c-accordion-table__row' + classNames({' active': state.officialsActiveRow === i})}
                      onClick={() => {
                        this.setState({officialsActiveRow: i})
                      }}
                    >
                      <td>
                        <div className='c-accordion-table__td-title'>Фамилия</div>
                        <div className='c-accordion-table__td'>{ item.name || '-' }</div>
                      </td>
                      <td>
                        <div className='c-accordion-table__td-title'>Телефон</div>
                        <div className='c-accordion-table__td'>{ item.phone }</div>
                      </td>
                      <td>
                        <div className='c-accordion-table__td-title'>Должность</div>
                        <div className='c-accordion-table__td'>
                          { item.position || '-' }
                        </div>
                      </td>
                      <td><div className='c-accordion-table__td'><ArrowIcon /></div></td>
                    </tr>
                    {
                      <AccordionHiddenRow colSpan='4'>
                        <table className='c-accordion-table__content'>
                          <tbody>
                            {
                              item.position_type && <tr>
                                <td>Тип должности</td>
                                <td>{ item.position_type }</td>
                              </tr>
                            }
                            {
                              item.doc_name && <tr>
                                <td>Документ основания</td>
                                <td>{ item.doc_name }</td>
                              </tr>
                            }
                            {
                              item.doc_date && <tr>
                                <td>Дата</td>
                                <td>{formatDate(item.doc_date, 'DD.MM.YYYY') }</td>
                              </tr>
                            }
                          </tbody>
                        </table>
                      </AccordionHiddenRow>
                    }
                  </Template>
                )
              })
            }
          </AccordionTable>
        </div>
        <div className='content-default-wrapper content--officials'>
          <div className='content-title-uppercase'>
            Реквизиты организации
          </div>
          {
            bankAccounts && <AccordionTable className='c-accordion-table--static'>
              <tr className='c-accordion-table__header'>
                <th style={{width: '300px'}}>Банк</th>
                <th>Услуга</th>
                <th>Расчетный счет</th>
                <th />
              </tr>
              {
                bankAccounts.map((item, i) => {
                  return (
                    <Template key={`bankAccounts-${i}`}>
                      <tr
                        className={'c-accordion-table__row' + classNames({' active': state.bankActiveRow === i})}
                        onClick={() => {
                          this.setState({bankActiveRow: i})
                        }}
                      >
                        <td>
                          <div className='c-accordion-table__td-title'>Банк</div>
                          <div className='c-accordion-table__td'>{ item.bank || '-' }</div>
                        </td>
                        <td>
                          <div className='c-accordion-table__td-title'>Услуга</div>
                          <div className='c-accordion-table__td'>{ (item.service && item.service.title) || '-' }</div>
                        </td>
                        <td>
                          <div className='c-accordion-table__td-title'>Расчетный счет</div>
                          <div className='c-accordion-table__td'>
                            { item.bank_account || '-' }
                          </div>
                        </td>
                        <td><div className='c-accordion-table__td'><ArrowIcon /></div></td>
                      </tr>
                      {
                        <AccordionHiddenRow colSpan='4'>
                          <table className='c-accordion-table__content'>
                            <tbody>
                              {
                                item.filial_bank && <tr>
                                  <td>Банк филиала</td>
                                  <td>{ item.filial_bank }</td>
                                </tr>
                              }
                              {
                                item.filial && <tr>
                                  <td>Абонент филиала</td>
                                  <td>{ item.filial.title }</td>
                                </tr>
                              }
                              {
                                item.filial_account && <tr>
                                  <td>Расчетный счет филиала</td>
                                  <td>{ item.filial_account }</td>
                                </tr>
                              }
                            </tbody>
                          </table>
                        </AccordionHiddenRow>
                      }
                    </Template>
                  )
                })
              }
            </AccordionTable>
          }
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
    fetchOfficials (id) {
      return dispatch(fetchOfficials(id))
    },
    fetchBankAccounts (id) {
      return dispatch(fetchBankAccounts(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Officials)
