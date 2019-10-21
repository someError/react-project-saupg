import api from '../../api'

export const REQUEST_UPDATE_FIELDS = 'REQUEST_UPDATE_FIELDS'

export function requestUpdateFields () {
  return {
    type: REQUEST_UPDATE_FIELDS
  }
}

export const RECEIVE_UPDATE_FIELDS = 'RECEIVE_UPDATE_FIELDS'

export function receiveUpdateFields (data) {
  return {
    type: RECEIVE_UPDATE_FIELDS,
    payload: data
  }
}

export function fetchUpdateFields (filters) {
  return function (dispatch) {
    dispatch(requestUpdateFields())
    const req = api.getRequests(filters)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveUpdateFields(data))
      }
    })

    return req
  }
}

export const RECEIVE_OPEN_REQUESTS = 'RECEIVE_OPEN_REQUESTS'

export function receiveOpenRequests (data) {
  return {
    type: RECEIVE_OPEN_REQUESTS,
    payload: data
  }
}

export function fetchOpenRequests (filters) {
  return function (dispatch) {
    const req = api.getRequests(filters)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveOpenRequests(data))
      }
    })

    return req
  }
}

export const REQUEST_UPDATE_FIELD_DETAIL = 'REQUEST_UPDATE_FIELD_DETAIL'

export function requestUpdateFieldDetail () {
  return {
    type: REQUEST_UPDATE_FIELD_DETAIL
  }
}

export const RECEIVE_UPDATE_FIELD_DETAIL = 'RECEIVE_UPDATE_FIELD_DETAIL'

export function receiveUpdateFieldDetail (data) {
  return {
    type: RECEIVE_UPDATE_FIELD_DETAIL,
    payload: data
  }
}

export function fetchUpdateFieldDetail (id) {
  return function (dispatch) {
    dispatch(requestUpdateFieldDetail())
    const req = api.getRequestDetail(id)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveUpdateFieldDetail(data))
      }
    })

    return req
  }
}

export const INVALIDATE_UPDATE_FIELD_DETAIL = 'INVALIDATE_UPDATE_FIELD_DETAIL'

export function invalidateRequestDetail () {
  return {
    type: INVALIDATE_UPDATE_FIELD_DETAIL
  }
}

export const INVALIDATE_UPDATE_FIELDS = 'INVALIDATE_UPDATE_FIELDS'

export function invalidateRequestList () {
  return {
    type: INVALIDATE_UPDATE_FIELDS
  }
}

export const REQUEST_FIELDS_INFO = 'REQUEST_FIELDS_INFO'

export function requestFieldsInfo () {
  return {
    type: REQUEST_FIELDS_INFO
  }
}

export const RECEIVE_FIELDS_INFO = 'RECEIVE_FIELDS_INFO'

export function receiveFieldsInfo (data) {
  return {
    type: RECEIVE_FIELDS_INFO,
    payload: data
  }
}

export function fetchFieldsInfo (id) {
  return function (dispatch) {
    dispatch(requestFieldsInfo())
    const req = api.getFieldsInfo(id)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveFieldsInfo(data))
      }
    })

    return req
  }
}

// export const REQUEST_CHANGE_REQUEST_STATUS = 'REQUEST_CHANGE_REQUEST_STATUS'
//
// export function requestChangeRequestStatus () {
//   return {
//     type: REQUEST_CHANGE_REQUEST_STATUS
//   }
// }
//
// export const RECEIVE_CHANGE_REQUEST_STATUS = 'RECEIVE_CHANGE_REQUEST_STATUS'
//
// export function receiveChangeRequestStatus (data) {
//   return {
//     type: RECEIVE_CHANGE_REQUEST_STATUS,
//     payload: data
//   }
// }
//
// export function fetchChangeRequestStatus (id, status) {
//   return function (dispatch) {
//     dispatch(requestChangeRequestStatus())
//     const req = api.changeRequestStatus(id, status)
//
//     req.then(({data: {data, success}}) => {
//       if (success) {
//         dispatch(receiveChangeRequestStatus(data))
//       }
//     })
//
//     return req
//   }
// }
