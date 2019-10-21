import { Children } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import intersection from 'lodash/intersection'

const ForRoles = ({ children, roles, userRoles }) => {
  const rolesToAllow = intersection(roles, userRoles)

  return rolesToAllow.length ? Children.only(children) : null
}

ForRoles.propTypes = {
  roles: PropTypes.array
}

ForRoles.defaultProps = {
  roles: []
}

export default connect(({ user }) => ({ userRoles: user.roles }))(ForRoles)
