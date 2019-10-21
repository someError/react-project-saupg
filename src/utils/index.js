import accounting from 'accounting'
import moment from 'moment'
import { format, parse, isValidNumber } from 'libphonenumber-js'

/**
 * численные формы слов
 * @param {Number} n число
 * @param {String} one один (например, день)
 * @param {String} few несколько (например, дня)
 * @param {String} many всё остальное (например, дней)
 * @return {String}
 */
export function pluralize (n, one, few, many) {
  const d = Number(n.toString().substr(-1))

  if (n > 10 && n < 20) {
    return many
  } else if (d === 1) {
    return one
  } else if (d >= 2 && d <= 4) {
    return few
  }

  return many
}

/**
 * Конвертирует объект в URLSearchParam
 * @param {Object} search - query-строка
 * @return {URLSearchParams}
 */
export function stateToUrlParams (obj, additionalField = '') {
  let str = ''
  Object.keys(obj).map((key) => {
    if (str !== '' && obj[key] !== '') {
      str += '&'
    }
    if (obj[key] !== '') {
      str += `filters${additionalField}[${key}]=${obj[key]}`
    }
  })
  return searchStringToURLParams(str)
}

/**
 * Конвертирует query строку в URLSearchParams
 * @param {String} search - query-строка
 * @return {URLSearchParams}
 */
export function searchStringToURLParams (search) {
  if (typeof search === 'string') {
    search = search.replace(/^\?/, '')
  }

  return search instanceof URLSearchParams ? cloneSearchUrlParams(search) : new URLSearchParams(search)
}

export function cloneSearchUrlParams (search) {
  if (search instanceof URLSearchParams) {
    return new URLSearchParams(search.toString())
  }

  return search
}

/**
 * слияние query-строк
 *
 * @return {URLSearchParams}
 */
export function mergeQueryStrings (basicQuery, ...queries) {
  const basic = new URLSearchParams(basicQuery)

  return queries.reduce((res, qs) => {
    const params = new URLSearchParams(qs)

    params.forEach((val, key) => {
      res.set(key, val)
    })

    return res
  }, basic)
}

export function deleteParams (queryString, ...params) {
  const query = new URLSearchParams(queryString)

  if (params.length < 1) {
    return query
  }

  params.forEach((param) => {
    query.delete(param)
  })

  return query
}

export function strToAbsNum (val) {
  return Math.abs(Number(val))
}

export function formatBalance (balance, rub = '₽') {
  if (rub === false) rub = ''
  balance = Number(balance)
  return `${accounting.formatNumber(balance, 2, ' ')} ${rub}`
}

export function formatDate (date, format = 'DD.MM.YYYY') {
  const formatted = moment.utc(date)
  return formatted.local().format(format)
}

export function formatPhone (phone) {
  return format(phone, 'RU', 'International')
}

export function parsePhone (phone, country = 'RU') {
  return parse(phone, country)
}

export function isValidPhoneNumber (phone, country = 'RU') {
  return isValidNumber(phone, country)
}

const PHONE_STARTS_SEVEN_REGEXP = /(^7|^8)/
const PHONE_CODE_REGEXP = /(\+7|\+)/

export function normalizePhoneNumber (phone) {
  if (!phone) {
    return phone
  }

  if (!PHONE_CODE_REGEXP.test(phone)) {
    if (PHONE_STARTS_SEVEN_REGEXP.test(phone)) {
      return phone.replace(PHONE_STARTS_SEVEN_REGEXP, '+7')
    } else {
      return '+7' + phone
    }
  }

  return phone
}

export function getBackUrl (location) {
  if (location.state && location.state.backUrl) {
    return location.state.backUrl
  } else {
    let urlArr = location.pathname.split('/')
    urlArr.pop()
    return urlArr.join('/')
  }
}

export const noop = () => {}

export const urlCreator = window.URL || window.webkitURL

export const isImage = (mimeType = '', exclude = []) => {
  const type = mimeType.split('/')
  return type[0] === 'image' && exclude.indexOf(type[1]) < 0
}

export const getFileExt = (name) => {
  const match = name.match(/\.(.*?)$/)
  console.log(name, match[1])
  return match ? match[1] : null
}

export function validatePhone (string) {
  const regexp = /^(8|\+7)\s\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{2}[\s.-]\d{2}$/
  return regexp.test(string)
}

// export function isFieldOnReview (requests, abonentId, fieldKey) {
//   let isFieldOnReview = false
//   requests.map((request) => {
//     if (
//       request.abonent.id === abonentId &&
//       request.update_field.key === fieldKey &&
//       request.status.key === 'open'
//     ) {
//       isFieldOnReview = true
//       return false
//     }
//   })
//   return isFieldOnReview
// }

export function validateNumber (event) {
  const key = (window.event) ? event.which : event.keyCode
  console.log(key)
  if (event.keyCode === 8 || event.keyCode === 46) {
    return true
  } else if (key < 48 || key > 57) {
    return false
  } else {
    return true
  }
}
