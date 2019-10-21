import React from 'react'
import classnames from 'classnames'

import './styles.css'

const Table = (props) => {
  const { className, children } = props

  return (
    <table className={classnames('c-table', className)}>
      <tbody>
        { children }
      </tbody>
    </table>
  )
}

export default Table
