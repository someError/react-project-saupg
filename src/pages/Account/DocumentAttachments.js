import React, { Component } from 'react'
import { connect } from 'react-redux'
import api from '../../api'
import axios from 'axios'

import './index.css'
import { ArrowIcon } from '../../components/Icons'

import { fetchDocCalculation } from '../../redux/account/actions'
import classNames from 'classnames'

import { OverlaySpinner } from '../../components/Loaders'
import { AccordionTable, AccordionHiddenRow } from '../../components/AccordionTable'
import Template from '../../components/Template'

class DocumentAttachments extends Component {
  constructor () {
    super()
    this.state = {
      attachments: null,
      attachmentsLoading: true
    }
  }
  componentWillMount () {
    const { match } = this.props
    axios.all([
      api.getDocAttachments(match.params.id, 'supply'),
      api.getDocAttachments(match.params.id, 'techServiceFact'),
      api.getDocAttachments(match.params.id, 'techServiceTariff')
    ]).then((json) => {
      json.map((attachments) => {
        if (!attachments.data.data.length) {
          return false
        } else {
          this.setState({
            attachments: attachments.data.data
          })
        }
      })
      this.setState({attachmentsLoading: false})
    })
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  render () {
    const { state: {attachmentsLoading, attachments, activeRow} } = this
    if (attachmentsLoading) {
      return <OverlaySpinner />
    }
    return (
      <Template>
        <div className='content content-bg-gray'>
          <div className='content-title'>Приложения к договорам</div>
        </div>
        <div className='content'>
          <AccordionTable className='c-accordion-table--static'>
            <tr className='c-accordion-table__header'>
              <th>Объект</th>
              <th>Прибор, оборудование</th>
              <th />
            </tr>
            {
              attachments && attachments.map((item, i) => {
                return (
                  <Template key={`attachment-${i}`}>
                    <tr
                      id={`attachment-${i}`}
                      className={'c-accordion-table__row' + classNames({' active': activeRow === i})}
                      onClick={() => {
                        this.setState({activeRow: i})
                      }}
                    >
                      <td>
                        <div className='c-accordion-table__td-title'>Объект</div>
                        <div className='c-accordion-table__td'>
                          { item.object ? item.object.title : '-' }
                        </div>
                      </td>
                      <td>
                        <div className='c-accordion-table__td-title'>Прибор, оборудование</div>
                        <div className='c-accordion-table__td'>
                          { item.equipment ? item.equipment.title : '-' }
                        </div>
                      </td>
                      <td><div className='c-accordion-table__td'><ArrowIcon /></div></td>
                    </tr>
                    {
                      <AccordionHiddenRow colSpan='3'>
                        <table className='c-accordion-table__content'>
                          <tbody>
                            {
                              item.object && <tr>
                                <td>Код объекта</td>
                                <td>{ item.object.code }</td>
                              </tr>
                            }
                            {
                              item.service && <tr>
                                <td>Услуга</td>
                                <td>{ item.service.title }</td>
                              </tr>
                            }
                            {
                              item.tariff && <tr>
                                <td>Тариф</td>
                                <td>{ item.tariff }</td>
                              </tr>
                            }
                            {
                              item.tax && <tr>
                                <td>Ставка НДС</td>
                                <td>{ item.tax }</td>
                              </tr>
                            }
                            {
                              item.months && <tr>
                                <td>Число мес.</td>
                                <td>{ item.months }</td>
                              </tr>
                            }
                            {
                              item.koeff && <tr>
                                <td>Дополнительный коэфф.</td>
                                <td>{ item.koeff }</td>
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
    fetchDocCalculation (id, date) {
      return dispatch(fetchDocCalculation(id, date))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentAttachments)
