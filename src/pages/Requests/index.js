import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import RequestsList from './RequestsList'
import { invalidateBreadcrumbs, setBreadcrumbs } from '../../redux/breadcrumbs/actions'
import DataChangedDetail from '../Account/DataChangedDetail'

class Requests extends Component {
  componentWillUnmount () {
    this.props.invalidateBreadcrumbs()
  }
  render () {
    const { setBreadcrumbs } = this.props
    return (
      <Switch>
        <Route path='/requests/rejected' render={(props) => <RequestsList setBreadcrumbs={setBreadcrumbs} status='rejected' {...props} />} />
        <Route path={`/requests/:fieldId`} render={(props) => <DataChangedDetail setBreadcrumbs={setBreadcrumbs} {...props} />} />
        <Route path='/requests' render={(props) => <RequestsList setBreadcrumbs={setBreadcrumbs} status='open' {...props} />} />
      </Switch>
    )
  }
}

const mapStateToProps = ({ requests }) => {
  return {
    requests
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumbs (location, titles) {
      dispatch(setBreadcrumbs(location, titles))
    },
    invalidateBreadcrumbs () {
      dispatch(invalidateBreadcrumbs())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Requests)
