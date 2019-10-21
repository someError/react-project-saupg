import {
  REQUEST_UPDATE_FIELDS,
  RECEIVE_UPDATE_FIELDS,
  REQUEST_UPDATE_FIELD_DETAIL,
  RECEIVE_UPDATE_FIELD_DETAIL,
  REQUEST_FIELDS_INFO,
  RECEIVE_FIELDS_INFO,
  INVALIDATE_UPDATE_FIELD_DETAIL,
  INVALIDATE_UPDATE_FIELDS,
  RECEIVE_OPEN_REQUESTS
} from './actions'

const DEFAULT_STATE = {
  accountListLoading: true,
  accountDetailLoading: true,
  fieldsInfoLoading: true
}

export default function requests (state = DEFAULT_STATE, { type, payload }) {
  switch (type) {
    case REQUEST_UPDATE_FIELDS:
      return {
        ...state,
        accountListLoading: true
      }
    case RECEIVE_UPDATE_FIELDS:
      return {
        ...state,
        items: payload.items,
        total: payload.meta.total,
        accountListLoading: false
      }
    case RECEIVE_OPEN_REQUESTS:
      return {
        ...state,
        totalOpen: payload.meta.total
      }
    case REQUEST_UPDATE_FIELD_DETAIL:
      return {
        ...state,
        accountDetailLoading: true
      }
    case RECEIVE_UPDATE_FIELD_DETAIL:
      return {
        ...state,
        accountDetail: payload,
        accountDetailLoading: false
      }
    case REQUEST_FIELDS_INFO:
      return {
        ...state,
        fieldsInfoLoading: true
      }
    case RECEIVE_FIELDS_INFO:
      return {
        ...state,
        fieldsInfo: payload,
        fieldsInfoLoading: false
      }
    case INVALIDATE_UPDATE_FIELD_DETAIL:
      return {
        ...state,
        accountDetail: null
      }
    case INVALIDATE_UPDATE_FIELDS:
      return {
        ...state,
        items: null,
        total: null,
        accountListLoading: true
      }
    default:
      return state
  }
}
