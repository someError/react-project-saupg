import api from '../../api'

export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT'

export function requestAccount () {
  return {
    type: REQUEST_ACCOUNT
  }
}

export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT'

export function receiveAccount (data, isOrg) {
  return {
    type: RECEIVE_ACCOUNT,
    payload: data,
    isOrg
  }
}

export const FETCH_ACCOUNT = 'FETCH_ACCOUNT'

export function fetchAccount (id, isOrg) {
  return function (dispatch) {
    dispatch(requestAccount())

    const req = api.getAccount(id, isOrg)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveAccount(data, isOrg))
      }
    })

    return req
  }
}

export const REQUEST_ACCOUNT_REMARKS = 'REQUEST_ACCOUNT_REMARKS'

export function requestAccountRemarks () {
  return {
    type: REQUEST_ACCOUNT_REMARKS
  }
}

export const RECEIVE_ACCOUNT_REMARKS = 'RECEIVE_ACCOUNT_REMARKS'

export function receiveAccountRemarks (data) {
  return {
    type: RECEIVE_ACCOUNT_REMARKS,
    payload: data
  }
}

export function fetchAccountRemarks (id) {
  return function (dispatch) {
    dispatch(requestAccountRemarks())

    const req = api.getAccountRemarks(id)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveAccountRemarks(data))
      }
    })

    return req
  }
}

export const REQUEST_ORG_REMARKS = 'REQUEST_ORG_REMARKS'

export function requestOrgRemarks () {
  return {
    type: REQUEST_ORG_REMARKS
  }
}

export const RECEIVE_ORG_REMARKS = 'RECEIVE_ORG_REMARKS'

export function receiveOrgRemarks (data) {
  return {
    type: RECEIVE_ORG_REMARKS,
    payload: data
  }
}

export function fetchOrgRemarks (id) {
  return function (dispatch) {
    dispatch(requestOrgRemarks())

    const req = api.getOrganizationRemarks(id)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveOrgRemarks(data))
      }
    })

    return req
  }
}

export const INVALIDATE_ACCOUNT = 'INVALIDATE_ACCOUNT'

export function invalidateAccount () {
  return {
    type: INVALIDATE_ACCOUNT
  }
}

export const REQUEST_ACCOUNT_CHARGE_DATA = 'REQUEST_ACCOUNT_CHARGE_DATA'

export function requestAccountCharges () {
  return {
    type: REQUEST_ACCOUNT_CHARGE_DATA
  }
}

export const RECEIVE_ACCOUNT_CHARGE_DATA = 'RECEIVE_ACCOUNT_CHARGE_DATA'

export function receiveAccountCharges (data) {
  return {
    type: RECEIVE_ACCOUNT_CHARGE_DATA,
    payload: data
  }
}

export function fetchChargeData (accountId) {
  return function (dispatch) {
    dispatch(requestAccountCharges())

    const req = api.getAccountChargeData(accountId)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveAccountCharges(data))
      }
    })

    return req
  }
}

/* EQUIPMENTS */

export const REQUEST_ACCOUNT_EQUIPMENT = 'REQUEST_ACCOUNT_EQUIPMENT'

export function requestEquipment () {
  return {
    type: REQUEST_ACCOUNT_EQUIPMENT
  }
}

export const RECEIVE_ACCOUNT_EQUIPMENT = 'RECEIVE_ACCOUNT_EQUIPMENT'

export function receiveEquipment (data) {
  return {
    type: RECEIVE_ACCOUNT_EQUIPMENT,
    payload: data
  }
}

export function fetchEquipment (accountId, isOrg, object) {
  return function (dispatch) {
    dispatch(requestEquipment())

    const req = api.getAccountEquipment(accountId, isOrg, object)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveEquipment(data))
      }
    })

    return req
  }
}

export const REQUEST_EQUIPMENT_ITEM = 'REQUEST_EQUIPMENT_ITEM'

export function requestEquipmentItem () {
  return {
    type: REQUEST_EQUIPMENT_ITEM
  }
}

export const RECEIVE_EQUIPMENT_ITEM = 'RECEIVE_EQUIPMENT_ITEM'

export function receiveEquipmentItem (data) {
  return {
    type: RECEIVE_EQUIPMENT_ITEM,
    payload: data
  }
}

export function fetchEquipmentItem (id) {
  return function (dispatch) {
    dispatch(requestEquipmentItem())
    const req = api.getEquipmentItem(id)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveEquipmentItem(data))
      }
    })

    return req
  }
}

