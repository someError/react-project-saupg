import {
  REQUEST_FILIALS,
  RECEIVE_FILIALS,
  REQUEST_HOUSE_CATEGORY,
  RECEIVE_HOUSE_CATEGORY,
  REQUEST_ORG_CATEGORY,
  RECEIVE_ORG_CATEGORY,
  REQUEST_DOC_TYPES,
  RECEIVE_DOC_TYPES,
  REQUEST_SERVICES,
  RECEIVE_SERVICES,
  REQUEST_BUDGETS,
  RECEIVE_BUDGETS,
  REQUEST_DISTRICT_OPERATORS,
  RECEIVE_DISTRICT_OPERATORS,
  REQUEST_LOCALITIES,
  RECEIVE_LOCALITIES,
  REQUEST_CONSUMPTION_GROUPS,
  RECEIVE_CONSUMPTION_GROUPS
} from './actions'

const DEFAULT_STATE = {
  fetchingFilials: true,
  fetchingHouseCategories: true,
  fetchingOrgCategories: true,
  fetchingDocTypes: true,
  fetchingBudgets: true,
  fetchingServices: true,
  fetchingDistrictOperators: true,
  fetchingLocalities: true,
  fetchingObjects: true
}

export default function forms (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case REQUEST_FILIALS:
      return {
        ...state,
        fetchingFilials: true
      }
    case RECEIVE_FILIALS:
      return {
        ...state,
        filials: action.payload,
        fetchingFilials: false
      }
    case REQUEST_HOUSE_CATEGORY:
      return {
        ...state,
        fetchingHouseCategories: true
      }
    case RECEIVE_HOUSE_CATEGORY:
      return {
        ...state,
        fetchingHouseCategories: false,
        houseCategories: action.payload
      }
    case REQUEST_ORG_CATEGORY:
      return {
        ...state,
        fetchingOrgCategories: true
      }
    case RECEIVE_ORG_CATEGORY:
      return {
        ...state,
        fetchingOrgCategories: false,
        orgCategories: action.payload
      }
    case REQUEST_DOC_TYPES:
      return {
        ...state,
        fetchingDocTypes: true
      }
    case RECEIVE_DOC_TYPES:
      return {
        ...state,
        fetchingDocTypes: false,
        docTypes: action.payload
      }
    case REQUEST_SERVICES:
      return {
        ...state,
        fetchingServices: true
      }
    case RECEIVE_SERVICES:
      return {
        ...state,
        fetchingServices: false,
        services: action.payload.items
      }
    case REQUEST_BUDGETS:
      return {
        ...state,
        fetchingBudgets: true
      }
    case RECEIVE_BUDGETS:
      return {
        ...state,
        fetchingBudgets: false,
        budgets: action.payload
      }
    case REQUEST_DISTRICT_OPERATORS:
      return {
        ...state,
        fetchingDistrictOperators: true
      }
    case RECEIVE_DISTRICT_OPERATORS:
      console.log(action.payload)
      return {
        ...state,
        fetchingDistrictOperators: false,
        districtOperators: action.payload
      }
    case REQUEST_LOCALITIES:
      return {
        ...state,
        fetchingLocalities: true
      }
    case RECEIVE_LOCALITIES:
      return {
        ...state,
        fetchingLocalities: false,
        localities: action.payload.items
      }
    case REQUEST_CONSUMPTION_GROUPS:
      return {
        ...state,
        fetchingConsumptionGroups: true
      }
    case RECEIVE_CONSUMPTION_GROUPS:
      return {
        ...state,
        fetchingConsumptionGroups: false,
        consumptionGroups: action.payload.items
      }
    default:
      return state
  }
}
