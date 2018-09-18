import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container, Header, Divider} from 'semantic-ui-react'
import {ProductCollection, AdminHome} from './'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, isAdmin} = props

  console.log(props)
  return (
    <Container>
      <Divider hidden />
      <Header as="h1">Welcome, {firstName || ''}</Header>

      {isAdmin ? (
        <AdminHome />
      ) : (
        <React.Fragment>
          <Header as="h2">See our featured products!</Header>
          <ProductCollection featured />
        </React.Fragment>
      )}
    </Container>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string
}
