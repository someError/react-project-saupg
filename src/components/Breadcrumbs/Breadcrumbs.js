import React from 'react'
import PropTypes from 'prop-types'

import './Breadcrumbs.css'
import { Link } from 'react-router-dom'

const Breadcrumbs = (props) => {
  const links = props.path.reduce((res, p, i) => {
    const crumbProps = {
      key: i,
      className: 'breadcrumbs-item',
      children: p.title,
      to: p.url
    }

    if (i !== props.path.length - 1) {
      res.push(<Link {...crumbProps} />)
      res.push(<span key={`/${i}`} className='breadcrumbs-divider'>/</span>)
    } else {
      res.push(<span key={i} className='breadcrumbs-item'>{ p.title }</span>)
    }

    return res
  }, [])

  return (
    <div className='breadcrumbs'>
      { links }
    </div>
  )
}

Breadcrumbs.defaultProps = {
  path: []
}

Breadcrumbs.propTypes = {
  path: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string
  })).isRequired
}

export default Breadcrumbs
