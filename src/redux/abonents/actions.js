import api from '../../api'

export const REQUEST_ABONENTS = 'REQUEST_ABONENTS'

export function requestAbonents () {
  return {
    type: REQUEST_ABONENTS
  }
}

export const RECEIVE_ABONENTS = 'RECEIVE_ABONENTS'

export function receiveAbonents (data, isOrg) {
  return {
    type: RECEIVE_ABONENTS,
    payload: data,
    isOrg
  }
}

export function fetchAbonents (queryString, isOrg = false) {
  return function (dispatch) {
    dispatch(requestAbonents())

    const req = api.getAbonents(queryString, isOrg)

    req.then(({ data: { data, success } }) => {
      if (success) {
        dispatch(receiveAbonents(data, isOrg))
      }
    })

    return req
  }
}

export const INVALIDATE_ABONENTS = 'INVALIDATE_ABONENTS'

export function invalidateAbonents () {
  return {
    type: INVALIDATE_ABONENTS
  }
}
