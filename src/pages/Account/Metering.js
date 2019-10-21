import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEquipment } from '../../redux/account/actions'

import Spinner from '../../components/Loaders/Spinner'
import AccordionLine from '../../components/AccordionLine'

class Metering extends Component {
  componentDidMount () {
    const { location } = this.props

    this.req = this.props.fetch(this.props.match.params.id)

    this.props.setBreadcrumbs(location)
  }

  componentWillUnmount () {
    if (this.req) {
      this.req.cancel()
    }
  }

  render () {
    const { account, match } = this.props
    const { equipment } = account

    if (account.equipmentLoading) {
      return <div className='account-inner-spinner'><Spinner /></div>
    }

    const meteringItems = equipment.filter(function (item) {
      return item.is_meter
    })

    return (
      <div>
        <div className='content content-bg-gray'>
          <div className='content-title'>Ввод показаний</div>
        </div>
        {
          meteringItems.map((item) => {
            const { summary } = item
            if (!summary.enabled) return
            return (
              <AccordionLine to={`${match.url}/${item.id}`} key={item.id} title={'Счетчик ' + item.title} >
                {
                  item.factory_number && <div>Заводской номер: {item.factory_number}</div>
                }
              </AccordionLine>
            )
          })
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
    fetch (id) {
      return dispatch(fetchEquipment(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Metering)
