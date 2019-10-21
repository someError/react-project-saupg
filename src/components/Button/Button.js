import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Spinner } from '../Loaders'

import './Button.css'

const Button = (props) => {
  const { className, children, loading, disabled, ...otherProps } = props
  const absoluteSpinner = className && (className.indexOf('btn--spinner-absolute') + 1)
  let childTemplate = <div>
    { loading ? <Spinner size={14} /> : children }
  </div>

  if (absoluteSpinner >= 0) {
    childTemplate = <div>
      { loading && <Spinner absolute size={14} /> }
      { children }
    </div>
  }

  return (
    <button disabled={loading || disabled} className={classNames('btn', className, { 'btn--loading': loading })} {...otherProps}>
      { childTemplate }
    </button>
  )
}

Button.propTypes = {
  loading: PropTypes.bool
}

export default Button
