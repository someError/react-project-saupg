import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Main from './Main'
import { withApiError } from '../../components/ApiProvider'
import { OverlaySpinner } from '../../components/Loaders'

import InnerLayout from './InnerLayout'

import { fetchAccount, fetchObjects, writePhone, fetchAccountRemarks, fetchOrgRemarks, fetchSuprObjects } from '../../redux/account/actions'
import { invalidateBreadcrumbs, setBreadcrumbs } from '../../redux/breadcrumbs/actions'

class Account extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  async componentDidMount () {
    const { user, location: { pathname }, history, account } = this.props
    // if (!account.abonentPhone && user.roles.indexOf('ROLE_CALL_OPERATOR') >= 0) {
    //   history.push({pathname: '/'})
    // }
    const isOrg = pathname.indexOf('/organizations') !== -1 && user.roles.indexOf('ROLE_CALL_OPERATOR') < 0

    this.props.fetch(this.props.match.params.id, isOrg)

    this.props.fetchSuprObjects(this.props.match.params.id, isOrg)

    if (isOrg) {
      await this.props.fetchOrgRemarks(this.props.match.params.id)
      await this.props.fetchObjects(this.props.match.params.id)

      this.setState({ loading: false })
    } else {
      await this.props.fetchAccountRemarks(this.props.match.params.id)

      this.setState({ loading: false })
    }
  }

  componentWillUnmount () {
    this.props.writePhone(null)
    if (this.req) {
      this.req.cancel()
    }
  }

  render () {
    const { state } = this
    const { match, account, setBreadcrumbs, invalidateBreadcrumbs } = this.props
    if (account.summaryLoading || state.loading) {
      return <OverlaySpinner />
    }

    return (
      <div className='l-main-column'>
        <Switch>
          <Route exact path={match.path} render={(props) => <Main setBreadcrumbs={invalidateBreadcrumbs} {...props} />} />
          <Route render={(props) => <InnerLayout setBreadcrumbs={setBreadcrumbs} {...props} />} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ account, user }) => {
  return {
    account,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch (id, isOrg) {
      return dispatch(fetchAccount(id, isOrg))
    },

    fetchObjects (id) {
      return dispatch(fetchObjects(id))
    },

    fetchAccountRemarks (id) {
      return dispatch(fetchAccountRemarks(id))
    },

    fetchOrgRemarks (id) {
      return dispatch(fetchOrgRemarks(id))
    },

    setBreadcrumbs (location, titles) {
      dispatch(setBreadcrumbs(location, titles))
    },

    invalidateBreadcrumbs () {
      dispatch(invalidateBreadcrumbs())
    },

    writePhone (phone) {
      return dispatch(writePhone(phone))
    },

    fetchSuprObjects (id, isOrg) {
      return dispatch(fetchSuprObjects(id, isOrg))
    }
  }
}

export default withApiError()(connect(mapStateToProps, mapDispatchToProps)(Account))
