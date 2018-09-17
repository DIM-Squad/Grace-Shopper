import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {SearchBar} from './'
import CategoryDropdown from './CategoryDropdown'
import {Menu, Icon, Button} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Menu attached="top" stackable>
    <Menu.Item as="h1">
      <span>I </span>
      <span>
        <Icon name="heart" />
      </span>{' '}
      <span> Art</span>
    </Menu.Item>
    <Menu.Item as={SearchBar} type="products" />
    <Menu.Item as={CategoryDropdown} />
    <Menu.Menu position="right">
      {isLoggedIn ? (
        <React.Fragment>
          <Menu.Item as={Link} to="/home">
            {/* The navbar will show these links after you log in */}
            Home
          </Menu.Item>
          <Menu.Item as="a" href="#" onClick={handleClick}>
            Logout
          </Menu.Item>
          <Menu.Item>
            <Link to="/cart">
              <Button color="pink">
                <Icon name="shopping cart" />
              </Button>
            </Link>
          </Menu.Item>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* The navbar will show these links before you log in */}
          <Menu.Item as={Link} to="/login">
            Login
          </Menu.Item>
          <Menu.Item as={Link} to="/signup">
            Sign Up
          </Menu.Item>
        </React.Fragment>
      )}
    </Menu.Menu>
  </Menu>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
