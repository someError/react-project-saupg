import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from '../../components/Loaders/Spinner'
import { Comment } from '../../components/Comment'

import { fetchDocumentItem, fetchDocumentRemarks } from '../../redux/account/actions'
import { formatDate } from '../../utils'

class DocumentDetail extends Component {
  constructor () {
    super()
    this.state = {}
  }

  componentDidMount () {
    const { location, match } = this.props

    this.req = this.props.fetch(match.params.id)
    this.req
      .then(({ data: { data } }) => {
        this.props.setBreadcrumbs(location, { [data.id]: data.title })
      })

    this.props.fetchDocumentRemarks(match.params.id)
      .then(({data: { data }}) => this.setState({remarks: data}))
  }

  componentWillMount () {
    const { account: {isOrg}, history, mainPath } = this.props
    isOrg && history.push(mainPath + '/documents')
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  render () {
    const { account } = this.props

    if (account.documentItemLoading) {
      return <div className='account-inner-spinner'><Spinner /></div>
    }

    const { documentItem } = account

    return (
      <div>
        <div className='content'>
          <div className='content-title content-title--inner'>{ documentItem.title }</div>
          <div className='content-text-default'>Номер договора { documentItem.number }</div>
          {/* sapog-61
            <div className='content-text-right'>
              <Link to='#' className='content-link-uppercase'>Скачать копию договора</Link>
            </div>
          */}
        </div>
        <div className='content'>
          <div className='l-two-cols'>
            {
              documentItem.services && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>Услуга</div>
                <div className='content-text-medium'>{ documentItem.services }</div>
              </div>
            }
            {
              documentItem.date_prolong && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>Дата пролонгации</div>
                <div className='content-text-medium'>{ formatDate(documentItem.date_prolong) }</div>
              </div>
            }
            {
              documentItem.filial_list && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>Список филиалов</div>
                <div className='content-text-medium'>{ documentItem.filial_list }</div>
              </div>
            }
            {
              documentItem.months_prolong && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>Количество мес. пролонгаций</div>
                <div className='content-text-medium'>{ documentItem.months_prolong}</div>
              </div>
            }
            {
              documentItem.date_signed && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>Дата подписания</div>
                <div className='content-text-medium'>{ formatDate(documentItem.date_signed) }</div>
              </div>
            }
            {
              documentItem.tax && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>Ставка налога</div>
                <div className='content-text-medium'>{ documentItem.tax }</div>
              </div>
            }
            {
              documentItem.date_end && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>Дата окончания</div>
                <div className='content-text-medium'>{ formatDate(documentItem.date_end) }</div>
              </div>
            }
            {
              documentItem.date_begin && <div className='l-two-cols-col'>
                <div className='content-text-uppercase'>Дата ввода договора</div>
                <div className='content-text-medium'>{ formatDate(documentItem.date_begin) }</div>
              </div>
            }
          </div>
        </div>
        {
          this.state.remarks && this.state.remarks.length
            ? <div className='content'>
              {
                this.state.remarks.map(({id, ...remark}) => (
                  <Comment {...remark} key={`remark-${id}`} />
                ))
              }
            </div>
            : null
        }
      </div>
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
    fetch (id) {
      return dispatch(fetchDocumentItem(id))
    },
    fetchDocumentRemarks (id) {
      return dispatch(fetchDocumentRemarks(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetail)
