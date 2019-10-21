import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, TextArea, Label } from '../../components/Form'
import { Button } from '../../components/Button'
import api from '../../api'
import UploaderWidget from '../../components/Files/UploaderWidget'
import { SlideAnimation } from '../../components/Animation'
import { InputClearIcon } from '../../components/Icons'

import Spinner from '../../components/Loaders/Spinner'

import { fetchFieldsInfo } from '../../redux/requests/actions'

const LABELS = {
  name: 'ФИО',
  contract: 'Лицевой счет',
  org_title: 'Наименование организации',
  code: 'Код абонента',
  object_name: 'Наименование объекта'
}

class DataChange extends Component {
  constructor (props) {
    super(props)
    const { account } = props
    const { accountSummary } = account
    this.state = {
      updateRequestFields: [
        {
          updateField: 'name',
          valuePrev: accountSummary.name,
          valueNew: accountSummary.name,
          valueMedium: accountSummary.name
        },
        {
          updateField: 'contract',
          valuePrev: accountSummary.contract,
          valueNew: accountSummary.contract,
          valueMedium: accountSummary.contract
        }
      ],
      abonent: accountSummary.id,
      commentCreator: '',
      sendRequestLoading: false,
      loaders: [],
      collectionFields: {},
      fileCollections: [],
      filesData: []
    }
  }

  componentWillMount () {
    const { account: { accountSummary, isOrg } } = this.props
    if (isOrg) {
      this.setState({
        updateRequestFields: [
          {
            updateField: 'org_title',
            valuePrev: accountSummary.title,
            valueNew: accountSummary.title,
            valueMedium: accountSummary.title
          },
          {
            updateField: 'code',
            valuePrev: accountSummary.code,
            valueNew: accountSummary.code,
            valueMedium: accountSummary.code
          }
        ]
      })
    }
  }

