import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'
import intersection from 'lodash/intersection'

import ChargeData from './ChargeData'
import Equipment from './Equipment'
import EquipmentDetail from './EquipmentDetail'
import Metering from './Metering'
import MeteringDetail from './MeteringDetail'
import BillingSummary from './BillingSummary'
import Documents from './Documents'
import DocumentDetail from './DocumentDetail'
import Debts from './Debts'
import DataChange from './DataChange'
import DataChangedDetail from './DataChangedDetail'
import DocumentCalculation from './DocumentCalculation'
import DocumentAttachments from './DocumentAttachments'
import Contacts from './Contacts'
import Officials from './Officials'
import Payments from './Payments'
import Objects from './Objects'
import HeadLine from '../../components/HeadLine/HeadLine'
import { getBackUrl } from '../../utils/index'
import Template from '../../components/Template'
import RequestsList from '../Requests/RequestsList'

class InnerLayout extends Component {
  render () {
    const { match, setBreadcrumbs, location, account, user } = this.props
    const { accountSummary, isOrg } = account

    const backUrl = getBackUrl(location)
    return <Template>
      <HeadLine
        name={isOrg ? accountSummary.title : accountSummary.name}
        contract={accountSummary.contract}
        backUrl={backUrl}
      />
      <Switch>
        <Route exact path={`${match.path}/equipment/:equipmentId`} render={(props) => <EquipmentDetail mainPath={match.url} setBreadcrumbs={setBreadcrumbs} {...props} />} />
        <Route exact path={`${match.path}/equipment`} render={(props) => <Equipment setBreadcrumbs={setBreadcrumbs} {...props} />} />
        <Route exact path={`${match.path}/billing-summary/debts-by-months`} render={(props) => <Debts setBreadcrumbs={setBreadcrumbs} {...props} />} />
        <Route exact path={`${match.path}/billing-summary`} render={(props) => <BillingSummary setBreadcrumbs={setBreadcrumbs} {...props} />} />
        <Route exact path={`${match.path}/documents/:id`} render={(props) => <DocumentDetail mainPath={match.url} setBreadcrumbs={setBreadcrumbs} {...props} />} />
        <Route exact path={`${match.path}/documents`} render={(props) => <Documents setBreadcrumbs={setBreadcrumbs} {...props} />} />
        <Route exact path={`${match.path}/metering/:counterId`} render={(props) => <MeteringDetail setBreadcrumbs={setBreadcrumbs} {...props} />} />
        <Route exact path={`${match.path}/metering`} render={(props) => <Metering setBreadcrumbs={setBreadcrumbs} {...props} />} />
        <Route exact path={`${match.path}/objects`} render={(props) => <Objects setBreadcrumbs={setBreadcrumbs} {...props} />} />
        {
          !intersection(['ROLE_WEBSAUPG_USER'], user.roles).length &&
            <Route exact path={`${match.path}/requests/rejected`} render={(props) => <RequestsList mainPath={match.url} setBreadcrumbs={setBreadcrumbs} status='rejected' {...props} />} />
        }
        {
          !intersection(['ROLE_WEBSAUPG_USER'], user.roles).length
            ? (
              <Template>
                <Route exact path={`${match.path}/add-request`} render={(props) => <DataChange mainPath={match.url} setBreadcrumbs={setBreadcrumbs} {...props} />} />
                <Route path={`${match.path}/requests/:fieldId`} render={(props) => <DataChangedDetail setBreadcrumbs={setBreadcrumbs} {...props} />} />
                <Route exact path={`${match.path}/requests`} render={(props) => <RequestsList mainPath={match.url} setBreadcrumbs={setBreadcrumbs} moreStatus='draft' status='open' {...props} />} />
                <Route exact path={`${match.path}/changed-request/:fieldId`} render={(props) => <DataChangedDetail mainPath={match.url} setBreadcrumbs={setBreadcrumbs} {...props} />} />
                { (match.url + '/changed-request' === location.pathname) && <Redirect to={match.url} /> }
              </Template>
            )
            : null
        }
        {
          account.isOrg ? [
            <Route key='doc/calculation' exact path={`${match.path}/documents/:id/calculation`}
              render={(props) => <DocumentCalculation setBreadcrumbs={setBreadcrumbs} {...props} />} />,

            <Route key='doc/attachments' exact path={`${match.path}/documents/:id/attachments`}
              render={(props) => <DocumentAttachments setBreadcrumbs={setBreadcrumbs} {...props} />} />,

            <Route key='/contacts' exact path={`${match.path}/contacts`}
              render={(props) => <Contacts setBreadcrumbs={setBreadcrumbs} {...props} />} />,

            <Route key='/officials' exact path={`${match.path}/officials`}
              render={(props) => <Officials setBreadcrumbs={setBreadcrumbs} {...props} />} />,

            <Route key='/billing-summary/payments' exact path={`${match.path}/billing-summary/payments`}
              render={(props) => <Payments setBreadcrumbs={setBreadcrumbs} {...props} />} />,
            (match.url + '/metering' === location.pathname) && <Redirect key='redirect-equipment' to={`${match.url}/equipment`} />
          ]
            : [
              <Route exact key='charge-data' path={`${match.path}/charge-data`}
                render={(props) => <ChargeData setBreadcrumbs={setBreadcrumbs} {...props} />} />
            ]
        }
      </Switch>
    </Template>
  }
}

const mapStateToProps = ({ account, user }) => {
  return {
    account,
    user
  }
}

export default connect(mapStateToProps)(InnerLayout)
