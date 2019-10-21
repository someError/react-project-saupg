import api from '../../api'

export const REQUEST_ORGS = 'REQUEST_ORGS'

export function requestOrgs () {
  return {
    type: REQUEST_ORGS
  }
}

export const RECEIVE_ORGS = 'RECEIVE_ORGS'

export function receiveOrgs (data) {
  return {
    type: RECEIVE_ORGS,
    payload: data
  }
}

export const FETCH_ORGS = 'FETCH_ORGS'

export function fetchOrgs (queryString) {
  return function (dispatch) {
    dispatch(requestOrgs())

    const req = api.getOrganizations(queryString)

    req.then(({ data: { data, success } }) => {
      if (success) {
        dispatch(receiveOrgs(data))
      }
    })

    return req
  }
}

export const INVALIDATE_ORGS = 'INVALIDATE_ORGS'

export function invalidateOrgs () {
  return {
    type: INVALIDATE_ORGS
  }
}
