import {
  REQUEST_ABONENTS,
  RECEIVE_ABONENTS,
  INVALIDATE_ABONENTS
} from './actions'

const DEFAULT_STATE = {
  items: null,
  total: 0
}

export default function abonents (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case REQUEST_ABONENTS:
      return {
        ...state,
        fetching: true
      }
    case RECEIVE_ABONENTS:
      // action.payload.items.map((item) => {
      //   item.name = item.title || item.name
      // })
      return {
        ...state,
        fetching: false,
        items: action.payload.items,
        total: action.payload.meta.total,
        isOrg: action.isOrg
      }
    case INVALIDATE_ABONENTS:
      return {
        ...state,
        ...DEFAULT_STATE,
        fetching: false
      }
    default:
      return state
  }
}
