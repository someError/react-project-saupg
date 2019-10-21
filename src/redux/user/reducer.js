import {
  RECEIVE_USER_INFO,
  INVALIDATE_USER_INFO
} from './actions'

const DEFAULT_STATE = {}

export default function user (state = DEFAULT_STATE, { type, payload }) {
  switch (type) {
    case RECEIVE_USER_INFO:
      return {
        ...state,
        ...payload
      }
    case INVALIDATE_USER_INFO:
      return {
        ...DEFAULT_STATE
      }
    case 'INCOMING_PHONE':
      return {
        ...state,
        ...payload
      }
    default: {
      return {
        ...state
      }
    }
  }
}
