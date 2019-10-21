export const SET_BREADCRUMBS = 'SET_BREADCRUMBS'

export function setBreadcrumbs (location, titles) {
  return {
    type: SET_BREADCRUMBS,
    payload: {
      location,
      titles
    }
  }
}

export const INVALIDATE_BREADCRUMBS = 'INVALIDATE_BREADCRUMBS'

export function invalidateBreadcrumbs () {
  return {
    type: INVALIDATE_BREADCRUMBS
  }
}

export const SAVE_SEARCH_QUERY = 'SAVE_SEARCH_QUERY'

export function saveSearchQuery (query) {
  return {
    type: SAVE_SEARCH_QUERY,
    payload: query
  }
}
