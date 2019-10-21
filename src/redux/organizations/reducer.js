import {
  REQUEST_ORGS,
  RECEIVE_ORGS,
  INVALIDATE_ORGS
} from './actions'

const DEFAULT_STATE = {
  items: null,
  total: 0
}

export default function organizations (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case REQUEST_ORGS:
      return {
        ...state,
        fetching: true
      }
    case RECEIVE_ORGS:
      return {
        ...state,
        fetching: false,
        items: action.payload.items,
        total: action.payload.meta.total
      }
    case INVALIDATE_ORGS:
      return {
        ...state,
        ...DEFAULT_STATE,
        fetching: false
      }
    default:
      return state
  }
}
