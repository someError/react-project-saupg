import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Input, TextArea, Label } from '../../components/Form'
import ForRoles from '../../components/ForRoles'
import { Button } from '../../components/Button'
import api from '../../api'
import UploaderWidget from '../../components/Files/UploaderWidget'

import { Spinner, OverlaySpinner } from '../../components/Loaders'

import { fetchUpdateFieldDetail, invalidateRequestDetail, fetchUpdateFields } from '../../redux/requests/actions'
import { getBackUrl } from '../../utils/index'
import HeadLine from '../../components/HeadLine/HeadLine'
import RequestCard from '../../components/RequestCard'
import { InputClearIcon } from '../../components/Icons'

class DataChangedDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      updateRequestFields: [],
      fileCollectionsData: [],
      scrollToBottom: false,
      cancelRequestLoading: false,
      rejectRequestLoading: false,
      successRequestLoading: false,
      showCommentForm: false,
      rejectComment: '',
      initialLoad: true,
      nextRequest: null,
      nextRequestLoading: true
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.match.params.fieldId !== nextProps.match.params.fieldId) {
      this.sendR = this.fetchRequest(nextProps.match.params.fieldId)
      this.fetchNextRequest(nextProps.match.params.fieldId)
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({resetFiles: false})
    }
    if (this.state.scrollToBottom) {
      document.getElementById('rejectField').focus()
      window.scrollTo(0, document.body.scrollHeight)
      this.setState({scrollToBottom: false})
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    const { match } = this.props
    this.fetchRequest(match.params.fieldId)
    this.props.setBreadcrumbs(this.props.location, {[match.params.fieldId]: 'Подтверждение изменения'})
  }

  fetchNextRequest (id) {
    this.setState({nextRequestLoading: true})
    api.getRequestNeighbours(id)
      .then(({data: {data}}) => {
        let next = data.next
        if (!next.id) {
          next = data.prev
        }
        if (!next.id) {
          next = null
        }

        this.setState({
          nextRequest: Object.assign({}, next),
          nextRequestLoading: false
        })
      })
  }

  componentWillMount () {
    this.props.invalidateRequestDetail()
    this.fetchNextRequest(this.props.match.params.fieldId)
  }

  fetchRequest (id) {
    this.req = this.props.fetch(id)
    this.req.then(({ data: { data } }) => {
      const updateRequestFields = []
      const fieldsTitles = []
      data.update_request_fields.map((field) => {
        updateRequestFields.push({
          valueNew: field.value_new,
          valuePrev: field.value_new,
          updateField: field.update_field.key
        })
        fieldsTitles.push(field.update_field.title)
      })
      const fileCollectionsData = []
      const initialFiles = data.file_collections.map((collection) => {
        fileCollectionsData.push({
          type: {
            id: collection.type.id,
            title: collection.type.title,
            comment: collection.type.comment
          },
          files: []
        })
        const files = collection.files.map((file) => {
          return {
            preview_url: file.preview_url,
            title: file.title,
            id: file.id
          }
        })
        return {
          type: collection.type.id,
          files: files
        }
      })
      this.setState({
        updateRequestFields: updateRequestFields,
        fileCollectionsData: fileCollectionsData,
        fieldsTitles: fieldsTitles,
        commentCreator: data.comment_creator,
        initialFiles: initialFiles
      })
    })
  }

  showInitialFiles (index) {
    if (!this.state.initialFiles) return false
    // let isOperator = this.props.user.roles.indexOf('ROLE_CALL_OPERATOR') !== -1
    return this.state.initialFiles[index] && this.state.initialFiles[index]['files'].map((file, fileIndex) => {
      return (
        <div className='media-item' key={`${index}file${fileIndex}`}>
          <div className='uploader-image'>
            <ForRoles roles={['ROLE_CALL_OPERATOR']}>
              <div>
                {(this.props.requests.accountDetail.status.key !== 'open') &&
                  <button
                    className='btn uploader-image__remove'
                    onClick={() => {
                      const fileCollectionsData = this.state.initialFiles
                      fileCollectionsData[index]['files'] = fileCollectionsData[index]['files'].filter(el => { return el.title !== file.title })
                      this.setState({initialFiles: fileCollectionsData})
                    }}
                  >×</button>
                }
              </div>
            </ForRoles>
            <img src={file.preview_url} alt={file.title} />
          </div>
        </div>
      )
    })
  }

  changeStatus (data, callback) {
    const { history, match, location, mainPath } = this.props
    this.sendReq = api.changeRequestStatus(match.params.fieldId, data)
    this.setState({cancelRequestLoading: true})
    this.sendReq.then(() => {
      callback()
      if (mainPath) {
        history.push(mainPath)
      } else {
        history.push(getBackUrl(location))
      }
    })
  }

  changeRequest (data) {
    const { fileCollectionsData, initialFiles } = this.state
    const { match, history, location } = this.props
    data.fileCollections = initialFiles.map((collection, i) => {
      let filesArr = []
      if (collection['files'].length) {
        filesArr = collection['files'].slice()
      }
      if (fileCollectionsData[i]['files'].length) {
        filesArr = fileCollectionsData[i]['files'].reduce((res, file) => {
          if (!res.find(el => el.id === file.id)) {
            res.push(file)
          }
          return res
        }, filesArr)
      }

      const files = filesArr.map((file) => {
        return file.id
      })
      return {
        type: collection.type,
        files: files
      }
    })
    this.sendReq = api.changeRequest(match.params.fieldId, data)
    this.sendReq.then(() => {
      if (match.url.indexOf('/account/') !== -1) {
        history.push(`/account/${this.props.match.params.id}`)
      } else {
        history.push(getBackUrl(location))
      }
    })
  }

  onChange (e, index) {
    const newRequestsState = this.state.updateRequestFields
    newRequestsState[index]['valueNew'] = e.target.value
    this.setState({updateRequestFields: newRequestsState})
  }

  render () {
    const { state } = this
    const { requests, match, user } = this.props
    const { fieldsTitles, nextRequest } = state
    if (requests.accountDetailLoading && !requests.accountDetail) {
      return <div className='account-inner-spinner'><Spinner /></div>
    }
    const isAccountPage = match.url.indexOf('/account/') !== -1
    let isOperator = user.roles.indexOf('ROLE_CALL_OPERATOR') !== -1
    const { accountDetail } = requests
    const { status, comment_executor } = accountDetail
    return (
      <div className={classNames({'l-main-column': !isAccountPage})}>
        {
          !isAccountPage && <HeadLine
            name={accountDetail.abonent.name}
            contract={accountDetail.abonent.contract}
            backUrl='/requests'
          />
        }
        {
          status.key !== 'canceled' ? (
            <div>
              {requests.accountDetailLoading && <OverlaySpinner />}
              <div className='content'>
                <div className='content-title'>Абонент</div>
                <div>
                  <div className='card-user__info-name'>
                    { accountDetail.abonent.name }
                  </div>
                  <div className='card-user__id'> №{ accountDetail.abonent.id }</div>
                </div>
                <div className='card-user__info-location'>{ accountDetail.abonent.data.address }</div>
              </div>
              <div className='content-default-wrapper'>
                <div className='content-title-uppercase'>
                  Измененнная информация
                  {status.key === 'rejected' && <span className='text-red' style={{'paddingLeft': 10}}>Отклонено</span>}
                </div>
                <div className='l-two-cols'>
                  {
                    state.updateRequestFields.map((request, i) => {
                      return (
                        <div key={fieldsTitles[i]} className='l-two-cols-col'>
                          <Label>{fieldsTitles[i]}</Label>
                          <Input
                            icon={(status.key !== 'open' && isOperator) && <InputClearIcon size='20px' />}
                            value={request.valueNew}
                            onChange={e => { this.onChange(e, i) }}
                            disabled={status.key === 'open' || !isOperator} />
                        </div>
                      )
                    })
                  }
                </div>
                <Label>Комментарий</Label>
                <TextArea
                  value={state.commentCreator || ''}
                  onChange={e => this.setState({commentCreator: e.target.value})}
                  disabled={status.key === 'open' || !isOperator}
                />
              </div>
              <div className='content content--transparent'>
                <div className='content-title-uppercase content-title-uppercase--single'>Прикрепленные документы</div>
              </div>
              {state.fileCollectionsData.length && state.fileCollectionsData.map((collection, index) => {
                return (
                  <div className='content' key={`${collection.type.id}content${index}`}>
                    {
                      (!isOperator || status.key === 'open')
                        ? (
                          <div>
                            <div className='l-uploader-row' ref={`uploader-${collection.type.id}`}>
                              <Label>{collection.type.title} <span className='text-gray text-italic'>({ collection.type.comment })</span></Label>
                              { this.showInitialFiles(index) }
                            </div>
                          </div>
                        )
                        : (
                          <div>
                            <div className='l-uploader-row' ref={`uploader-${collection.type.id}`}>
                              <Label>{ collection.type.title }
                                <span className='text-gray text-italic'> ({ collection.type.comment })</span>
                              </Label>
                              <UploaderWidget
                                filters={[{title: 'Image files', extensions: 'jpg,gif,png'}]}
                                loaderId={match.params.fieldId}
                                customImg={<span>{this.showInitialFiles(index)}</span>}
                                onRemove={(file) => {
                                  const fileCollectionsData = state.fileCollectionsData
                                  fileCollectionsData[index]['files'] = fileCollectionsData[index]['files'].filter(el => { return el.title !== file[0]['name'] })
                                  this.setState({fileCollectionsData: fileCollectionsData})
                                }}
                                autoUpload
                                onFileUploaded={(answer) => {
                                  const fileCollectionsData = state.fileCollectionsData
                                  fileCollectionsData[index]['files'].push(answer.data)
                                  this.setState({ fileCollectionsData: fileCollectionsData })
                                }}
                              />
                            </div>
                          </div>
                        )
                    }
                  </div>
                )
              })}
              {
                comment_executor && <div className='content'>
                  <div className='content-title-uppercase'>причина отклонения заявки</div>
                  <Label>Комментарий</Label>
                  <div>{ comment_executor }</div>
                </div>
              }
              <ForRoles roles={['ROLE_SAUPG_EXECUTOR']}>
                <div>
                  {
                    state.showCommentForm && <div className='content'>
                      <TextArea
                        id='rejectField'
                        value={state.rejectComment}
                        onChange={e => this.setState({rejectComment: e.target.value})}
                        placeholder='Опишите причину отклонения изменяемых данных'
                      />
                    </div>
                  }
                </div>
              </ForRoles>
              <div className='content'>
                <div className='content-text-center'>
                  <ForRoles roles={['ROLE_CALL_OPERATOR']}>
                    <div className='l-two-cols l-two-cols--btn'>
                      {
                        status.key !== 'open' && <div className='l-two-cols-col'>
                          <Button loading={state.cancelRequestLoading} className='btn--fill'
                            onClick={() => {
                              this.changeRequest({
                                updateRequestFields: state.updateRequestFields,
                                commentCreator: state.commentCreator,
                                abonent: accountDetail.abonent.id
                              })
                            }}
                          >
                            Изменить заявку
                          </Button>
                        </div>
                      }
                      <div className='l-two-cols-col'>
                        <Button loading={state.cancelRequestLoading} className='btn--transparent'
                          onClick={() => {
                            this.changeStatus({ status: 'canceled' }, () => {
                              this.setState({cancelRequestLoading: false})
                            })
                          }}
                        >
                          Отменить заявку
                        </Button>
                      </div>
                    </div>
                  </ForRoles>
                  {
                    status.key === 'open' && <ForRoles roles={['ROLE_SAUPG_EXECUTOR']}>
                      <div className='l-two-cols l-two-cols--btn'>
                        {
                          !state.showCommentForm && <div className='l-two-cols-col'>
                            <Button
                              className='btn--fill'
                              loading={state.successRequestLoading}
                              onClick={() => {
                                this.changeStatus({status: 'done'}, () => {
                                  this.setState({successRequestLoading: false})
                                })
                              }}
                            >
                              Исполнить в САУПГ
                            </Button>
                          </div>
                        }
                        <div className='l-two-cols-col'>
                          <Button
                            loading={state.rejectRequestLoading}
                            className='btn--red btn--fill'
                            disabled={state.showCommentForm && state.rejectComment.length < 5}
                            onClick={() => {
                              if (state.showCommentForm) {
                                this.changeStatus({status: 'rejected', comment: state.rejectComment}, () => {
                                  this.setState({rejectRequestLoading: false})
                                })
                              } else {
                                this.setState({showCommentForm: true, scrollToBottom: true})
                              }
                            }}
                          >
                            Отклонить
                          </Button>
                        </div>
                        {
                          state.showCommentForm && <div className='l-two-cols-col'>
                            <Button
                              className='btn--transparent btn--fill'
                              onClick={() => { this.setState({showCommentForm: false}) }}
                            >
                              Отменить
                            </Button>
                          </div>
                        }
                      </div>
                    </ForRoles>
                  }
                </div>
              </div>
            </div>
          ) : (
            <div className='content'>
              Заявки не существует
            </div>
          )
        }
        {
          (!state.nextRequestLoading && state.nextRequest.id) && <div className='l-next-request'>
            <div className='content-title-uppercase'>Следующая заявка на изменение данных</div>
            <RequestCard
              key={nextRequest.id}
              detail={`/requests/${nextRequest.id}`}
              date={nextRequest.date_created}
              onReview
              // contract={nextRequest.abonent.contract}
              totalFields={nextRequest.update_request_fields.length}
              author={nextRequest.user_creator.full_name}
            >
              <div className='request-card__title'>{ nextRequest.abonent.name }</div>
              <div className='request-card__content-bot'>
                {nextRequest.abonent.data && nextRequest.abonent.data.address && <div>{nextRequest.abonent.data.address}</div>}
                {nextRequest.abonent.contract && <div className='card-user__id'>№{nextRequest.abonent.contract}</div>}
              </div>
            </RequestCard>
          </div>
        }
      </div>
    )
  }
}
const mapStateToProps = ({ account, requests, user }) => {
  return {
    account,
    requests,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch (id) {
      return dispatch(fetchUpdateFieldDetail(id))
    },
    invalidateRequestDetail () {
      return dispatch(invalidateRequestDetail())
    },
    fetchRequests (filters) {
      return dispatch(fetchUpdateFields(filters))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataChangedDetail)