export const REQUEST_METERING = 'REQUEST_METERING'

export function requestMetering () {
  return {
    type: REQUEST_METERING
  }
}

export const RECEIVE_METERING = 'RECEIVE_METERING'

export function receiveMetering (data) {
  return {
    type: RECEIVE_METERING,
    payload: data
  }
}

export function fetchMetering (id, query) {
  return function (dispatch) {
    dispatch(requestMetering())
    const req = api.getMetering(id, query)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveMetering(data))
      }
    })

    return req
  }
}

export const REQUEST_BILLING_SUMMARY = 'REQUEST_BILLING_SUMMARY'

export function requestBillingSummary () {
  return {
    type: REQUEST_BILLING_SUMMARY
  }
}

export const RECEIVE_BILLING_SUMMARY = 'RECEIVE_BILLING_SUMMARY'

export function receiveBillingSummary (data) {
  return {
    type: RECEIVE_BILLING_SUMMARY,
    payload: data
  }
}

export function fetchBillingSummary (id, isOrg = false, query = '') {
  return function (dispatch) {
    dispatch(requestBillingSummary())
    const req = api.getBillingSummary(id, isOrg, query)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveBillingSummary(data))
      }
    })

    return req
  }
}

export const REQUEST_DEBTS = 'REQUEST_DEBTS'

export function requestDebtsByMonths () {
  return {
    type: REQUEST_DEBTS
  }
}

export const RECEIVE_DEBTS = 'RECEIVE_DEBTS'

export function receiveDebtsByMonths (data) {
  return {
    type: RECEIVE_DEBTS,
    payload: data
  }
}

export function fetchDebtsByMonths (id, query) {
  return function (dispatch) {
    dispatch(requestDebtsByMonths())
    const req = api.getDebtsByMonths(id, query)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveDebtsByMonths(data))
      }
    })

    return req
  }
}

export const REQUEST_DOCUMENTS = 'REQUEST_DOCUMENTS'

export function requestDocuments () {
  return {
    type: REQUEST_DOCUMENTS
  }
}

export const RECEIVE_DOCUMENTS = 'RECEIVE_DOCUMENTS'

export function receiveDocuments (data) {
  return {
    type: RECEIVE_DOCUMENTS,
    payload: data
  }
}

export function fetchDocuments (id, isOrg) {
  return function (dispatch) {
    dispatch(requestDocuments())
    const req = api.getDocuments(id, isOrg)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveDocuments(data))
      }
    })

    return req
  }
}

export const REQUEST_DOCUMENT_ITEM = 'REQUEST_DOCUMENT_ITEM'

export function requestDocumentItem () {
  return {
    type: REQUEST_DOCUMENT_ITEM
  }
}

export const RECEIVE_DOCUMENT_ITEM = 'RECEIVE_DOCUMENT_ITEM'

export function receiveDocumentItem (data) {
  return {
    type: RECEIVE_DOCUMENT_ITEM,
    payload: data
  }
}

export function fetchDocumentItem (id) {
  return function (dispatch) {
    dispatch(requestDocumentItem())
    const req = api.getDocumentItem(id)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveDocumentItem(data))
      }
    })
    // .then(() => dispatch(fetchDocumentRemarks(id)))

    return req
  }
}

export const REQUEST_DOCUMENT_REMARKS = 'REQUEST_DOCUMENT_REMARKS'

export function requestDocumentRemarks () {
  return {
    type: REQUEST_DOCUMENT_REMARKS
  }
}

export const RECEIVE_DOCUMENT_REMARKS = 'RECEIVE_DOCUMENT_REMARKS'

export function receiveDocumentRemarks (data) {
  return {
    type: RECEIVE_DOCUMENT_REMARKS,
    payload: data
  }
}

export function fetchDocumentRemarks (id) {
  return function (dispatch) {
    dispatch(requestDocumentRemarks())
    const req = api.getDocumentRemarks(id)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveDocumentRemarks(data))
      }
    })

    return req
  }
}

export const REQUEST_REQUISITES = 'REQUEST_REQUISITES'

export function requestRequisites () {
  return {
    type: REQUEST_REQUISITES
  }
}

export const RECEIVE_REQUISITES = 'RECEIVE_REQUISITES'

export function receiveRequisites (data) {
  return {
    type: RECEIVE_REQUISITES,
    payload: data
  }
}

