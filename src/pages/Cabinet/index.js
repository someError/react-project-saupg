import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Route,
  Redirect,
  NavLink
} from 'react-router-dom'
import moment from 'moment'

import subscribeToRabbit from '../../utils/rabbitConnection'
import api from '../../api'

import { OverlaySpinner } from '../../components/Loaders'
import { pickBy, identity, isEqual } from 'lodash'
import intersection from 'lodash/intersection'
import { mergeQueryStrings, searchStringToURLParams } from '../../utils'
import qs from 'qs'

import Layout from '../../layouts'
import SearchResult from '../SearchResult'
import Account from '../Account'
import Requests from '../Requests'
import MainPage from '../../pages/Main'
import { Header } from '../../components/Header'
import { HeaderInner } from '../../components/HeaderInner'
import { AbonentsSearchForm, OrgsSearchForm } from '../../components/SearchForm'
import { CloseIcon } from '../../components/Icons'
import Template from '../../components/Template'
import MediaQuery from '../../components/MediaQuery'

import { SearchResultCard } from '../../components/SearchResultCard'

import store from 'store'
import _store from '../../redux/store'

import { fetchFilials, fetchHouseCategories, fetchOrgCategories, fetchDocTypes, fetchDistrictOperators } from '../../redux/forms/actions'
import { fetchUserInfo, invalidateUserInfo } from '../../redux/user/actions'
import { invalidateBreadcrumbs } from '../../redux/breadcrumbs/actions'
import { fetchOpenRequests } from '../../redux/requests/actions'
import { withApiError } from '../../components/ApiProvider/index'

const ABONENTS_SORTING = {
  'sort=name&direction=asc': 'фамилии от А до Я',
  'sort=name&direction=desc': 'фамилии от Я до А',
  'sort=balance&direction=asc': 'долгу',
  'sort=contract&direction=asc': 'лицевому счёту',
  'sort=area&direction=asc': 'площади по возр.',
  'sort=area&direction=desc': 'площади по убыв.'
}
const ORGS_SORTING = {
  'sort=title&direction=asc': 'наим. от А до Я',
  'sort=title&direction=desc': 'наим. от Я до А',
  'sort=balance&direction=asc': 'долгу',
  'sort=contract&direction=asc': 'лицевому счёту'
}

const ABONENTS_DEFAULT_SORTING = 'sort=name&direction=asc'

const ORGS_DEFAULT_SORTING = 'sort=title&direction=asc'

function isOrg (pathname) {
  return (/^\/organizations/).test(pathname)
}

function getActiveSorting (searchQueryString, pathname) {
  const urlParams = searchStringToURLParams(searchQueryString)

  const sortParams = []

  const sortParam = urlParams.get('sort')
  const directionParam = urlParams.get('direction')

  if (sortParam) {
    sortParams.push(`sort=${sortParam}`)
  }

  if (directionParam) {
    sortParams.push(`direction=${directionParam}`)
  }

  let defaultSorting = ABONENTS_DEFAULT_SORTING
  if (isOrg(pathname)) {
    defaultSorting = ORGS_DEFAULT_SORTING
  }

  return sortParams.length > 0 ? sortParams.join('&') : defaultSorting
}

