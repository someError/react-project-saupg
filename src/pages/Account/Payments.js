import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.css'
import { ArrowIcon } from '../../components/Icons'
import { formatDate, formatBalance } from '../../utils'
import { fetchPayments } from '../../redux/account/actions'
import classNames from 'classnames'
import { OverlaySpinner } from '../../components/Loaders'
import { AccordionTable, AccordionHiddenRow } from '../../components/AccordionTable'
import TableFilter from '../../components/TableFilter'
import Template from '../../components/Template'
import MediaQuery from '../../components/MediaQuery'

class Officials extends Component {
  constructor () {
    super()
    this.state = {
      initialLoading: true,
      loading: false
    }
  }

  componentDidMount () {
    const {match} = this.props
    this.req = this.props.fetchPayments(match.params.id)
    let total = 0
    this.req.then(({data: {data}}) => {
      data && data.map((payment) => {
        total += Number(payment.value)
      })
      this.setState({
        total: total,
        initialLoading: false
      })
    })
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  render () {
    const { account: { payments }, match, location, history } = this.props
    const { state } = this
    if (state.initialLoading) {
      return <OverlaySpinner />
    }
    return (
      <Template>
        <div className='content content-bg-gray'>
          <div className='content-title'>Оплата абонента</div>
          <div className='content-bg-gray-wrapper'>
            <div className='content-sub-title'>
              Сумма всего: <span className='text-green'>{ formatBalance(state.total, 'руб.') }</span>
            </div>
          </div>
        </div>
        <div className='content'>
          {state.loading && <OverlaySpinner />}
          {/* <MediaQuery rule='screen and (min-width: 780px)'> */}
          <TableFilter
            className='table-filter'
            location={location}
            match={match}
            history={history}
            loading={state.loading}
            onChange={(query) => {
              this.setState({loading: true})
              this.req = this.props.fetchPayments(match.params.id, query)
              this.req.then(() => {
                this.setState({loading: false})
              })
            }}
          />
          {/* </MediaQuery> */}
          <AccordionTable className='c-accordion-table--with-top-border'>
            <tr className='c-accordion-table__header'>
              <th>Дата платежа</th>
              <th>Сумма, руб</th>
              <th>Наименование</th>
              <th>Код</th>
              <th>Вид оплаты</th>
              <th />
            </tr>
            {
              payments.map((item, i) => {
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
                        <div className='c-accordion-table__td-title'>Дата платежа</div>
                        <div className='c-accordion-table__td'>{ formatDate(item.date, 'DD.MM.YYYY') }</div>
                      </td>
                      <td><div className='c-accordion-table__td'>{ formatBalance(item.value, false) }</div></td>
                      <td><div className='c-accordion-table__td'>{ item.title || '-' }</div></td>
                      <td><div className='c-accordion-table__td'>{ item.document_code }</div></td>
                      <td><div className='c-accordion-table__td'>{ item.kind }</div></td>
                      <td><div className='c-accordion-table__td'><ArrowIcon /></div></td>
                    </tr>
                    {
                      state.officialsActiveRow === i && <AccordionHiddenRow colSpan='6'>
                        <table className='c-accordion-table__content'>
                          <tbody>
                            <MediaQuery rule='screen and (max-width: 767px)'>
                              <tr>
                                <td>Сумма, руб</td>
                                <td>{ formatBalance(item.value, false) }</td>
                              </tr>
                            </MediaQuery>
                            <MediaQuery rule='screen and (max-width: 1279px)'>
                              <tr>
                                <td>Наименование</td>
                                <td>{ item.title || '-' }</td>
                              </tr>
                            </MediaQuery>
                            <MediaQuery rule='screen and (max-width: 1279px)'>
                              <tr>
                                <td>Код</td>
                                <td>{ item.document_code }</td>
                              </tr>
                            </MediaQuery>
                            <MediaQuery rule='screen and (max-width: 1279px)'>
                              <tr>
                                <td>Вид оплаты</td>
                                <td>{ item.kind }</td>
                              </tr>
                            </MediaQuery>
                            {
                              item.pay_number && <tr>
                                <td>Номер платежного поручения</td>
                                <td>{ item.pay_number }</td>
                              </tr>
                            }
                            {
                              item.banderol_number && <tr>
                                <td>Номер бандероли</td>
                                <td>{ item.banderol_number }</td>
                              </tr>
                            }
                            {
                              item.title && <tr>
                                <td>Группа услуг</td>
                                <td>{ item.title }</td>
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
    fetchPayments (id, query) {
      return dispatch(fetchPayments(id, query))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Officials)
