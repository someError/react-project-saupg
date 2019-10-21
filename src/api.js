import axios, { CancelToken, isCancel } from 'axios'
import store from 'store'
import mitt from 'mitt'

import { searchStringToURLParams } from './utils'

const AUTH_EXPIRE_DURATION = 3 * 60 * 60 * 1000

const baseURL = `${process.env.REACT_APP_API || ''}/api`
// const baseURL = `/api`
const api = {
  init () {
    if (!this.axios) {
      this.emitter = mitt()

      this.axios = axios.create({
        baseURL,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      this.axios.interceptors.request.use((config) => {
        this.emit('request')
        return config
      }, (error) => {
        // Do something with request error
        return Promise.reject(error)
      })

      this.axios.interceptors.response.use((res) => {
        return res
      }, (err) => {
        if (!isCancel(err)) {
          this.emit('error', err)
        }

        return Promise.reject(err)
      })

      this.on = this.emitter.on
      this.off = this.emitter.off
      this.emit = this.emitter.emit

      this.storeToken(store.get('token'))
    }
  },

  getAuthHeaders () {
    return {
      'x-token': this.axios.defaults.headers['x-token']
    }
  },

  setToken (token) {
    try {
      this.axios.defaults.headers['x-token'] = token
    } catch (e) {
      console.error(e)
    }
  },

  getFilials () {
    return this.__createRequest('/filials', {
      method: 'get'
    })
  },

  getHouseCategories () {
    return this.__createRequest('/houseCategories', {
      method: 'get'
    })
  },

  getOrganizationCategories () {
    return this.__createRequest('/organizationCategories', {
      method: 'get'
    })
  },
  getDocumentTypes () {
    return this.__createRequest('/documentTypes', {
      method: 'get'
    })
  },

  getAbonents (queryString, isOrg) {
    const limit = ABONENTS_LIMIT
    const query = searchStringToURLParams(queryString)
    query.set('limit', limit)

    const page = Number(query.get('page'))

    if (page) {
      query.delete('page')
      query.set('offset', limit * (page - 1))
    }
    const requestUrl = isOrg ? '/organizations' : '/abonents'

    return this.__createRequest(requestUrl, {
      method: 'get',
      params: query
    })
  },

  getAccount (id, isOrg) {
    const requestUrl = isOrg ? '/organizations' : '/abonents'
    return this.__createRequest(`${requestUrl}/${id}`, {
      method: 'get'
    })
  },

  getObjects (id) {
    return this.__createRequest(`/organizations/${id}/objects`, {
      method: 'get'
    })
  },

  getUserInfo () {
    return this.__createRequest('/auth/profile')
  },

  getAccountRemarks (id) {
    return this.__createRequest(`/abonents/${id}/remarks`, {
      method: 'get'
    })
  },

  getOrganizationRemarks (id) {
    return this.__createRequest(`/organizations/${id}/remarks`, {
      method: 'get'
    })
  },

  getAccountChargeData (id) {
    return this.__createRequest(`/abonents/${id}/chargeData`, {
      method: 'get'
    })
  },

  getBillingSummary (id, isOrg, queryString) {
    if (isOrg) {
      const query = searchStringToURLParams(queryString)
      return this.__createRequest(`/organizations/${id}/turnovers`, {
        method: 'get',
        params: query
      })
    } else {
      return this.__createRequest(`/abonents/${id}/billingSummary`, {
        method: 'get'
      })
    }
  },

  getDebtsByMonths (id, queryString) {
    const query = searchStringToURLParams(queryString)
    return this.__createRequest(`/abonents/${id}/turnovers`, {
      method: 'get',
      params: query
    })
  },

  getDocuments (id, isOrg) {
    const requestUrl = isOrg ? '/organizations' : '/abonents'
    return this.__createRequest(`${requestUrl}/${id}/documents`, {
      method: 'get'
    })
  },

  getDocumentItem (id) {
    return this.__createRequest(`/documents/${id}`, {
      method: 'get'
    })
  },

  getDocumentRemarks (id) {
    return this.__createRequest(`/documents/${id}/remarks`, {
      method: 'get'
    })
  },

  getAccountEquipment (id, isOrg, object) {
    const requestUrl = isOrg ? '/organizations' : '/abonents'
    const objectUrl = object ? `objects/${object}/` : ''
    return this.__createRequest(`${requestUrl}/${id}/${objectUrl}equipment`, {
      method: 'get'
    })
  },

  getEquipmentItem (id) {
    return this.__createRequest(`/equipment/${id}`, {
      method: 'get'
    })
  },

  getMetering (id, queryString) {
    const query = searchStringToURLParams(queryString)
    return this.__createRequest(`/equipment/${id}/meterValues`, {
      method: 'get',
      params: query
    })
  },

  auth (login, password) {
    return this.__createRequest('/auth/login', {
      method: 'post',
      data: {
        login,
        password
      }
    })
  },

  lkkLogin (abonent) {
    return this.__createRequest(`/lkk/login/${abonent}`, { method: 'post' })
  },

  sendMetering (id, date, value) {
    return this.__createRequest(`/equipment/${id}/meterValues`, {
      method: 'post',
      data: {
        date,
        value
      }
    })
  },

  deleteMetering (id, valueId) {
    return this.__createRequest(`/equipment/${id}/meterValues/${valueId}`, {
      method: 'delete'
    })
  },

  getSuprObjects (id, isOrg = false) {
    const type = isOrg ? 'organization' : 'abonent'

    return this.__createRequest(`/supr/objects/${type}/${id}`)
  },

  /**
   * Сохраняет токен в хранилище и добвляет его к заголовкам запроса.
   * Так же можно использовать для обновления срока жизни токена в хранилище.
   * @param token
   */
  storeToken (token) {
    if (token) {
      store.set('token', token, (new Date().getTime()) + AUTH_EXPIRE_DURATION)
      this.setToken(token)
    }
  },

  resetAuth () {
    store.remove('token')
    this.setToken(null)
  },

  registerLkk (id, phone, email) {
    return this.__createRequest(`/abonents/${id}/register`, {
      method: 'post',
      data: {
        phone,
        email
      }
    })
  },

  writePhone (abonent, phone) {
    return this.__createRequest(`/abonents/${abonent}/data/phoneWebsaupg`, {
      method: 'post',
      data: {
        phone
      }
    })
  },

  getAttachedPhones (abonent) {
    return this.__createRequest(`/abonents/${abonent}/data/phoneWebsaupg`, {
      method: 'get'
    })
  },

  activateLkk (id, code) {
    return this.__createRequest(`/abonents/${id}/register/activate`, {
      method: 'post',
      data: {
        code
      }
    })
  },

  changeContactsField (id, data) {
    return this.__createRequest(`/abonents/${id}/contacts`, {
      method: 'put',
      data: data
    })
  },

  sendRequest (data) {
    return this.__createRequest('/updateRequests', {
      method: 'post',
      data
    })
  },

  getRequests (queryString = '') {
    let query = searchStringToURLParams(queryString)
    const page = Number(query.get('page'))
    const limit = REQUESTS_LIMIT
    query.set('limit', limit)

    if (page) {
      query.delete('page')
      query.set('offset', limit * (page - 1))
    }
    return this.__createRequest('/updateRequests', {
      method: 'get',
      params: query
    })
  },

  getRequestNeighbours (id, queryString = '') {
    const query = searchStringToURLParams(queryString)
    query.set('filters[status]', 'open')
    return this.__createRequest(`/updateRequests/${id}/neighbours`, {
      method: 'get',
      params: query
    })
  },

  getRequestDetail (id) {
    return this.__createRequest(`/updateRequests/${id}`, {
      method: 'get'
    })
  },

  changeRequestStatus (id, data) {
    return this.__createRequest(`/updateRequests/${id}/status`, {
      method: 'put',
      data: data
    })
  },

  changeRequest (id, data) {
    return this.__createRequest(`/updateRequests/${id}`, {
      method: 'put',
      data
    })
  },

  getFieldsInfo () {
    return this.__createRequest('/updateFields', {
      method: 'get'
    })
  },

  getRequisites (id) {
    return this.__createRequest(`/organizations/${id}/contacts`, {
      method: 'get'
    })
  },

  getOfficials (id) {
    return this.__createRequest(`/organizations/${id}/officials`, {
      method: 'get'
    })
  },

  getBankAccounts (id) {
    return this.__createRequest(`organizations/${id}/bankAccounts`, {
      method: 'get'
    })
  },

  getLocalities (queryString) {
    const query = searchStringToURLParams(queryString)
    return this.__createRequest('/localities', {
      method: 'get',
      params: query
    })
  },

  getServices (queryString) {
    const query = searchStringToURLParams(queryString)
    return this.__createRequest('/services', {
      method: 'get',
      params: query
    })
  },

  getBudgets (queryString) {
    const query = searchStringToURLParams(queryString)
    return this.__createRequest('/budgets', {
      method: 'get',
      params: query
    })
  },

  getDistrictOperators (filialId) {
    // const query = searchStringToURLParams(filialId)
    return this.__createRequest(`/debt/filials/${filialId}/districtOperators`)
  },

  getConsumptionGroups (queryString) {
    const query = searchStringToURLParams(queryString)
    return this.__createRequest('/consumptionGroups', {
      method: 'get',
      params: query
    })
  },

  getPayments (id, date) {
    const query = searchStringToURLParams(date)
    return this.__createRequest(`/organizations/${id}/payments`, {
      method: 'get',
      params: query
    })
  },

  getDocCalculation (id, queryString) {
    const query = searchStringToURLParams(queryString)
    return this.__createRequest(`/documents/${id}/calculation`, {
      method: 'get',
      params: query
    })
  },

  getDocAttachments (id, type = 'supply') {
    return this.__createRequest(`/documents/${id}/attachments/${type}`, {
      method: 'get'
    })
  },

  getPublications () {
    return this.__createRequest('/content/publications', {
      method: 'get'
    })
  },

  getActiveCall () {
    return this.__createRequest('/telecontact/calls/active', {
      method: 'get'
    })
  },

  getRecentCall () {
    return this.__createRequest('/telecontact/calls/recent', {
      method: 'get'
    })
  },

  error () {
    return this.__createRequest('/some/error/route')
  },

  __createRequest (url, conf = {}) {
    let source = CancelToken.source()

    let config = Object.assign(
      conf,
      {
        cancelToken: source.token
      }
    )

    const req = this.axios(url, config)

    Object.assign(req, {
      cancel: () => {
        source.cancel(`Request canceled: ${url}`)
      }
    })

    req.then(() => {
      const token = store.get('token')

      if (token) {
        this.storeToken(token)
      }
    })

    return req
  }
}

api.filesUrl = '/api/files'

export default api

export const ABONENTS_LIMIT = 10

export const ORGS_LIMIT = 10

export const REQUESTS_LIMIT = 6
