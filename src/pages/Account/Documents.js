import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Spinner from '../../components/Loaders/Spinner'
import AccordionLine from '../../components/AccordionLine'

import { fetchDocuments, fetchDocumentItem, fetchDocumentRemarks } from '../../redux/account/actions'
import { AccordionTable, AccordionHiddenRow } from '../../components/AccordionTable'
import { ArrowIcon } from '../../components/Icons'
import { Comment } from '../../components/Comment'
import Template from '../../components/Template'
import classNames from 'classnames'
import { formatDate } from '../../utils'

class Documents extends Component {
  constructor () {
    super()
    this.state = {
      activeRow: null
    }
  }
  componentDidMount () {
    const { location, match, account } = this.props

    this.req = this.props.fetch(match.params.id, account.isOrg)

    this.props.setBreadcrumbs(location)
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  onRowClick (index, id) {
    if (this.state.activeRow !== index) {
      this.setState({
        loadingDetail: true,
        activeRow: index,
        remarks: null
      })
      this.props.fetchDetail(id)
        .then(() => {
          this.props.fetchDocumentRemarks(id)
            .then(({data: { data }}) => this.setState({remarks: data}))
          this.setState({loadingDetail: false})
        })
    }
  }

  render () {
    const { account, match } = this.props
    const { state } = this
    const { documentItem } = account
    const noValue = '...'

    if (account.documentsLoading) {
      return <div className='account-inner-spinner'><Spinner /></div>
    }
    const { documents } = account

    return (
      <Template>
        <div className='content content-bg-gray'>
          <div className='content-title'>Договоры</div>
        </div>
        {
          account.isOrg ? (
            <div className='content content--officials'>
              <AccordionTable>
                <tr className='c-accordion-table__header'>
                  <th style={{width: '170px'}}>Номер договора</th>
                  <th>Наименование</th>
                  <th style={{width: '45%'}}>Услуга</th>
                  <th />
                </tr>
                {
                  documents.map((document, i) => {
                    return (
                      <Template key={`document-${i}`}>
                        <tr
                          id={`official-${i}`}
                          className={'c-accordion-table__row' + classNames({' active': state.activeRow === i})}
                          onClick={() => { this.onRowClick(i, document.id) }}
                        >
                          <td>
                            <div className='c-accordion-table__td-title'>Номер договора</div>
                            <div className='c-accordion-table__td'>{ document.number || '-' }</div>
                          </td>
                          <td><div className='c-accordion-table__td'>{ document.title }</div></td>
                          <td>
                            <div className='c-accordion-table__td'>
                              { (document.service && document.service.title) || '-' }
                            </div>
                          </td>
                          <td><div className='c-accordion-table__td'><ArrowIcon /></div></td>
                        </tr>
                        {
                          state.activeRow === i && <AccordionHiddenRow colSpan='4'>
                            {
                              account.documentItemLoading ? (
                                <div style={{textAlign: 'center'}}><Spinner /></div>
                              ) : (
                                <Template>
                                  <div className='l-two-cols'>
                                    <div className='l-two-cols-col'>
                                      <table>
                                        <tbody>
                                          <tr >
                                            <td className='c-accordion-table__hidden-cont-name'>Обслуживающая организация</td>
                                            <td className='c-accordion-table__hidden-cont-value'>
                                              {
                                                (documentItem.ext_organization &&
                                                  documentItem.ext_organization.title) || 'Мособлгаз'
                                              }
                                            </td>
                                          </tr>
                                          <tr >
                                            <td className='c-accordion-table__hidden-cont-name'>Дата начала</td>
                                            <td className='c-accordion-table__hidden-cont-value'>
                                              {
                                                documentItem.date_start
                                                  ? formatDate(documentItem.date_start)
                                                  : noValue
                                              }
                                            </td>
                                          </tr>
                                          <tr >
                                            <td className='c-accordion-table__hidden-cont-name'>Дата окончания</td>
                                            <td className='c-accordion-table__hidden-cont-value'>
                                              {
                                                documentItem.date_end
                                                  ? formatDate(documentItem.date_end)
                                                  : noValue
                                              }
                                            </td>
                                          </tr>
                                          <tr >
                                            <td className='c-accordion-table__hidden-cont-name'>Список филиалов</td>
                                            <td className='c-accordion-table__hidden-cont-value'>
                                              {
                                                documentItem.filial_list || noValue
                                              }
                                            </td>
                                          </tr>
                                          <tr >
                                            <td className='c-accordion-table__hidden-cont-name'>Дата подписания</td>
                                            <td className='c-accordion-table__hidden-cont-value'>
                                              {
                                                documentItem.date_signed
                                                  ? formatDate(documentItem.date_signed)
                                                  : noValue
                                              }
                                            </td>
                                          </tr>
                                          <tr >
                                            <td className='c-accordion-table__hidden-cont-name'>Дата пролонгации</td>
                                            <td className='c-accordion-table__hidden-cont-value'>
                                              {
                                                documentItem.date_prolong
                                                  ? formatDate(documentItem.date_prolong)
                                                  : noValue
                                              }
                                            </td>
                                          </tr>
                                          <tr >
                                            <td className='c-accordion-table__hidden-cont-name'>Кол-во мес. автопролонгации</td>
                                            <td className='c-accordion-table__hidden-cont-value'>
                                              {
                                                documentItem.months_prolong || noValue
                                              }
                                            </td>
                                          </tr>
                                          <tr >
                                            <td className='c-accordion-table__hidden-cont-name'>Дата ввода договора</td>
                                            <td className='c-accordion-table__hidden-cont-value'>
                                              {
                                                documentItem.date_add
                                                  ? formatDate(documentItem.date_add)
                                                  : noValue
                                              }
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div className='l-two-cols-col'>
                                      <table>
                                        <tbody>
                                          <tr >
                                            <td className='c-accordion-table__hidden-cont-name'>Ставка налога</td>
                                            <td className='c-accordion-table__hidden-cont-value'>
                                              {
                                                documentItem.tax || noValue
                                              }
                                            </td>
                                          </tr>
                                          <tr >
                                            <td className='c-accordion-table__hidden-cont-name'>Вид договора</td>
                                            <td className='c-accordion-table__hidden-cont-value'>
                                              {
                                                (documentItem.type && documentItem.type.title) || noValue
                                              }
                                            </td>
                                          </tr>
                                          <tr >
                                            <td className='c-accordion-table__hidden-cont-name'>Статус договора</td>
                                            <td className='c-accordion-table__hidden-cont-value'>
                                              {
                                                documentItem.status || noValue
                                              }
                                            </td>
                                          </tr>
                                          <tr >
                                            <td className='c-accordion-table__hidden-cont-name'>Исполнитель работ</td>
                                            <td className='c-accordion-table__hidden-cont-value'>
                                              {
                                                documentItem.controller || noValue
                                              }
                                            </td>
                                          </tr>
                                          <tr >
                                            <td className='c-accordion-table__hidden-cont-name'>Способ расчета перебора лимита</td>
                                            <td className='c-accordion-table__hidden-cont-value'>
                                              {
                                                documentItem.calc_type === 1 ? 'по договору' : 'по узлам подключения'
                                              }
                                            </td>
                                          </tr>
                                          <tr >
                                            <td className='c-accordion-table__hidden-cont-name'>Группа ТО</td>
                                            <td className='c-accordion-table__hidden-cont-value'>
                                              {
                                                documentItem.group || noValue
                                              }
                                            </td>
                                          </tr>
                                          <tr >
                                            <td className='c-accordion-table__hidden-cont-name'>Суточный перебор лимита</td>
                                            <td className='c-accordion-table__hidden-cont-value'>
                                              {
                                                documentItem.daily_limit_check ? 'Да' : 'Нет'
                                              }
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div className='c-accordion-table__hidden-footer'>
                                    {/* <div className='content-text-center'>
                                      <Link className='content-link-uppercase' to={`${match.url}/${document.id}/calculation`}>Расшифровка взаиморасчетов</Link>
                                    </div> */}
                                    <div className='content-text-center'>
                                      <Link className='content-link-uppercase' to={`${match.url}/${document.id}/attachments`}>Приложение к договору</Link>
                                    </div>
                                  </div>
                                </Template>
                              )
                            }
                          </AccordionHiddenRow>
                        }
                      </Template>
                    )
                  })
                }
              </AccordionTable>
            </div>
          ) : (
            documents.map((item) => {
              return (
                <AccordionLine to={`${match.url}/${item.id}`} key={item.id} title={item.title} >
                  {
                    item.number && <div className='accordion-line-text'>
                      <div className='accordion-line-text_item'>Номер договора: {item.number}</div>
                    </div>
                  }
                </AccordionLine>
              )
            })
          )}
        {
          account.isOrg && state.activeRow !== null && state.remarks && state.remarks.length
            ? <div className='content content--modified'>
              {
                state.remarks.map(({id, ...remark}) => (
                  <Comment key={`remark-${id}`} {...remark} />
                ))
              }
            </div>
            : null
        }
      </Template>
    )
  }
}

const mapStateToProps = ({ account }) => {
  return {
    account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch (id, isOrg) {
      return dispatch(fetchDocuments(id, isOrg))
    },
    fetchDetail (id) {
      return dispatch(fetchDocumentItem(id))
    },
    fetchDocumentRemarks (id) {
      return dispatch(fetchDocumentRemarks(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents)
