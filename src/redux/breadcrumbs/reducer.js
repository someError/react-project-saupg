import { SET_BREADCRUMBS, INVALIDATE_BREADCRUMBS, SAVE_SEARCH_QUERY } from './actions'

export default function breadcrumbs (state = {}, { type, payload }) {
  switch (type) {
    case SET_BREADCRUMBS:
      return {
        ...state,
        items: getBreadcrumbsFromLocation(payload.location, state.searchQuery, payload.titles)
      }
    case INVALIDATE_BREADCRUMBS:
      return {
        ...state,
        items: []
      }
    case SAVE_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: payload
      }
    default:
      return state
  }
}

const DEFAULT_BREAD_TITLES = {
  'billing-summary': 'Контроль задолженности',
  'debts-by-months': 'Долги по месяцам',
  'equipment': 'Оборудование абонента',
  'documents': 'Договоры',
  'charge-data': 'Данные для начисления',
  'metering': 'Ввод показаний',
  'add-request': 'Изменяемая информация',
  'changed-request': 'Измененная информация',
  'requests': 'Заявки на изменение данных',
  'rejected': 'Отклоненные заявки'
}

function getBreadcrumbsFromLocation (location, searchQuery = '', titles = {}) {
  const { pathname } = location

  titles = {
    ...DEFAULT_BREAD_TITLES,
    ...titles
  }

  if ((/^\/account\/\d+/).test(pathname)) {
    const splitPathname = /(^\/account\/\d+)(.*)/.exec(pathname)

    const accountRestPath = splitPathname[2].split('/').filter((item) => !!item)
    // TODO: позже выпилить, сделано на скорую руку
    if (/changed-request/.test(pathname)) accountRestPath.pop()
    // TODO: END TODO

    if (!accountRestPath.length) {
      return null
    }

    const accountUrl = splitPathname[1]

    let res = [
      {
        title: 'Список абонентов',
        url: `/search${searchQuery ? `?${searchQuery}` : ''}`
      },
      {
        title: 'Карточка абонента',
        url: accountUrl
      }
    ]

    if (accountRestPath.length) {
      let restPath = accountRestPath.reduce((data, pathSegment) => {
        const url = `${data.prevUrl || accountUrl}/${pathSegment}`

        data.items.push({
          title: titles[pathSegment] || pathSegment,
          url
        })

        data.prevUrl = url

        return data
      }, { items: [], prevUrl: null }).items

      res = res.concat(restPath)
    }

    return res
  }

  // TODO: позже выпилить, сделано на скорую руку
  if (/^\/requests/.test(pathname)) {
    const requestsRestPath = pathname.split('/')
    const res = [
      {
        title: 'Главная',
        url: `/`
      },
      {
        title: 'Заявки на изменение данных',
        url: `/requests`
      }
    ]

    if (requestsRestPath[2] === 'rejected') {
      res.push({
        title: 'Отклоненные заявки'
      })
    }
    if (requestsRestPath[2] && requestsRestPath[2] !== 'rejected') {
      res.push({
        title: 'Подтверждение изменения'
      })
    }
    return res
  }

  return null
}
