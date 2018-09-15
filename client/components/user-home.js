import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container, Header} from 'semantic-ui-react'
import ProductCollection from './ProductCollection'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName} = props

  return (
    <Container>
      <Header as="h1">Welcome, {firstName}</Header>
      <Header as="h2">See our featured products!</Header>
      <ProductCollection featured />
    </Container>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string
}
