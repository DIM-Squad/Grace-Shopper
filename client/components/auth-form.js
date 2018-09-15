import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Form, Container, Header, Divider, Button} from 'semantic-ui-react'

/**
 * COMPONENT
 */
class AuthForm extends Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    const {name, displayName, handleSubmit, error} = this.props
    return (
      <Container>
        <Header as="h1">{displayName}</Header>
        <Form onSubmit={() => handleSubmit(name, this.state)} name={name}>
          <Form.Group>
            <Form.Field width={4}>
              <label>email</label>
              <input
                placeholder="email"
                value={this.state.email}
                onChange={e => {
                  this.setState({email: e.currentTarget.value})
                }}
              />
            </Form.Field>
            <Form.Field width={4}>
              <label>password</label>
              <input
                placeholder="password"
                value={this.state.password}
                type="password"
                onChange={e => {
                  this.setState({password: e.currentTarget.value})
                }}
              />
            </Form.Field>
          </Form.Group>
          <Form.Button type="submit">{displayName}</Form.Button>
          {error && error.response && <div> {error.response.data} </div>}
          <Divider>or</Divider>
          <Button as="a" href="/auth/google">
            {displayName} with Google
          </Button>
        </Form>
      </Container>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(name, {email, password}) {
      dispatch(auth(email, password, name))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
