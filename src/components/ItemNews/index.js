import React from 'react'

import './styles.css'

const ItemNews = (props) => {
  return (
    <a href={props.link} target='_blank' className='item-news'>
      <div className='item-news-image' style={props.image ? {backgroundImage: `url("${props.image}")`} : null} />
      <div className='item-news-text'>
        <div className='item-news-date'>{ props.date }</div>
        <div className='item-news-title'>{ props.title }</div>
      </div>
    </a>
  )
}

export default ItemNews
