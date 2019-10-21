import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import intersection from 'lodash/intersection'

import is from 'is_js'

import api from '../../api'

import { fetchUpdateFields } from '../../redux/requests/actions'

import { formatBalance, pluralize, strToAbsNum, isValidPhoneNumber } from '../../utils'

import { CloseIcon } from '../../components/Icons'
import AccordionLine from '../../components/AccordionLine'
import { CardUser, CardOrg } from '../../components/CardUser'
import { Input, InputPhone, Label, ErrorMessage, Select } from '../../components/Form'
import { Comment } from '../../components/Comment'
import { Button } from '../../components/Button'
import { OverlaySpinner, Spinner } from '../../components/Loaders'
import Template from '../../components/Template'

class Main extends Component {
  constructor (props) {
    super(props)
    const { data } = props.account.accountSummary

    this.state = {
      prevEmail: data.email || '',
      prevPhone: data.phone_lk || '',
      email: data.email || '',
      phone: data.phone_lk || '',
      incoming_phone: props.user.incoming_phone && props.user.incoming_phone.incoming_phone,
      errors: {
        email: null,
        phone: null
      },
      loading: {
        email: false,
        phone: false
      }
    }
  }

  componentWillMount () {
    const { account } = this.props
    const { accountSummary, objects } = account
    if (account.isOrg) {
      this.setState({
        object: (objects.length && objects[0]['id']) || null,
        objectInfo: objects[0]
      })
    }

    this.req = this.props.fetch('filters[abonent]=' + accountSummary.id + '&filters[status]=open,draft')

    this.props.setBreadcrumbs()
  }

  componentDidMount () {
    const { accountSummary, isOrg } = this.props.account
    const { user } = this.props
    store.set('lastCardProps', accountSummary)

    !isOrg && api.getAttachedPhones(accountSummary.id)
      .then(({ data: { data } }) => {
        if (!user.incoming_phone || !user.incoming_phone.incoming_phone) return
        if (Object.keys(data).filter(key => data[key] === user.incoming_phone.incoming_phone).length) {
          this.setState({ phoneExist: true })
        }
      })
  }