class Cabinet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sorting: ABONENTS_SORTING,
      defaultSorting: ABONENTS_DEFAULT_SORTING,
      callCenterAccess: false
    }
  }

  getRecentCall (id) {
    const { history } = this.props
    api.getRecentCall(id).then(({ data: { data } }) => {
      if (data.calls[0]) {
        const _time = (moment(data.calls[0].date_ended).valueOf() + (data.time_recent * 1000) - moment().valueOf())
        this.setState({lastCardProps: true})
        _store.dispatch({
          type: 'INCOMING_PHONE',
          payload: { incoming_phone: data.calls[0] }
        })

        this.timeout = window.setTimeout(() => {
          store.set('lastCardProps', null)
          this.setState({lastCardProps: false})
          history.push('/')
          this.props.invalidateBreadcrumbs()
        }, _time)
      } else {
        store.set('lastCardProps', null)
        this.setState({lastCardProps: false})
      }
    })
  }

  subscribeToRabbit (id) {
    const { history, location: { search }, user } = this.props
    return subscribeToRabbit(id, (m) => {
      const _data = JSON.parse(m.body)
      window.clearTimeout(this.timeout)

      this.setState({ callCenterAccess: !_data.date_ended })
      _store.dispatch({
        type: 'INCOMING_PHONE',
        payload: { incoming_phone: _data }
      })

      if (!_data.date_ended && _data.incoming_abonents && _data.incoming_abonents.length && _data.incoming_phone) {
        const query = searchStringToURLParams(search)
        query.set('filters[phone]', _data.incoming_phone)
        history.push(`/search?${query}`)
      }

      if (_data.date_ended) {
        this.getRecentCall(user.id)

        if (this.state.pathname === '/search') {
          history.push('/')
        }
      }
    }, (err) => { console.log(err) })
  }

  componentDidMount () {
    const { location: { pathname, search }, history } = this.props
    if (isOrg(pathname)) {
      this.setState({
        sorting: ORGS_SORTING,
        defaultSorting: ORGS_DEFAULT_SORTING
      })
    }
    this.props.fetchRequests('limit=0&filters[status]=open')
    this.req = this.props.fetchUserInfo()
    this.req.then(({ data: { data } }) => {
      data.filial && data.filial.id && this.props.fetchDistrictOperators(data.filial.id)
      this.props.fetchFilials()
      this.props.fetchHouseCategories()
      this.props.fetchDocTypes()
      this.props.fetchOrgCategories()
      const user = data
      const isCallOperator = user.roles && user.roles.indexOf('ROLE_CALL_OPERATOR') !== -1

      isCallOperator && api.getActiveCall(user.id)
        .then(({ data: { data }, status }) => {
          this.setState({ pathname })

          this.subscribeToRabbit(user.id)

          if (status === 204) {
            this.getRecentCall(user.id)
          }

          _store.dispatch({
            type: 'INCOMING_PHONE',
            payload: { incoming_phone: data }
          })

          if (data) {
            this.setState({ callCenterAccess: true })
            if (data.incoming_abonents && data.incoming_abonents.length && data.incoming_phone) {
              const query = searchStringToURLParams(search)
              query.set('filters[phone]', data.incoming_phone)
              history.push(`/search?${query}`)
            }
          }
        })
        .catch(err => {
          console.log(err, 'error getActive')

          this.subscribeToRabbit(user.id)
        })
    })
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }

    this.props.invalidateUserInfo()
  }

  componentWillReceiveProps (nextProps, nextState) {
    const { location: {pathname} } = this.props
    const isCallOperator = nextProps.user.roles && nextProps.user.roles.indexOf('ROLE_CALL_OPERATOR') !== -1

    if (pathname !== nextProps.location.pathname) {
      isCallOperator && this.setState({ pathname: nextProps.location.pathname })
      if (isOrg(pathname)) {
        this.setState({
          sorting: ORGS_SORTING,
          defaultSorting: ORGS_DEFAULT_SORTING
        })
      } else {
        this.setState({
          sorting: ABONENTS_SORTING,
          defaultSorting: ABONENTS_DEFAULT_SORTING
        })
      }
      // TODO: не помню зачем это тут, возможно нужно, пока что закоментил
      this.props.fetchRequests('limit=0&filters[status]=open')
    }
  }

  getPath () {
    const { location } = this.props
    const _pathArr = location.pathname.split('/')
    let _path = _pathArr[1]
    if (!_path.length || _path === 'account' || _path === 'search') {
      _path = ''
    } else {
      _path = '/' + _path
    }
    if (_path.indexOf('/search') < 0) {
      _path = _path + '/search'
    }
    return _path
  }

  renderSortingOptions (basicSortQuery, props = {}) {
    return Object.keys(this.state.sorting).map((key) => {
      return (
        <NavLink
          key={key}
          isActive={(...args) => getActiveSorting(basicSortQuery, this.props.location.pathname) === key}
          to={`${this.getPath()}?${mergeQueryStrings(basicSortQuery, key)}`}
          className={props.className || 'dropdown-menu__item'}
        >
          {this.state.sorting[key]}
        </NavLink>
      )
    })
  }

  onFilterSubmit (e, filters, callback) {
    const { history, location } = this.props
    e.preventDefault()
    const nextFilters = pickBy(filters, identity)
    const parsedQS = qs.parse(location.search.replace(/^\?/, ''))
    const currentFilters = parsedQS.filters

    console.log('wtf')
    // TODO: возможно не надо так запрещать. посмотрим
    // if (!isEqual(nextFilters, currentFilters)) {
    // this.props.invalidateAbonents()
    history.push(`${this.getPath()}?${qs.stringify({ filters: nextFilters, sort: parsedQS.sort, direction: parsedQS.direction })}`)
    // }

    this.setState({
      showMobileFilter: false
    })
  }

  render () {
    const { state } = this
    const { fetchingFilials, fetchingHouseCategories, fetchingDocTypes, fetchingDistrictOperators, districtOperators, filials, docTypes, houseCategories, location, hasFound, breadcrumbs, user } = this.props
    const userFilial = user.filial && user.filial.id
    const FETCHING = fetchingFilials || fetchingHouseCategories || fetchingDocTypes || (userFilial && fetchingDistrictOperators)

    if (FETCHING || !user.roles) {
      return <OverlaySpinner />
    }

    const abonentFilters = {
      filials: filials,
      houseCategories: houseCategories,
      districtOperators
    }

    const orgsFilters = {
      filials: filials,
      docTypes: docTypes
    }

    let isCallOperator = user.roles && user.roles.indexOf('ROLE_CALL_OPERATOR') !== -1

    if (!store.get('token')) {
      return <Redirect to={{
        pathname: '/auth',
        state: {
          ref: `${location.pathname}${location.search || ''}`
        }
      }} />
    }

    const lastCardProps = store.get('lastCardProps')

    if (!user.roles) return <OverlaySpinner />

    if (!isCallOperator && location.pathname === '/') {
      return (
        <Template>
          <HeaderInner location={location} />
          <MainPage />
        </Template>
      )
    }

    return (
      <Template>
        {
          isCallOperator ? <Header /> : <HeaderInner location={location} />
        }
        <Layout
          searchDisabled={isCallOperator && !state.callCenterAccess}
          hasSort={hasFound && location.pathname.indexOf('/search') + 1}
          breadcrumbs={breadcrumbs}
          sorting={this.state.sorting}
          getActiveSorting={getActiveSorting}
          onFilterSubmit={(e, filters) => this.onFilterSubmit(e, filters)}
          abonentFilters={abonentFilters}
          orgsFilters={orgsFilters}
        >
          {
            isCallOperator && state.callCenterAccess &&
              <Route
                path='/'
              />
          }
          {
            isCallOperator ? (
              [
                <Route exact key='main-page' path='/' render={() => <Template>
                  {
                    state.callCenterAccess
                      ? <div className='content-text-helper'>Воспользуйтесь фильтром для поиска абонента</div>
                      : (state.lastCardProps && lastCardProps)
                        ? <Template>
                          <div className='content-text-helper' style={{marginBottom: '20px'}}>Абонент доступный для просмотра</div>
                          <SearchResultCard {...lastCardProps} path={this.props.location.pathname} />
                        </Template>
                        : <div className='content-text-helper'>Поиск по абонентам недоступен</div>
                  }
                </Template>} />,
                <Route key='/search' path='/search' component={SearchResult} />,
                <Route key='/account/:id' path='/account/:id' component={Account} />
              ]
            ) : (
              [
                <Route key='/abonents/account/:id' path='/abonents/account/:id' component={Account} />,
                <Route key='/organizations/account/:id' path='/organizations/account/:id' component={Account} />,
                <Route key='/organizations' exact path='/organizations' render={() => {
                  return (
                    <Template>
                      <MediaQuery rule='screen and (min-width: 1280px)'>
                        <Template>
                          <div className='content-title content-title--with-descr'>Предприятия и организации</div>
                          <div className='content-text-helper'>Воспользуйтесь фильтром для поиска абонента</div>
                        </Template>
                      </MediaQuery>
                      <div className='white-block'>
                        <NavLink className='white-block__back' to='/'><CloseIcon size='14px' /></NavLink>
                        <OrgsSearchForm onSubmit={(e, filters) => this.onFilterSubmit(e, filters)} {...orgsFilters} />
                      </div>
                    </Template>
                  )
                }} />,
                <Route exact key='/abonents' path='/abonents' render={() => {
                  return (
                    <Template>
                      <MediaQuery rule='screen and (min-width: 1280px)'>
                        <Template>
                          <div className='content-title content-title--with-descr'>Абоненты</div>
                          <div className='content-text-helper'>Воспользуйтесь фильтром для поиска абонента</div>
                        </Template>
                      </MediaQuery>
                      <div className='white-block'>
                        <NavLink className='white-block__back' to='/'><CloseIcon size='14px' /></NavLink>
                        <AbonentsSearchForm onSubmit={(e, filters) => this.onFilterSubmit(e, filters)} {...abonentFilters} />
                      </div>
                    </Template>
                  )
                }} />,
                <Route key='/organizations/search' path='/organizations/search' component={SearchResult} />,
                <Route key='/abonents/search' path='/abonents/search' component={SearchResult} />
              ]
            )
          }
          {
            !intersection(['ROLE_WEBSAUPG_USER'], user.roles).length
              ? <Route path='/requests' component={Requests} />
              : null
          }
        </Layout>
      </Template>
    )
  }
}

