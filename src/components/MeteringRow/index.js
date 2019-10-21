import React, { Component } from 'react'
import api from '../../api'
import { formatDate } from '../../utils'
import { Button } from '../../components/Button'

class MeteringRow extends Component {
  constructor () {
    super()
    this.state = {
      loading: false
    }
    this.onDelete = this.onDelete.bind(this)
  }
  componentWillUnmount () {
    if (this.req) {
      this.setState({loading: false})
      this.req.cancel()
    }
  }
  onDelete (valueId) {
    const {props} = this

    this.setState({loading: true})

    this.req = api.deleteMetering(props.meterId, valueId)
    this.req.then(() => {
      props.onRemoved()
    })
  }
  render () {
    const {props, state} = this

    return (
      <tr>
        <td className='text-medium'>{props.value}</td>
        <td>{props.date && formatDate(props.date, 'DD.MM.YYYY')}</td>
        <td>{props.m3}</td>
        <td>{props.type}</td>
        <td>{props.send_way && props.send_way.title}</td>
        <td>
          {
            props.deletable && <Button
              className='btn--transparent btn--small btn--flat text-medium text-uppercase btn--spinner-absolute'
              loading={state.loading}
              onClick={() => this.onDelete(props.id)}>
              удалить
            </Button>
          }
        </td>
      </tr>
    )
  }
}

MeteringRow.defaultProps = {
  onRemoved: () => {}
}

export default MeteringRow
