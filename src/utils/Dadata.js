/**
 * позимствовано с https://github.com/mike1pol/dadata-suggestions и модифицировано под работу с axios
 */

import axios, { CancelToken } from 'axios'

/** Dadata API class */
class Dadata {
  /**
   * API constructor
   * @param {string} apiKey Ключ dadata.ru
   */
  constructor (apiKey) {
    this.apiKey = apiKey

    const config = {
      baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${this.apiKey}`
      }
    }

    this.axios = axios.create(config)
  }

  /**
   * Клиент
   * @private
   * @param {string} api Название метода
   * @param {Object} params Параметры
   * @returns {promise}
   */
  _client (api, params) {
    const p = Object.assign({
      count: 5
    }, params)

    let source = CancelToken.source()

    const req = this.axios(api, {
      method: 'POST',
      data: p,
      cancelToken: source.token
    })

    // Object.defineProperty(req, 'cancel', () => { source.cancel(`Request canceled: ${api}`) })

    Object.assign(req, {
      cancel: () => { source.cancel(`Request canceled: ${api}`) }
    })

    return req
  }

  /**
   * Подсказки по ФИО
   * @see {@link https://confluence.hflabs.ru/pages/viewpage.action?pageId=502038691|Документация}
   * @param {object} params Параметры
   * @param {string} params.query Запрос
   * @param {number} [params.count=10] Кол-во возвращаемых результатов
   * @param {string[]} [params.parts=null] Подсказки по части ФИО (NAME, SURNAME, PATRONYMIC)
   * @param {string} [params.gender=UNKNOWN] Пол
   * @return {promise<object[]>}
   */
  fio (params) {
    return this._client('fio', params)
  }

  /**
   * Подсказки по адресу
   * @see {@link https://confluence.hflabs.ru/pages/viewpage.action?pageId=502038680|Документация}
   * @param {object} params Параметры
   * @param {string} params.query Запрос
   * @param {number} [params.count=10] Кол-во возвращаемых результатов
   * @param {object} [params.locations=] Ограничение поиска адреса
   * @param {number} params.location.region_fias_id Ограничение по ФИАС коду региона
   * @param {number} params.location.area_fias_id Ограничение по ФИАС коду области
   * @param {number} params.location.city_fias_id Ограничение по ФИАС коду города
   * @param {number} params.location.settlement_fias_id Ограничение по ФИАС коду населенного пункта
   * @param {number} params.location.street_fias_id Ограничение по ФИАС коду улицы
   * @return {promise<object[]>}
   */
  address (params) {
    const p = Object.assign({
      locations: [{'kladr_id': 50}],
      from_bound: {'value': 'city'},
      restrict_value: true
    }, params)

    return this._client('address', p)
  }

  /**
   * Подсказки по организациям
   * @see {@link https://confluence.hflabs.ru/pages/viewpage.action?pageId=502038697|Документация}
   * @param {object} params Параметры
   * @param {string} params.query Запрос
   * @param {number} [params.count=10] Кол-во возвращаемых результатов
   * @param {string[]} [params.status=null] Фильтр по статусу организации (ACTIVE - активные, LIQUIDATING - ликвидируемые, LIQUIDATED - ликвидированные)
   * @param {string} [params.type=null] Фильтр по юридическим лицам (LEGAL) или индивидуальным предпринимателям (INDIVIDUAL)
   * @param {object[]} params.locations Фильтр по региону
   * @param {number} params.locations.kladr_id Двухзначный код региона по КЛАДР
   * @return {promise<object[]>}
   */
  party (params) {
    return this._client('party', params)
  }

  /**
   * Подсказки по банкам
   * @see {@link https://confluence.hflabs.ru/pages/viewpage.action?pageId=502038711|Документация}
   * @param {object} params Параметры
   * @param {string} params.query Запрос
   * @param {number} [params.count=10] Кол-во возвращаемых результатов
   * @param {string[]} [params.status=null] Фильтр по статусу (ACTIVE - активные, LIQUIDATING - ликвидируемые, LIQUIDATED - ликвидированные)
   * @param {string} [params.type=null] Фильтр по типу банковской организации BANK - банк, NKO - небанковская кредитная организация, BANK_BRANCH - филиал банка, NKO_BRANCH - филиал небанковской кредитной организации, RKC - РКЦ / ГРКЦ, OTHER - другое
   * @return {promise<object[]>}
   */
  bank (params) {
    return this._client('bank', params)
  }

  /**
   * Подсказки по email
   * @see {@link https://confluence.hflabs.ru/pages/viewpage.action?pageId=502038705|Документация}
   * @param {object} params Параметры
   * @param {string} params.query Запрос
   * @param {number} [params.count=10] Кол-во возвращаемых результатов
   * @return {promise<object[]>}
   */
  email (params) {
    return this._client('email', params)
  }
}

export default Dadata

const API_KEY = '199b0b83b9c1a78886df6a418f7c543231e909ec'

export { API_KEY }
