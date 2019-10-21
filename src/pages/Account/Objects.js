import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Spinner from '../../components/Loaders/Spinner'
import AccordionLine from '../../components/AccordionLine'

class Objects extends PureComponent {
  render () {
    const { props } = this
    const { suprObjects, suprObjectsLoading } = props.account
    const _suprObjects = suprObjects && suprObjects[0] && suprObjects[0]['supr_objects']

    return (
      <div>
        <div className='content content-bg-gray'>
          <div className='content-title'>Объекты на карте</div>
        </div>
        {
          suprObjectsLoading
            ? <div style={{padding: '20px', textAlign: 'center'}}><Spinner /></div>
            : (
              _suprObjects && _suprObjects.length
                ? _suprObjects.map(({ common_name, supr_id, supr_fno, url }) => {

                  if (!common_name) return

                  return <AccordionLine to={url} target='_blank' key={supr_id} title={common_name}>
                    { supr_id && <div>ID: {supr_id}</div> }
                    { supr_fno && <div>№ {supr_fno}</div> }
                  </AccordionLine>
                })
                : 'Не найдено'
            )
        }
      </div>
    )
  }
}

export default connect(({ account }) => ({ account }))(Objects)
