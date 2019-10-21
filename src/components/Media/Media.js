import React from 'react'

import './Media.css'

const Media = (props) => {
  return <div>
    <div className='media'>
      <div className='content-title-uppercase'>фотографии оборудования</div>
      <div className='media-wrapper'>
        <div className='media-item'><a href='#'><img src={require('../../images/image1.jpg')} /></a></div>
        <div className='media-item'><a href='#'><img src={require('../../images/image2.jpg')} /></a></div>
        <div className='media-item'><a href='#'><img src={require('../../images/image3.jpg')} /></a></div>
      </div>
    </div>
  </div>
}

export default Media
