import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEquipment } from '../../redux/account/actions'

import Spinner from '../../components/Loaders/Spinner'
import AccordionLine from '../../components/AccordionLine'
import Template from '../../components/Template'
import { Select, Label } from '../../components/Form'

import classNames from 'classnames'

class Equipment extends Component {
  constructor () {
    super()
    this.state = {}
  }

  componentWillMount () {
    const { account: { objects } } = this.props
    if (objects) {
      this.setState({
        object: objects[0]['id'],
        objectInfo: objects[0]
      })
    }
  }

  componentDidMount () {
    const { account: { accountSummary: {objects}, isOrg } } = this.props
    this.req = this.props.fetchAccountEquipment(this.props.match.params.id, isOrg, objects && objects[0]['id'])

    this.props.setBreadcrumbs(this.props.location)
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  onSubmit (e) {
    e.preventDefault()
  }

  onObjectChange (e) {
    const { account: { objects } } = this.props
    const objectInfo = objects.filter((obj) => { return Number(obj.id) === Number(e.target.value) })
    this.setState({
      object: e.target.value,
      objectInfo: objectInfo[0]
    })
    this.req = this.props.fetchAccountEquipment(this.props.match.params.id, true, e.target.value)
  }

  render () {
    const { state } = this
    const { account, match } = this.props
    const { equipment, isOrg, accountSummary } = account

    return (
      <div>
        <div className={`content ${classNames({'content-bg-gray': !isOrg})}`}>
          <div className='content-title'>Оборудование {isOrg ? 'компании' : 'абонента'}</div>
          {
            isOrg && <Template>
              <Label>Объект</Label>
              <Select
                value={this.state.object}
                onChange={e => this.onObjectChange(e)}
              >
                {
                  accountSummary.objects.map((obj) => {
                    return <option key={obj.id} value={obj.id}>{ obj.title }</option>
                  })
                }
              </Select>
              <div className='l-two-cols'>
                <div className='l-two-cols-col'>
                  <div className='content-text-uppercase'>Статус объекта</div>
                  <div className='content-text-medium'>
                    {state.objectInfo.status ? <div className='text-red'>Отключен</div>
                      : <div className='text-green'>Обслуживается</div>}
                  </div>
                </div>
                {
                  state.objectInfo.code && <div className='l-two-cols-col'>
                    <div className='content-text-uppercase'>Код объекта</div>
                    <div className='content-text-medium'>
                      { state.objectInfo.code }
                    </div>
                  </div>
                }
              </div>
            </Template>
          }
        </div>
        {
          account.equipmentLoading ? (
            <div className='account-inner-spinner'><Spinner /></div>
          ) : (
            equipment.map((item) => {
              const { summary } = item
              return (
                <AccordionLine to={`${match.url}/${item.id}`} key={item.id} title={item.is_meter ? 'счетчик ' + item.title : item.title} >
                  {
                    summary.classes && summary.classes.length
                      ? <div>{ summary.classes[summary.classes.length - 1].title }</div>
                      : null
                  }

                  {
                    item.is_meter && item.date_next_check && <div className='accordion-line-text'>
                      <div className={classNames({'text-red': new Date(item.date_next_check).getTime() < new Date().getTime()})}>
                        Дата поверки счетчика: {item.date_next_check}
                      </div>
                    </div>
                  }
                </AccordionLine>
              )
            })
          )
        }
      </div>
    )
  }
}

const mapStateToProps = ({ account }) => {
  return {
    account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccountEquipment (id, isOrg, object) {
      return dispatch(fetchEquipment(id, isOrg, object))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Equipment)
