import api from '../../api'

export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'

export function receiveUserInfo (data) {
  return {
    type: RECEIVE_USER_INFO,
    payload: data
  }
}

export function fetchUserInfo (id) {
  return function (dispatch) {
    const req = api.getUserInfo(id)

    req.then(({data: {data, success}}) => {
      if (success) {
        dispatch(receiveUserInfo(data))
      }
    })

    return req
  }
}

export const INVALIDATE_USER_INFO = 'INVALIDATE_USER_INFO'

export function invalidateUserInfo () {
  return {
    type: INVALIDATE_USER_INFO
  }
}
