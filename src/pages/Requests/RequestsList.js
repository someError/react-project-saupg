import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { REQUESTS_LIMIT } from '../../api'
import { searchStringToURLParams } from '../../utils'
import classNames from 'classnames'
import { setBreadcrumbs } from '../../redux/breadcrumbs/actions'
import { fetchUpdateFields } from '../../redux/requests/actions'
import OverlaySpinner from '../../components/Loaders/OverlaySpinner'
import RequestCard from '../../components/RequestCard'
import AccordionLine from '../../components/AccordionLine'
import { ArrowBoldIcon, ArrowIcon } from '../../components/Icons'
import MediaQuery from '../../components/MediaQuery'
import { NavLink } from 'react-router-dom'

class Requests extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: Number(searchStringToURLParams(props.location.search).get('page')) || 1,
      initialSearch: true,
      tapToBreak: false,
      pageCount: Math.ceil(props.requests.total / REQUESTS_LIMIT) || 1,
      status: 'open'
    }
    this.goToPage = this.goToPage.bind(this)
    this.onBreakClick = this.onBreakClick.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { location: { search }, status, fetchRequests, match } = this.props
    const query = searchStringToURLParams(search)
    if (status !== nextProps.status) {
      this.setState({initialSearch: true})
      let _status = nextProps.status
      if (nextProps.moreStatus) {
        _status += `,${nextProps.moreStatus}`
      }
      query.set('filters[status]', _status)
      if (match.params.id) {
        query.set('filters[abonent][id]', match.params.id)
      }
      this.req = fetchRequests(query)
      this.req.then(({ data: { data } }) => {
        this.setState({
          pageCount: Math.ceil(data.meta.total / REQUESTS_LIMIT),
          initialSearch: false
        })
        this.props.setBreadcrumbs(this.props.location)
      })
    }
  }

  componentDidMount () {
    const { props } = this
    const { location: { search }, status, fetchRequests, match, moreStatus } = props
    const query = searchStringToURLParams(search)
    let _status = status
    if (moreStatus) {
      _status += `,${moreStatus}`
    }
    query.set('filters[status]', _status)
    if (match.params.id) {
      query.set('filters[abonent][id]', match.params.id)
    }
    this.req = fetchRequests(query)
      .then(({ data: { data } }) => {
        this.setState({
          pageCount: Math.ceil(data.meta.total / REQUESTS_LIMIT),
          initialSearch: false
        })
        this.props.setBreadcrumbs(this.props.location)
      })
  }

  componentDidUpdate (prevProps) {
    const { location, status, fetchRequests, match, moreStatus } = this.props

    if (location && (location.search !== prevProps.location.search)) {
      const query = searchStringToURLParams(location.search)
      let _status = status
      if (moreStatus) {
        _status += `,${moreStatus}`
      }
      query.set('filters[status]', _status)
      if (match.params.id) {
        query.set('filters[abonent][id]', match.params.id)
      }
      this.req = fetchRequests(query)
        .then(() => {
          this.setState({
            initialSearch: false,
            tapToBreak: false
          })
        })
    }
  }

  goToPage (data) {
    if (!this.state.initialSearch) {
      const curPage = data.selected
      const { location: { search }, history, match } = this.props

      const query = searchStringToURLParams(search)
      query.set('page', curPage + 1)
      history.push(`${match.url}?${query}`)
    }
  }

  breakTo (e, pos) {
    const { location: { search }, history, match } = this.props
    const query = searchStringToURLParams(search)
    const parentEl = e.target.parentNode
    let nextPage = Number(parentEl.nextSibling.children[0].innerHTML) - 2
    if (pos === 'right') {
      nextPage = Number(parentEl.previousSibling.children[0].innerHTML) + 2
    }

    query.set('page', nextPage)
    this.setState({
      tapToBreak: true,
      page: nextPage
    })
    history.push(`${match.url}?${query}`)
  }

  onBreakClick (e) {
    e.preventDefault()
    const { location: { search } } = this.props
    const breakButtons = this.refs.pagination.getElementsByClassName('break-btn')
    const elementArray = Array.prototype.slice.call(breakButtons)
    const index = elementArray.indexOf(e.target)
    const query = searchStringToURLParams(search)
    const selectedPage = Number(query.get('page'))
    if ((elementArray.length > 1)) {
      if (index === 0) {
        this.breakTo(e, 'left')
      } else {
        this.breakTo(e, 'right')
      }
    } else {
      if (selectedPage > this.state.pageCount / 2) {
        this.breakTo(e, 'left')
      } else {
        this.breakTo(e, 'right')
      }
    }
  }

  getSearchParam (param) {
    const query = searchStringToURLParams(this.props.location.search)
    return query.get(param)
  }

  render () {
    const { state, props } = this
    const { requests, history, location, mainPath } = props

    if (requests.accountListLoading && this.state.initialSearch) {
      return <OverlaySpinner />
    }

    const backUrl = props.status === 'open' ? '/' : '/requests'
    const urlParams = searchStringToURLParams(location.search)
    urlParams.delete('page')

    return (
      <div>
        <MediaQuery rule='screen and (max-width: 1279px)'>
          <div className='head-line'>
            <div className='head-line-left'>
              <NavLink to={backUrl} className='btn-back'>
                <ArrowIcon size={8} />
                {props.status === 'open' ? 'Меню' : 'Заявки на изменение данных'}
              </NavLink>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery rule='screen and (min-width: 1280px)'>
          <div>
            <div className='content-title content-title--requests'>
              { props.status === 'open' ? 'Заявки на изменение данных' : 'Отклоненнные заявки' }
            </div>
            <div className='l-requests-filter'>
              <span className='dropdown dropdown-toggle' onClick={() => {
                const query = searchStringToURLParams(location.search)
                const direction = this.getSearchParam('direction')
                if (!direction || direction === 'asc') {
                  query.set('direction', 'desc')
                } else {
                  query.set('direction', 'asc')
                }
                history.push({
                  search: '?' + query
                })
              }}>
            по дате { props.status === 'open' ? 'добавления ' : 'отклонения ' }
                <ArrowBoldIcon
                  className={classNames({'icon--rotate': this.getSearchParam('direction') === 'desc'})}
                  size='0.4em'
                  style={{ width: '10px' }} />
              </span>
            </div>
          </div>
        </MediaQuery>
        <div className='l-requests'>
          { requests.accountListLoading && <OverlaySpinner /> }
          {
            requests.items.length ? requests.items.map((request) => {
              return (
                <RequestCard
                  key={request.id}
                  detail={`${classNames(mainPath)}/requests/${request.id}`}
                  date={request.date_created}
                  status={request.status.key}
                  onReview={props.status === 'open'}
                  contract={request.abonent.contract}
                  totalFields={request.fields_total}
                  author={request.user_creator.full_name}
                >
                  <div className='request-card__title'>{ request.abonent.name }</div>
                  <div className='request-card__content-bot'>
                    {request.abonent.data && request.abonent.data.address && <div>{request.abonent.data.address}</div>}
                    {request.abonent.contract && <div className='card-user__id'>№{request.abonent.contract}</div>}
                    { props.status === 'rejected' && <div className='text-red'>Отклонено</div> }
                  </div>
                </RequestCard>
              )
            }) : (
              <div className='content-default-wrapper content-text-medium'>Заявки отсутствуют</div>
            )
          }
          {
            requests.total > REQUESTS_LIMIT
              ? (
                <div ref='pagination' className='c-break-pagination'>
                  <ReactPaginate
                    initialPage={state.page - 1}
                    forcePage={state.page - 1}
                    previousClassName='c-break-pagination__prev-btn'
                    nextClassName='c-break-pagination__next-btn'
                    previousLabel='Предыдущая'
                    nextLabel='Следующая'
                    breakLabel={<a href='#' className='break-btn' onClick={this.onBreakClick}>...</a>}
                    breakClassName={'c-break-pagination__dot'}
                    pageCount={state.pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    pageClassName='c-break-pagination__dot'
                    onPageChange={(data) => this.goToPage(data)}
                    containerClassName='c-break-pagination'
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'} />
                </div>
              )
              : null
          }
        </div>
        <AccordionLine
          className='accordion-line--simple'
          to={
            `${classNames(mainPath)}/requests${classNames({'/rejected': props.status === 'open'})}${location.search ? '?' + urlParams.toString() : ''}`
          }
          title={props.status === 'open' ? 'Отклоненные заявки' : 'Открытые заявки'} />
      </div>
    )
  }
}

const mapStateToProps = ({ requests, user, breadcrumbs }) => {
  return {
    requests,
    user,
    breadcrumbs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRequests (filters) {
      return dispatch(fetchUpdateFields(filters))
    },
    setBreadcrumbs (location, titles) {
      dispatch(setBreadcrumbs(location, titles))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Requests)
