import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container, Header, Divider} from 'semantic-ui-react'
import {ProductCollection, AdminHome} from './'
import Elm from './ReactElm' //'./ReactElm'
import ElmComponents from './src/Main'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, isAdmin} = props

  return (
    <Container>
      <Elm src={ElmComponents.Elm.Buttons} flags="" ports={() => false} />
      <Divider hidden />

      <Header as="h1">Welcome {firstName || ''}</Header>

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
