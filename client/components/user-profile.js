import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container, Header} from 'semantic-ui-react'
import ProductCollection from './ProductCollection'

/**
 * COMPONENT
 */
export const UserProfile = props => {
  const {fullName} = props

  return <Container />
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName
  }
}

export default connect(mapState)(UserProfile)

/**
 * PROP TYPES
 */
UserProfile.propTypes = {
  fullName: PropTypes.string
}
