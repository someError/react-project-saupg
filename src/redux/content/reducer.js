import {
  REQUEST_PUBLICATIONS,
  RECEIVE_PUBLICATIONS
} from './actions'

const DEFAULT_STATE = {
  publicationsLoading: true
}

export default function content (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case REQUEST_PUBLICATIONS:
      return {
        ...state,
        publicationsLoading: true
      }
    case RECEIVE_PUBLICATIONS:
      return {
        ...state,
        publications: action.payload,
        publicationsLoading: false
      }
    default:
      return state
  }
}