export function fetchRequisites (id) {
  return function (dispatch) {
    dispatch(requestRequisites())
    const req = api.getRequisites(id)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveRequisites(data))
      }
    })

    return req
  }
}

export const REQUEST_OFFICIALS = 'REQUEST_OFFICIALS'

export function requestOfficials () {
  return {
    type: REQUEST_OFFICIALS
  }
}

export const RECEIVE_OFFICIALS = 'RECEIVE_OFFICIALS'

export function receiveOfficials (data) {
  return {
    type: RECEIVE_OFFICIALS,
    payload: data
  }
}

export function fetchOfficials (id) {
  return function (dispatch) {
    dispatch(requestOfficials())
    const req = api.getOfficials(id)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveOfficials(data))
      }
    })

    return req
  }
}

export const REQUEST_BANK_ACCOUNTS = 'REQUEST_BANK_ACCOUNTS'

export function requestBankAccounts () {
  return {
    type: REQUEST_BANK_ACCOUNTS
  }
}

export const RECEIVE_BANK_ACCOUNTS = 'RECEIVE_BANK_ACCOUNTS'

export function receiveBankAccounts (data) {
  return {
    type: RECEIVE_BANK_ACCOUNTS,
    payload: data
  }
}

export function fetchBankAccounts (id) {
  return function (dispatch) {
    dispatch(requestBankAccounts())
    const req = api.getBankAccounts(id)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveBankAccounts(data))
      }
    })

    return req
  }
}

export const REQUEST_PAYMENTS = 'REQUEST_PAYMENTS'

export function requestPayments () {
  return {
    type: REQUEST_PAYMENTS
  }
}

export const RECEIVE_PAYMENTS = 'RECEIVE_PAYMENTS'

export function receivePayments (data) {
  return {
    type: RECEIVE_PAYMENTS,
    payload: data
  }
}

export function fetchPayments (id, query) {
  return function (dispatch) {
    dispatch(requestPayments())
    const req = api.getPayments(id, query)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receivePayments(data))
      }
    })

    return req
  }
}

export const REQUEST_OBJECTS = 'REQUEST_OBJECTS'

export function requestObjects () {
  return {
    type: REQUEST_OBJECTS
  }
}

export const RECEIVE_OBJECTS = 'RECEIVE_OBJECTS'

export function receiveObjects (data) {
  return {
    type: RECEIVE_OBJECTS,
    payload: data
  }
}

export function fetchObjects (id) {
  return function (dispatch) {
    dispatch(requestObjects())

    const req = api.getObjects(id)

    req.then(({ data: { data, success } }) => {
      if (success) {
        dispatch(receiveObjects(data))
      }
    })

    return req
  }
}

export const REQUEST_DOCUMENT_CALC = 'REQUEST_DOCUMENT_CALC'

export function requestDocCalculation () {
  return {
    type: REQUEST_DOCUMENT_CALC
  }
}

export const RECEIVE_DOCUMENT_CALC = 'RECEIVE_DOCUMENT_CALC'

export function receiveDocCalculation (data) {
  return {
    type: RECEIVE_DOCUMENT_CALC,
    payload: data
  }
}

export function fetchDocCalculation (id) {
  return function (dispatch) {
    dispatch(requestDocCalculation())

    const req = api.getDocCalculation(id)

    req.then(({ data: { data, success } }) => {
      if (success) {
        dispatch(receiveDocCalculation(data))
      }
    })

    return req
  }
}

export const WRITE_PHONE = 'WRITE_PHONE'

export function writePhone (phone = null) {
  return {
    type: WRITE_PHONE,
    payload: phone
  }
}

export const REQUEST_SUPR_OBJECTS = 'REQUEST_SUPR_OBJECTS'

export function requestSuprObjects () {
  return {
    type: REQUEST_SUPR_OBJECTS
  }
}

export const RECEIVE_SUPR_OBJECTS = 'RECEIVE_SUPR_OBJECTS'

export function receiveSuprObjects (data) {
  return {
    type: RECEIVE_SUPR_OBJECTS,
    payload: data
  }
}

export function fetchSuprObjects (id, isOrg) {
  return function (dispatch) {
    dispatch(requestSuprObjects())

    const req = api.getSuprObjects(id, isOrg)

    req.then(({ data: { data, success } }) => {
      if (success) {
        dispatch(receiveSuprObjects(data))
      }
    })

    return req
  }
}
