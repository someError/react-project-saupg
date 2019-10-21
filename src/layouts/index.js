import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink, Route, Switch } from 'react-router-dom'
import intersection from 'lodash/intersection'
import qs from 'qs'
import classNames from 'classnames'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Dropdown } from '../components/Dropdown'
import { AbonentsSearchForm, OrgsSearchForm, CallSearchForm, RequestsSearchForm } from '../components/SearchForm'
import RequestsListAside from '../components/RequestsListAside/index'
import MediaQuery from '../components/MediaQuery'

import { Fab } from '../components/Button'
import { MobileSortIcon, SearchIcon } from '../components/Icons'
import OverlayMobileMenu from '../components/OverlayMobileMenu'

import { invalidateAbonents } from '../redux/abonents/actions'
import { invalidateOrgs } from '../redux/organizations/actions'
import { mergeQueryStrings, deleteParams } from '../utils'
import Template from '../components/Template'

const NO_ASIDE_PAGES = [
  // '/requests',
  // '/requests/rejected'
]

const ONE_COLUMN_PAGES = [
  '/organizations',
  '/abonents'
]

function checkForAside (path) {
  return NO_ASIDE_PAGES.indexOf(path) !== -1
}

function checkForOneColumn (path) {
  return ONE_COLUMN_PAGES.indexOf(path) !== -1
}

class Layout extends Component {
  constructor () {
    super()

    this.state = {
      showMobileFilter: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location !== nextProps.location) {
      this.setState({
        showMobileFilter: false
      })
    }
  }

  componentDidUpdate () {
    if (this.state.showMobileFilter) {
      document.body.classList.add('portal-opened')
    } else {
      document.body.classList.remove('portal-opened')
    }
  }

  getPath () {
    const { location } = this.props
    let _path = location.pathname
    if (_path === '/') {
      _path = ''
    }
    if (_path.indexOf('/search') < 0) {
      _path = _path + '/search'
    }
    return _path
  }

  renderSortingOptions (basicSortQuery, props = {}) {
    const {sorting, getActiveSorting, location} = this.props
    return Object.keys(sorting).map((key) => {
      return (
        <NavLink
          key={key}
          isActive={(...args) => getActiveSorting(basicSortQuery, location.pathname) === key}
          to={`${this.getPath()}?${mergeQueryStrings(basicSortQuery, key)}`}
          className={props.className || 'dropdown-menu__item'}
        >
          {sorting[key]}
        </NavLink>
      )
    })
  }

