import api from '../../api'

export const REQUEST_FILIALS = 'REQUEST_FILIFALS'

export function requestFilials () {
  return {
    type: REQUEST_FILIALS
  }
}

export const RECEIVE_FILIALS = 'RECEIVE_FILIALS'

export function receiveFilials (data) {
  return {
    type: RECEIVE_FILIALS,
    payload: data
  }
}

export function fetchFilials () {
  return function (dispatch) {
    dispatch(requestFilials())

    const req = api.getFilials()

    req.then(({ data: { data, success } }) => {
      if (success) {
        dispatch(receiveFilials(data))
      }
    })

    return req
  }
}

export const REQUEST_HOUSE_CATEGORY = 'REQUEST_HOUSE_CATEGORY'

export function requestHouseCategories () {
  return {
    type: REQUEST_HOUSE_CATEGORY
  }
}

export const RECEIVE_HOUSE_CATEGORY = 'RECEIVE_HOUSE_CATEGORY'

export function receiveHouseCategories (data) {
  return {
    type: RECEIVE_HOUSE_CATEGORY,
    payload: data
  }
}

export function fetchHouseCategories () {
  return function (dispatch) {
    dispatch(requestHouseCategories())

    const req = api.getHouseCategories()

    req.then(({ data: { data, success } }) => {
      if (success) {
        dispatch(receiveHouseCategories(data))
      }
    })

    return req
  }
}

export const REQUEST_ORG_CATEGORY = 'REQUEST_ORG_CATEGORY'

export function requestOrgCategories () {
  return {
    type: REQUEST_ORG_CATEGORY
  }
}

export const RECEIVE_ORG_CATEGORY = 'RECEIVE_ORG_CATEGORY'

export function receiveOrgCategories (data) {
  return {
    type: RECEIVE_ORG_CATEGORY,
    payload: data
  }
}

export function fetchOrgCategories () {
  return function (dispatch) {
    dispatch(requestOrgCategories())

    const req = api.getOrganizationCategories()

    req.then(({ data: { data, success } }) => {
      if (success) {
        dispatch(receiveOrgCategories(data))
      }
    })

    return req
  }
}

export const REQUEST_DOC_TYPES = 'REQUEST_DOC_TYPES'

export function requestDocTypes () {
  return {
    type: REQUEST_DOC_TYPES
  }
}

export const RECEIVE_DOC_TYPES = 'RECEIVE_DOC_TYPES'

export function receiveDocTypes (data) {
  return {
    type: RECEIVE_DOC_TYPES,
    payload: data
  }
}

export function fetchDocTypes () {
  return function (dispatch) {
    dispatch(requestDocTypes())

    const req = api.getDocumentTypes()

    req.then(({ data: { data, success } }) => {
      if (success) {
        dispatch(receiveDocTypes(data))
      }
    })

    return req
  }
}

export const REQUEST_SERVICES = 'REQUEST_SERVICES'

export function requestServices () {
  return {
    type: REQUEST_SERVICES
  }
}

export const RECEIVE_SERVICES = 'RECEIVE_SERVICES'

export function receiveServices (data) {
  return {
    type: RECEIVE_SERVICES,
    payload: data
  }
}

export function fetchServices () {
  return function (dispatch) {
    dispatch(requestServices())

    const req = api.getServices()

    req.then(({ data: { data, success } }) => {
      if (success) {
        dispatch(receiveServices(data))
      }
    })

    return req
  }
}

export const REQUEST_BUDGETS = 'REQUEST_BUDGETS'

export function requestBudgets () {
  return {
    type: REQUEST_BUDGETS
  }
}

export const RECEIVE_BUDGETS = 'RECEIVE_BUDGETS'

export function receiveBudgets (data) {
  return {
    type: RECEIVE_BUDGETS,
    payload: data
  }
}

export function fetchBudgets () {
  return function (dispatch) {
    dispatch(requestBudgets())

    const req = api.getBudgets()

    req.then(({ data: { data, success } }) => {
      if (success) {
        dispatch(receiveBudgets(data))
      }
    })

    return req
  }
}

export const REQUEST_LOCALITIES = 'REQUEST_LOCALITIES'

export function requestLocalities () {
  return {
    type: REQUEST_LOCALITIES
  }
}

export const RECEIVE_LOCALITIES = 'RECEIVE_LOCALITIES'

export function receiveLocalities (data) {
  return {
    type: RECEIVE_LOCALITIES,
    payload: data
  }
}

export function fetchLocalities () {
  return function (dispatch) {
    dispatch(requestLocalities())

    const req = api.getLocalities()

    req.then(({ data: { data, success } }) => {
      if (success) {
        dispatch(receiveLocalities(data))
      }
    })

    return req
  }
}

export const REQUEST_DISTRICT_OPERATORS = 'REQUEST_DISTRICT_OPERATORS'

export function requestDistrictOperators () {
  return {
    type: REQUEST_DISTRICT_OPERATORS
  }
}

export const RECEIVE_DISTRICT_OPERATORS = 'RECEIVE_DISTRICT_OPERATORS'

export function receiveDistrictOperators (data) {
  return {
    type: RECEIVE_DISTRICT_OPERATORS,
    payload: data
  }
}

export function fetchDistrictOperators (filialId) {
  if (!filialId) return dispatch => dispatch(receiveDistrictOperators([]))

  return function (dispatch) {
    dispatch(requestDistrictOperators())

    const req = api.getDistrictOperators(filialId)

    req.then(({ data: { data, success } }) => {
      if (success) {
        dispatch(receiveDistrictOperators(data))
      }
    })

    return req
  }
}

export const REQUEST_CONSUMPTION_GROUPS = 'REQUEST_CONSUMPTION_GROUPS'

export function requestConsumptionGroups () {
  return {
    type: REQUEST_CONSUMPTION_GROUPS
  }
}

export const RECEIVE_CONSUMPTION_GROUPS = 'RECEIVE_CONSUMPTION_GROUPS'

export function receiveConsumptionGroups (data) {
  return {
    type: RECEIVE_CONSUMPTION_GROUPS,
    payload: data
  }
}

export function fetchConsumptionGroups () {
  return function (dispatch) {
    dispatch(requestConsumptionGroups())

    const req = api.getConsumptionGroups()

    req.then(({ data: { data, success } }) => {
      if (success) {
        dispatch(receiveConsumptionGroups(data))
      }
    })

    return req
  }
}
