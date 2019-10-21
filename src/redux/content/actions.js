import api from '../../api'

export const REQUEST_PUBLICATIONS = 'REQUEST_PUBLICATIONS'

export function requestPublications () {
  return {
    type: REQUEST_PUBLICATIONS
  }
}

export const RECEIVE_PUBLICATIONS = 'RECEIVE_PUBLICATIONS'

export function receivePublications (data) {
  return {
    type: RECEIVE_PUBLICATIONS,
    payload: data
  }
}

export function fetchPublications () {
  return function (dispatch) {
    dispatch(requestPublications())

    const req = api.getPublications()

    req.then(({ data: { data, success } }) => {
      if (success) {
        dispatch(receivePublications(data))
      }
    })

    return req
  }
}
