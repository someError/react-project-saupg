import React from 'react'

import './AccordionLine.css'

import { ArrowIcon } from '../../components/Icons'
import {Link} from 'react-router-dom'

const AccordionLine = ({ children, to, title, className, ...props }) => {
  const contentProps = { children, title }

  if (props.target) {
    return <a href={to} className={`accordion-line ${className || ''}`} {...props}>
      <AccordionLineContent {...contentProps} />
    </a>
  }

  return <Link to={to} className={`accordion-line ${className || ''}`} {...props}>
    <AccordionLineContent {...contentProps} />
  </Link>
}

const AccordionLineContent = ({ title, children }) => (
  <div>
    <div className='accordion-line__title'>{title}</div>

    {
      children
        ? (
          <div className='accordion-line__text'>
            { children }
          </div>
        )
        : null
    }

    <ArrowIcon className='accordion-line__icon' />
  </div>
)

export default AccordionLine