  componentWillReceiveProps (nextProps) {
    const { user } = this.props
    if (
      !user.incoming_phone || !user.incoming_phone.incoming_phone ||
      !nextProps.user.incoming_phone || !nextProps.user.incoming_phone.incoming_phone
    ) return

    if (user.incoming_phone.incoming_phone !== nextProps.user.incoming_phone.incoming_phone) {
      this.setState({incoming_phone: nextProps.user.incoming_phone.incoming_phone})
    }
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  setErrors (errors) {
    this.setState({
      errors: Object.assign({}, this.state.errors, errors)
    })
  }

  onBlur (e, id) {
    const { state } = this
    const fieldName = e.target.name
    const setCurLoadingField = (name, bool) => {
      const currLoadingField = {}
      currLoadingField[name] = bool
      this.setState({
        loading: Object.assign({}, this.state.loading, currLoadingField)
      })
    }

    if (isValidPhoneNumber(this.state[fieldName]) || is.email(this.state[fieldName])) {
      this.changeRequest = api.changeContactsField(id, {email: state.email, phone: state.phone})
      setCurLoadingField(fieldName, true)

      this.changeRequest
        .then(({data: { success }}) => {
          if (success) {
            this.setErrors({
              phone: null
            })
            setCurLoadingField(fieldName, false)
            const successMsgs = Object.assign({}, state.successMsgs)
            successMsgs[fieldName] =
              <span
                className='field-notify'
              >Заявка на изменение контактных данных отправлена <br />Новые данные отобразятся через сутки</span>

            this.setState({successMsgs})
          }
        })
        .catch(({response: {data: {data}}}) => {
          this.setErrors({
            phone: data.message
          })
          setCurLoadingField(fieldName, false)
        })
    }
    return this.changeRequest
  }

  attachPhone () {
    const { account: { accountSummary } } = this.props
    this.setState({ attachLoading: true })
    api.writePhone(accountSummary.id, this.state.incoming_phone)
      .then(() => {
        this.setState({
          hideAttachForm: true,
          attachLoading: false
        })
      })
      .catch((err) => {
        console.log(err)
        this.setState({attachLoading: false})
      })
  }

  render () {
    const { state, props } = this
    const { match, account, requests, breadcrumbs, user } = this.props
    const { summaryLoading, accountSummary, accountRemarks, suprObjects, suprObjectsLoading } = account
    const _suprObjects = suprObjects && suprObjects[0] && suprObjects[0]['supr_objects']

    const _suprObjectsCnt = _suprObjects
      ? _suprObjects.filter(({ common_name }) => !!common_name).length
      : 0

    const { accountListLoading } = requests

    if (summaryLoading || accountListLoading) {
      return <OverlaySpinner />
    }

    const { summary, data, balance } = accountSummary

    let _path = '/search'
    const _pathArr = match.url.split('/')
    if (_pathArr[1] !== 'account') {
      _path = `/${_pathArr[1]}/search`
    }
    return (
      <Template>
        <div className='head-line'>
          <div className='head-line-left'>
            <div className='head-line_text'>Карточка {account.isOrg ? 'компании' : 'абонента'}</div>
          </div>
          <div className='head-line-right'>
            <Link
              to={(breadcrumbs.searchQuery && _path + '?' + breadcrumbs.searchQuery) || _path}><CloseIcon /></Link>
          </div>
        </div>

        {
          account.isOrg ? (
            <CardOrg {...accountSummary} match={match} />
          ) : (
            <CardUser {...accountSummary} />
          )
        }

        {
          (data.phone || data.phone_lk || data.phone_local || data.email) &&
          <div className='content'>
            <div className='content-title-uppercase'>Информация по абоненту</div>
            <div className='l-two-cols l-two-cols--modified'>
              {
                data.email && <div className='l-two-cols-col'>
                  <Label>Почта</Label>
                  <div className='input-wrap form-input-without-border'>
                    {state.loading.email && <OverlaySpinner />}
                    <Input
                      name='email'
                      // disabled={state.successMsgs && state.successMsgs.email}
                      onChange={(e) => {
                        this.setState({email: e.target.value})
                        this.setErrors({
                          email: e.target.value && !is.email(e.target.value) ? 'Неверный формат' : null
                        })
                      }}
                      onBlur={e => {
                        if (state.prevEmail !== state.email) {
                          this.onBlur(e, accountSummary.id)
                        }
                      }}
                      value={state.email}
                    />
                    {/* <ReviewIcon color='#f04e23' className='input-icon' /> */}
                  </div>
                  <ErrorMessage>{state.errors.email}</ErrorMessage>
                  { state.successMsgs && state.successMsgs.email }
                </div>
              }
              {
                (data.phone_lk || data.phone || data.phone_local) && <div className='l-two-cols-col'>
                  <Label>Телефон</Label>
                  <div className='spinner-wrap form-input-without-border'>
                    {state.loading.phone && <OverlaySpinner />}
                    <InputPhone
                      // readOnly={!data.phone_lk}
                      name='phone'
                      // disabled={state.successMsgs && state.successMsgs.phone}
                      value={data.phone_lk ? state.phone : data.phone || data.phone_local}
                      onChange={e => {
                        this.setState({phone: e.target.value})
                        this.setErrors({
                          phone: e.target.value && !isValidPhoneNumber(e.target.value) ? 'Неверный формат номера' : null
                        })
                      }}
                      onBlur={e => this.onBlur(e, accountSummary.id)}
                    />
                    {/* <ReviewIcon color='#f04e23' className='input-icon' /> */}
                  </div>
                  <ErrorMessage>{state.errors.phone}</ErrorMessage>
                  { state.successMsgs && state.successMsgs.phone }
                </div>
              }
            </div>
            {
              !intersection(['ROLE_WEBSAUPG_USER'], user.roles).length
                ? <div className='card-user__bottom'>
                  <Link to={`${match.url}/add-request`} className='content-link-uppercase'>
                    Изменить данные клиента
                  </Link>
                </div>
                : null
            }
          </div>
        }

        {
          (intersection(['ROLE_CALL_OPERATOR'], user.roles).length &&
            !state.hideAttachForm &&
            !state.phoneExist &&
            user.incoming_phone &&
            (
              !user.incoming_phone.incoming_abonents ||
              (
                user.incoming_phone.incoming_abonents &&
                !user.incoming_phone.incoming_abonents.filter(abonent => (abonent.id === accountSummary.id)).length
              )
            ))
            ? <div className='content c-call-action'>
              <div>
                <Label>Прикрепите телефон к карточке абонента</Label>
                <InputPhone
                  disabled={!!user.incoming_phone.incoming_phone || state.attachLoading}
                  getFormattedValue={(getValue) => this.setState({incoming_phone: getValue()})}
                  value={state.incoming_phone}
                  onChange={(e) => this.setState({ incoming_phone: e.target.value })}
                />
              </div>
              <Button
                onClick={() => this.attachPhone()}
                loading={state.attachLoading}
                disabled={!isValidPhoneNumber(state.incoming_phone)}
              >
                Прикрепить
              </Button>
            </div> : null
        }

        {
          (account.isOrg && accountSummary.objects.length) ? (
            <div className='content-default-wrapper content--orange'>
              <div className='content-title-uppercase'>Информация по выбранному объекту</div>
              <Label>Объект</Label>
              <Select
                value={this.state.object}
                onChange={e => {
                  const objectInfo = account.objects.filter((obj) => { return Number(obj.id) === Number(e.target.value) })
                  this.setState({
                    object: e.target.value,
                    objectInfo: objectInfo[0]
                  })
                }}
              >
                {
                  accountSummary.objects.map((obj) => {
                    return <option key={obj.id} value={obj.id}>{ obj.title }</option>
                  })
                }
              </Select>
              <div className='spinner-wrap'>
                { account.fetchingObjects ? <Spinner />
                  : (
                    state.objectInfo && <div className='l-two-cols'>
                      <div className='l-two-cols-col'>
                        <div className='content-text-uppercase'>Статус объекта</div>
                        <div className='content-text-medium'>
                          {state.objectInfo.status ? <div className='text-red'>Отключен</div>
                            : <div className='text-green'>Обслуживается</div>}
                        </div>
                      </div>
                      { state.objectInfo.code && <div className='l-two-cols-col'>
                        <div className='content-text-uppercase'>Код объекта</div>
                        <div className='content-text-medium'>
                          { state.objectInfo.code }
                        </div>
                      </div> }
                      { state.objectInfo.contact_name && <div className='l-two-cols-col'>
                        <div className='content-text-uppercase'>Контактное лицо</div>
                        <div className='content-text-medium'>
                          { state.objectInfo.contact_name }
                        </div>
                      </div> }
                      { state.objectInfo.contact_position && <div className='l-two-cols-col'>
                        <div className='content-text-uppercase'>Должность</div>
                        <div className='content-text-medium'>
                          { state.objectInfo.contact_position }
                        </div>
                      </div> }
                      { state.objectInfo.address && <div className='l-two-cols-col'>
                        <div className='content-text-uppercase'>Адрес</div>
                        <div className='content-text-medium'>
                          { state.objectInfo.address }
                        </div>
                      </div> }
                      { state.objectInfo.contact_email && <div className='l-two-cols-col'>
                        <div className='content-text-uppercase'>Почта</div>
                        <div className='content-text-medium'>
                          { state.objectInfo.contact_email }
                        </div>
                      </div> }
                      { state.objectInfo.contact_phone && <div className='l-two-cols-col'>
                        <div className='content-text-uppercase'>Телефон</div>
                        <div className='content-text-medium'>
                          { state.objectInfo.contact_phone }
                        </div>
                      </div> }
                    </div>
                  )
                }
              </div>
            </div>
          ) : null
        }

        <AccordionLine to={`${match.url}/billing-summary`} title='Контроль задолженности'>
          {
            balance && balance < 0 && <div>
              <div className='text-red'>
                Долг: {formatBalance(strToAbsNum(balance))}
              </div>
            </div>
          }
        </AccordionLine>

        {
          summary.equipment_consumers_total || summary.equipment_meters_total
            ? (
              <AccordionLine to={`${match.url}/equipment`} title='Оборудование абонента'>
                {
                  summary.equipment_consumers_total
                    ? <div>Газоиспользующее
                      оборудование: {summary.equipment_consumers_total}</div>
                    : null
                }
                {
                  summary.equipment_meters_total
                    ? (
                      <div>
                        Счетчики: {summary.equipment_meters_total + ' '}
                        {
                          summary.equipment_meters_unchecked_total
                            ? (
                              <span className='text-red'>
                                 (истек срок поверки: {summary.equipment_meters_unchecked_total})
                              </span>
                            )
                            : null
                        }
                      </div>
                    )
                    : null
                }
              </AccordionLine>
            )
            : null
        }

        {
          summary.doc_total
            ? (
              <AccordionLine to={`${match.url}/documents`} title='Договоры'>
                <div>Договоры: {summary.doc_total}</div>
                {
                  summary.dog_tech_total
                    ? <div>Договоры на ТО: {summary.doc_tech_total}</div>
                    : null
                }
                {
                  account.isOrg && <Template>
                    <div>ПГ: {summary.doc_transport_total ? 'есть' : <span className='text-red'>нет</span>}</div>
                    <div>ТО ВГДО: {summary.doc_tech_total ? 'есть' : <span className='text-red'>нет</span>}</div>
                  </Template>
                }
              </AccordionLine>
            )
            : null
        }

        {
          !account.isOrg && <AccordionLine to={{
            pathname: `${match.url}/charge-data`,
            state: {
              backUrl: match.url
            }
          }} title='Данные для начисления'>
            <div>
              Общая площадь: {summary.area ? summary.area + ' м' : '-'}
            </div>
            <div>
              Прописано жителей: {summary.people_registered ? summary.people_registered : '-'}
            </div>
          </AccordionLine>
        }

        {
          !intersection(['ROLE_WEBSAUPG_USER'], user.roles).length && !account.isOrg ? <AccordionLine to={{
            pathname: `${match.url}/requests`,
            state: {
              backUrl: match.url
            }
          }} title='Заявки на изменение информации' /> : null
        }

        {
          accountSummary.has_meter
            ? (
              <AccordionLine to={`${match.url}/metering`} title='Ввод показаний'>
                <div>
                  { summary.equipment_meters_total + pluralize(summary.equipment_meters_total, ' прибор', ' прибора', ' приборов') }
                </div>
              </AccordionLine>
            )
            : null
        }

        {
          account.isOrg &&
          <Template>
            <AccordionLine to={`${match.url}/contacts`} title='Реквизиты организации / адрес' />
            <AccordionLine to={`${match.url}/officials`} title='Должностные лица / Расчетные счета / Дополнительная информация' />
          </Template>
        }

        {
          suprObjectsLoading && <div style={{ padding: '10px', textAlign: 'center' }}>
            <Spinner size={10} />
          </div>
        }

        {
          _suprObjectsCnt
            ? (
              <AccordionLine to={`${match.url}/objects`} title='Объекты на карте'>
                <div>{_suprObjectsCnt} {pluralize(_suprObjectsCnt, ' объект', ' объекта', ' объектов')}</div>
              </AccordionLine>
            )
            : null
        }

        {
          accountRemarks && accountRemarks.length
            ? <div className='content'>
              {
                accountRemarks.map(({id, ...remark}) => (
                  <Comment {...remark} key={`remark-${id}`} />
                ))
              }
            </div>
            : null
        }

        {/* sapog-61
          (account.accountRemarksLoading || accountRemarks.length > 0) && <div className='content'>
            {
              account.accountRemarksLoading
                ? <OverlaySpinner />
                : accountRemarks.map((comment) => {
                  return <Comment {...comment} key={comment.id} />
                })
            }
          </div>
        */}
        {/*
          (requests.accountListLoading || requests.items.length > 0) && <div>
            {
              requests.accountListLoading
                ? <div className='content'><OverlaySpinner /></div>
                : (
                  <div>
                    <div className='content content--transparent'>
                      <div className='content-title-uppercase content-title-uppercase--single'>Заявки на изменение данных</div>
                    </div>
                    {
                      requests.items.map((request) => {
                        const { user_creator, status, date_created, id, fields_total } = request
                        return (
                          <RequestCard
                            key={id}
                            detail={`${match.url}/changed-request/${id}`}
                            onReview={status.key === 'open'}
                            date={date_created}
                            rightContent={user_creator.full_name}
                          >
                            <div className='request-card__title'>
                                Всего { fields_total } { pluralize(fields_total, 'изменение', 'изменения', 'изменений') }
                            </div>
                          </RequestCard>
                        )
                      })
                    }
                  </div>
                )
            }
          </div>
        */}
      </Template>
    )
  }
}

const mapStateToProps = ({account, requests, breadcrumbs, user}) => {
  return {
    account,
    requests,
    breadcrumbs,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch (filters) {
      return dispatch(fetchUpdateFields(filters))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