  render () {
    const { props } = this
    const { breadcrumbs, totalAbonents, location, fetchingAbonents, abonentFilters, orgsFilters,
      hasSort, user, onFilterSubmit, history } = props

    const { search } = location
    const basicSortQuery = deleteParams(search, 'page').toString()

    const pathArr = location.pathname.split('/')
    // const showFab = pathArr.indexOf('requests') === -1

    let isCallOperator = user.roles.indexOf('ROLE_CALL_OPERATOR') !== -1

    const callSearchForm = <div className='l-main-column l-main-left l-filter' style={{ display: this.state.showMobileFilter ? 'block' : null }}>
      <CallSearchForm
        disabled={props.searchDisabled}
        initialFilters={qs.parse(location.search.replace(/^\?/, '')).filters}
        fetching={fetchingAbonents}
        total={totalAbonents}
        onSubmit={onFilterSubmit}
        filials={this.props.filials}
      />
    </div>

    const requestsSearchForm = <div className='l-main-column l-main-left l-filter' style={{ display: this.state.showMobileFilter ? 'block' : null }}>
      <RequestsSearchForm
        history={history}
        location={location}
        filials={this.props.filials}
      />
    </div>

    const searchForm = <div className='l-main-column l-main-left l-filter' style={{ display: this.state.showMobileFilter ? 'block' : null }}>
      <AbonentsSearchForm
        initialFilters={qs.parse(location.search.replace(/^\?/, '')).filters}
        fetching={fetchingAbonents}
        {...abonentFilters}
        total={totalAbonents}
        onSubmit={onFilterSubmit}
      />
    </div>

    const orgsSearchForm = <div className='l-main-column l-main-left l-filter' style={{ display: this.state.showMobileFilter ? 'block' : null }}>
      <OrgsSearchForm
        initialFilters={qs.parse(location.search.replace(/^\?/, '')).filters}
        fetching={fetchingAbonents}
        {...orgsFilters}
        total={totalAbonents}
        onSubmit={onFilterSubmit}
      />
    </div>

    // TODO: выводить в дропдауне текущую сортировку на основе search
    return (
      <Template>
        <div className={`l-main l-main--nav-holder ${classNames({'l-main--no-aside': checkForAside(location.pathname),
          'l-main--nav-holder-main': checkForOneColumn(location.pathname)})}`}>
          {!checkForAside(location.pathname) && <div className='l-main-column l-main-column--modified l-main-left--modified l-main-left' />}
          <div className={`l-main-column l-main-column--modified l-main-right`}>
            {/* TODO: hasSort – тупой костыль, в продакшене это надо делать человечнее */}
            {
              hasSort
                ? (
                  <MediaQuery rule='screen and (min-width: 1279px)'>
                    <div style={{ float: 'right' }}>
                      <Dropdown
                        label='Сортировать по:'
                        title={this.props.sorting[this.props.getActiveSorting(search, location.pathname)]}
                        stopPropagation={false}
                      >
                        { this.renderSortingOptions(basicSortQuery) }
                      </Dropdown>
                    </div>
                  </MediaQuery>
                ) : null
            }

            {
              breadcrumbs.items && breadcrumbs.items.length
                ? (
                  <Breadcrumbs
                    path={breadcrumbs.items}
                  />
                )
                : null
            }
          </div>
        </div>
        <div className={`l-main ${classNames({ 'l-main--no-aside': checkForAside(location.pathname) })}`}>
          <Switch>
            {/* <Route path={'/requests/rejected/:fieldId'} render={(props) => <RequestsListAside {...props} status='rejected' />} /> */}
            {/* <Route exact path={'/requests/rejected'} /> */}
            {/* <Route path={'/requests/:fieldId'} component={callSearchForm} /> */}
            <Route path={'/account/:id/changed-request/:fieldId'} component={RequestsListAside} />
            {
              isCallOperator ? (
                <Route path='/' render={() => callSearchForm} />
              ) : (
                <Template>
                  <Route path='/organizations/*' render={() => orgsSearchForm} />
                  <Route path='/abonents/*' render={() => searchForm} />
                  {
                    !intersection(['ROLE_WEBSAUPG_USER'], user.roles).length
                      ? <Route path={'/requests'} render={() => requestsSearchForm} />
                      : null
                  }
                </Template>
              )
            }
          </Switch>
          <div className={`l-main-right ${classNames({'l-main-right--stretch': checkForOneColumn(location.pathname),
            'l-main-right--no-bg': pathArr.indexOf('requests') + 1})}`}>
            { props.children }
          </div>

          <MediaQuery rule='screen and (max-width: 1279px)'>
            <div className='fabs-container'>
              <Fab color='#FBBF34' onClick={() => {
                this.setState({
                  showMobileFilter: true
                })
              }}><SearchIcon /></Fab>

              {
                hasSort
                  ? (
                    <OverlayMobileMenu
                      button={<Fab><MobileSortIcon /></Fab>}
                    >
                      { this.renderSortingOptions(basicSortQuery, { className: 'overlay-menu-item' }) }
                    </OverlayMobileMenu>
                  )
                  : null
              }
            </div>
          </MediaQuery>
        </div>
      </Template>
    )
  }
}

Layout.defaultProps = {
  breadcrumbs: [],
  hasSort: false
}

const mapStateToProps = ({ forms, abonents, user }) => {
  return {
    filials: forms.filials || [],
    fetchingAbonents: abonents.fetching,
    totalAbonents: abonents.total,
    user,
    forms
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    invalidateAbonents () {
      dispatch(invalidateAbonents())
    },
    invalidateOrgs () {
      dispatch(invalidateOrgs())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
