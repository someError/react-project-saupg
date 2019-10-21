import React from 'react'

import './styles.css'

const AccordionHiddenRow = (props) => {
  const { children, colSpan } = props
  return (
    <tr className='c-accordion-table__hidden-row'>
      <td colSpan={colSpan}>
        <div className='c-accordion-table__hidden-row-cont'>
          { children }
        </div>
      </td>
    </tr>
  )
}

export default AccordionHiddenRow