const mapStateToProps = ({ forms, abonents, breadcrumbs, user }) => {
  return {
    filials: forms.filials,
    houseCategories: forms.houseCategories,
    orgCategories: forms.orgCategories,
    docTypes: forms.docTypes,
    districtOperators: forms.districtOperators,
    fetchingDocTypes: forms.fetchingDocTypes,
    fetchingFilials: forms.fetchingFilials,
    fetchingDistrictOperators: forms.fetchingDistrictOperators,
    fetchingHouseCategories: forms.fetchingHouseCategories,
    hasFound: abonents.items && abonents.items.length,
    breadcrumbs,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFilials: function () {
      return dispatch(fetchFilials())
    },
    fetchHouseCategories: function () {
      return dispatch(fetchHouseCategories())
    },
    fetchOrgCategories: function () {
      return dispatch(fetchOrgCategories())
    },
    fetchDocTypes: function () {
      return dispatch(fetchDocTypes())
    },
    fetchDistrictOperators: function (filialId) {
      return dispatch(fetchDistrictOperators(filialId))
    },
    fetchUserInfo: function () {
      return dispatch(fetchUserInfo())
    },
    invalidateUserInfo: function () {
      return dispatch(invalidateUserInfo())
    },
    fetchRequests: function (filters) {
      return dispatch(fetchOpenRequests(filters))
    },
    invalidateBreadcrumbs () {
      return dispatch(invalidateBreadcrumbs())
    }
  }
}

export default withApiError(true)(connect(mapStateToProps, mapDispatchToProps)(Cabinet))
