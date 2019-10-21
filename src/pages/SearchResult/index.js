import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Pagination from 'react-js-pagination'

import { SearchResultCard } from '../../components/SearchResultCard'
import { OverlaySpinner } from '../../components/Loaders'

import { fetchAbonents, invalidateAbonents } from '../../redux/abonents/actions'
// import { fetchOrgs, invalidateOrgs } from '../../redux/organizations/actions'
import { invalidateBreadcrumbs, saveSearchQuery } from '../../redux/breadcrumbs/actions'
import { searchStringToURLParams } from '../../utils'
import { ABONENTS_LIMIT } from '../../api'
import { withApiError } from '../../components/ApiProvider'

class SearchResult extends Component {
  constructor (props) {
    super()

    this.state = {
      page: Number(searchStringToURLParams(props.location.search).get('page')) || 1,
      initialSearch: true
    }
  }

  fetch (queryString) {
    const { user, location: { pathname } } = this.props
    const query = searchStringToURLParams(queryString || this.props.location.search) || this.props.location.search
    const isOrg = pathname.indexOf('/organizations') !== -1 && user.roles.indexOf('ROLE_CALL_OPERATOR') < 0

    if (this.req) {
      this.req.cancel()
      this.req = null
    }

    this.setState({
      page: Number(query.get('page')) || 1
    })

    this.req = this.props.fetchAbonents(query, isOrg)

    this.props.saveSearchQuery(query.toString())

    this.req.catch(() => {
      this.props.invalidateAbonents({})
    })

    return this.req
  }

  goToPage (p) {
    const { location: { search, pathname }, history } = this.props

    const query = searchStringToURLParams(search)

    query.set('page', p)

    history.push(`${pathname}?${query}`)
  }

  componentDidMount () {
    this.fetch()

    this.props.invalidateBreadcrumbs()
  }

  componentDidUpdate (prevProps) {
    const { location } = this.props

    // FIXME: при изменении фильтров под прелоадером пишет «ничего не найдено». надо разобраться
    if (location && location.search !== prevProps.location.search) {
      this.fetch()
        .then(() => {
          this.setState({
            initialSearch: false
          })
        })
    }
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }

    // this.props.invalidateAbonents()
  }

  render () {
    const { abonents, isOrg, location: { pathname } } = this.props

    // if (!location.search) {
    //   return <div className='content-text-helper'>Воспользуйтесь фильтром для поиска абонента</div>
    // }

    let list

    if (abonents.items && abonents.items.length) {
      list = abonents.items.map((account) => <SearchResultCard isOrg={isOrg} path={pathname} key={account.id} {...account} />)
    } else {
      list = <div>Ничего не найдено</div>
      // !this.state.initialSearch ? <div>Ничего не найдено</div> : null
    }

    return (
      <div>
        <div style={{ minHeight: '50px' }}>
          { list }

          {
            abonents.fetching
              ? <OverlaySpinner />
              : null
          }
        </div>
        {
          abonents.total > ABONENTS_LIMIT
            ? (
              <Pagination
                activePage={this.state.page}
                itemsCountPerPage={ABONENTS_LIMIT}
                totalItemsCount={abonents.total}
                hideDisabled
                prevPageText='<'
                firstPageText='≪'
                nextPageText='>'
                lastPageText='≫'
                onChange={
                  (p) => {
                    this.goToPage(p)
                  }
                }
              />
            )
            : null
        }
      </div>
    )
  }
}

const mapStateToProps = ({ abonents, abonents: { isOrg }, user }) => {
  return {
    abonents,
    isOrg,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAbonents (queryString, isOrg) {
      return dispatch(fetchAbonents(queryString, isOrg))
    },

    invalidateAbonents () {
      dispatch(invalidateAbonents())
    },

    invalidateBreadcrumbs () {
      dispatch(invalidateBreadcrumbs())
    },

    saveSearchQuery (query) {
      dispatch(saveSearchQuery(query))
    }
  }
}

export default withApiError()(connect(mapStateToProps, mapDispatchToProps)(SearchResult))
