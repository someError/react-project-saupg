import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from '../../components/Loaders/Spinner'
import RequestCard from '../../components/RequestCard'
import classNames from 'classnames'
import ForRoles from '../../components/ForRoles'
import { fetchUpdateFields, fetchUpdateFieldDetail, invalidateRequestList } from '../../redux/requests/actions'
import { pluralize, searchStringToURLParams } from '../../utils'

class RequestsListAside extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidUpdate (nextProps) {
    if (this.props.requests.accountDetail && this.state.loading) {
      this.setState({ loading: false })
      const { requests: { accountDetail: { status, abonent } }, location: { search }, match } = this.props
      const query = searchStringToURLParams(search)
      query.set('filters[status]', status.key)
      if (match.url.split('/').indexOf('account') > -1) {
        query.set('filters[abonent]', abonent.id)
      }
      if (this.state.status) {
        query.set('filters[status]', this.state.status)
      }
      this.req = this.props.fetchRequests(query)
      if (!this.state.status) {
        this.req.then(() => this.setState({ status: status.key }))
      }
    }
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  componentWillMount () {
    this.props.invalidateRequestList()
  }

  goTo (e, status) {
    e.preventDefault()
    this.setState({
      loading: true,
      status: status
    })
  }

  render () {
    const { state } = this
    const { requests, match } = this.props
    const { accountListLoading } = requests

    if (accountListLoading) {
      return <div className='account-inner-spinner l-main-left'><Spinner /></div>
    }

    const _urlArr = match.url.split('/')
    _urlArr.pop()
    const _path = _urlArr.join('/')
    return (
      <div className='l-main-left l-main-left--request'>
        {requests.items.map((request) => {
          return (
            <RequestCard
              key={request.id}
              detail={`${_path}/${request.id}`}
              small
            >
              <ForRoles roles={['ROLE_SAUPG_EXECUTOR']} >
                <div>
                  <div className='request-card__title'>{ request.abonent.name }</div>
                  <div className='request-card__content-bot'>
                    <div>
                      Всего { request.fields_total } { pluralize(request.fields_total, 'изменение', 'изменения', 'изменений') }
                    </div>
                  </div>
                </div>
              </ForRoles>
              <ForRoles roles={['ROLE_CALL_OPERATOR']} >
                <div>
                  <div className='request-card__title'>
                    Всего { request.fields_total } { pluralize(request.fields_total, 'изменение', 'изменения', 'изменений') }
                  </div>
                  <div className='request-card__content-bot'>
                    <div className={classNames({'text-red': request.status.key === 'rejected'})}>{ request.status.title }</div>
                  </div>
                </div>
              </ForRoles>
            </RequestCard>
          )
        })}
        {state.status !== 'rejected' &&
          <a href='#' onClick={(e) => this.goTo(e, 'rejected')} className='request-card request-card--small'>
            <div className='request-card__title'>Отклоненные заявки</div>
          </a>
        }
        {state.status !== 'open' &&
        <a href='#' onClick={(e) => this.goTo(e, 'open')} className='request-card request-card--small'>
          <div className='request-card__title'>Открытые заявки</div>
        </a>
        }
        {(state.status !== 'draft') &&
        <a href='#' onClick={(e) => this.goTo(e, 'draft')} className='request-card request-card--small'>
          <div className='request-card__title'>Чероновики</div>
        </a>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ requests, user }) => {
  return {
    requests,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRequests (filters) {
      return dispatch(fetchUpdateFields(filters))
    },
    fetchDetailRequest (id) {
      return dispatch(fetchUpdateFieldDetail(id))
    },
    invalidateRequestList () {
      return dispatch(invalidateRequestList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestsListAside)
