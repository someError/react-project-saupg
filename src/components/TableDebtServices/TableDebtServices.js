import React from 'react'

import './TableDebtServices.css'

const TableDebtServices = (props) => {
  return (
    <table className='table-debt-services'>
      <tbody>
        {props.children}
      </tbody>
    </table>
  )
}

export default TableDebtServices