  componentDidMount () {
    const { location } = this.props

    this.props.fetchFieldsInfo()

    this.props.setBreadcrumbs(location)
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  onChange (e, index) {
    const newRequestsState = this.state.updateRequestFields
    newRequestsState[index]['valueNew'] = e.target.value
    this.setState({updateRequestFields: newRequestsState})
  }

  onInputClick (index) {
    const newRequestsState = this.state.updateRequestFields
    newRequestsState[index]['valueNew'] = ''
    this.setState({updateRequestFields: newRequestsState})
    document.getElementById(`input-${index}`).focus()
  }

  onBlur (index) {
    const { state } = this
    const { requests } = this.props
    const curField = state.updateRequestFields[index]

    if (curField.valueMedium !== curField.valueNew) {
      const collectionFields = state.collectionFields
      const newRequestsState = state.updateRequestFields

      newRequestsState[index]['valueMedium'] = curField.valueNew
      const curFieldInfo = requests.fieldsInfo.filter((field) => {
        return field.key === curField.updateField
      })

      const { file_collection_types } = curFieldInfo[0]

      let newLoaderCollection = file_collection_types.reduce((res, loader) => {
        if (!res.find(el => el.id === loader.id)) {
          res.push(loader)
        }
        return res
      }, state.loaders)

      file_collection_types.map((loader) => {
        if (!collectionFields[loader.id]) collectionFields[loader.id] = []

        const collectionFieldsKey = collectionFields[loader.id].indexOf(curField.updateField)
        if (collectionFieldsKey === -1) {
          collectionFields[loader.id].push(curField.updateField)
        }

        if (collectionFieldsKey !== -1 && curField.valuePrev === curField.valueNew) {
          collectionFields[loader.id].splice(collectionFieldsKey, 1)
          if (!collectionFields[loader.id].length) {
            delete collectionFields[loader.id]
            newLoaderCollection = newLoaderCollection.filter(el => { return el.id !== loader.id })
          }
        }
      })

      this.setState({
        updateRequestFields: newRequestsState,
        loaders: newLoaderCollection,
        collectionFields: collectionFields
      })
    }
  }

  isSubmitDisabled () {
    let _answer = false
    const { loaders, fileCollections, commentCreator } = this.state
    if (!loaders.length || !fileCollections.length || commentCreator.length < 4) _answer = true
    return _answer
  }

  render () {
    const { state } = this
    const { account, history, requests, mainPath } = this.props
    const { sendRequestLoading, loaders, collectionFields, updateRequestFields, filesData, abonent, ...requestData } = state
    if (requests.fieldsInfoLoading) {
      return <div className='account-inner-spinner'><Spinner /></div>
    }
    return (
      <div>
        <div className='content-default-wrapper'>
          <div className='content-title content-title--with-descr'>Изменяемые данные</div>
          <div className='content-text-helper'>Для изменения выбранного вами поля, введите данные ниже и загрузите необходимые документы.</div>
          <div className='l-two-cols'>
            {
              state.updateRequestFields.map((field, i) => {
                return (
                  <div className='l-two-cols-col' key={state.abonent + field.updateField}>
                    <Label>{ LABELS[field.updateField] }</Label>
                    <Input
                      id={`input-${i}`}
                      icon={<InputClearIcon size='20px' />}
                      value={field.valueNew}
                      onChange={e => { this.onChange(e, i) }}
                      onBlur={() => { this.onBlur(i) }}
                      onIconClick={() => { this.onInputClick(i) }}
                    />
                  </div>
                )
              })
            }
          </div>
          <Label>Комментарий</Label>
          <TextArea placeholder='Опишите причину изменения данных' value={state.commentCreator} onChange={e => this.setState({commentCreator: e.target.value})} />
        </div>
        {
          (loaders.length && Object.keys(collectionFields).length) ? <div>
            <div className='content content--transparent'>
              <div className='content-title-uppercase content-title-uppercase--single'>подтверждающие документы</div>
            </div>
            {
              loaders.map((loader, i) => {
                return (
                  <SlideAnimation key={'loader' + loader.id}>
                    <div className='content l-uploader-row'>
                      <Label>{loader.title} <span className='text-gray text-italic'>({ loader.comment })</span></Label>
                      <UploaderWidget
                        filters={[{title: 'Image files', extensions: 'jpg,gif,png'}]}
                        onRemove={(file) => {
                          let collectionIndex = null
                          const fileCollections = state.fileCollections
                          const filesData = state.filesData
                          fileCollections.map((el, i) => {
                            if (el.type === loader.id) collectionIndex = i
                          })
                          if (collectionIndex > -1) {
                            filesData[collectionIndex] = filesData[collectionIndex].filter(el => { return el.title !== file[0]['name'] })
                            fileCollections[collectionIndex]['files'] = []
                            filesData[collectionIndex].map((el) => {
                              fileCollections[collectionIndex]['files'].push(el.id)
                            })
                          }
                          this.setState({fileCollections: fileCollections})
                        }}
                        autoUpload
                        onFileUploaded={(answer) => {
                          const fileCollections = state.fileCollections
                          const filesData = state.filesData

                          if (!filesData[i]) filesData[i] = []
                          if (!fileCollections[i]) fileCollections[i] = {}
                          if (!fileCollections[i]['files']) fileCollections[i]['files'] = []
                          if (!fileCollections[i]['type']) fileCollections[i]['type'] = loader.id
                          fileCollections[i]['files'].push(answer.data.id)
                          filesData[i].push(answer.data)
                          this.setState({ fileCollections: fileCollections, filesData: filesData })
                        }}
                      />
                    </div>
                  </SlideAnimation>
                )
              })
            }

          </div> : null
        }
        <div className='content'>
          <div className='content-text-center'>
            <Button
              loading={sendRequestLoading}
              disabled={this.isSubmitDisabled()}
              onClick={
                () => {
                  const fieldsData = updateRequestFields.filter((field) => { return field.valuePrev !== field.valueNew })
                  fieldsData.map((field) => {
                    if (field.valueMedium) delete field.valueMedium
                  })
                  requestData.updateRequestFields = fieldsData
                  if (account.isOrg) {
                    requestData.organization = state.abonent
                  } else {
                    requestData.abonent = state.abonent
                  }
                  this.sendReq = api.sendRequest(requestData)
                  this.setState({sendRequestLoading: true})
                  this.sendReq.then(() => {
                    this.setState({sendRequestLoading: false})
                    history.push(mainPath)
                  })
                }
              }>
              Отправить заявку
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ account, requests }) => {
  return {
    account,
    requests
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFieldsInfo () {
      return dispatch(fetchFieldsInfo())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataChange)
