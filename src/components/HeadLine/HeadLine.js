import React from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from '../../components/MediaQuery'

import { ArrowIcon } from '../../components/Icons'

import './HeadLine.css'

const HeadLine = ({ backUrl, name, contract }) => {
  let styles = {
    width: `14px`
  }

  return (
    <div className='head-line'>
      <div className='head-line-left'><Link to={backUrl} className='btn-back'> <ArrowIcon size={8} style={styles} /> Назад</Link></div>
      <div className='head-line-right'>
        <MediaQuery rule='screen and (min-width: 768px)'>
          <div className='head-line_text-modified'>
            { name }
            { contract && <span>{ contract }</span> }
          </div>
        </MediaQuery>
      </div>
    </div>
  )
}

export default HeadLine
