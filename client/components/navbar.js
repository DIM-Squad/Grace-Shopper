import React, {Component} from 'react'
//import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import store, {logout, postCart, emptyCart} from '../store'
import {SearchBar} from './'
import CategoryDropdown from './CategoryDropdown'
import {Menu, Icon, Button} from 'semantic-ui-react'
//import {postCart} from '../store/cart'

class Navbar extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.logout()
    this.props.postCart(this.props.cart, this.props.user.id)
    this.props.emptyCart()
  }
  render() {
    return (
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
          {this.props.isLoggedIn ? (
            <React.Fragment>
              <Menu.Item as={Link} to="/home">
                {/* The navbar will show these links after you log in */}
                Home
              </Menu.Item>
              <Menu.Item as={Link} to={`/users/${this.props.user.id}`}>
                My Account
              </Menu.Item>
              <Menu.Item as="a" href="#" onClick={this.handleClick}>
                Logout
              </Menu.Item>
              <Menu.Item>
                <Link to="/cart">
                  <Button animated color="pink">
                    <Button.Content visible>
                      {' '}
                      <Icon name="shopping cart" />
                    </Button.Content>
                    <Button.Content hidden>Cart</Button.Content>
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
              <Menu.Item>
                <Link to="/cart">
                  <Button animated color="pink">
                    <Button.Content visible>
                      {' '}
                      <Icon name="shopping cart" />
                    </Button.Content>
                    <Button.Content hidden>Cart</Button.Content>
                  </Button>
                </Link>
              </Menu.Item>
            </React.Fragment>
          )}
        </Menu.Menu>
      </Menu>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
  cart: state.cart,
  user: state.user,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout()),
  postCart: (cartItems, userId) => dispatch(postCart(cartItems, userId)),
  emptyCart: () => dispatch(emptyCart())
  // dispatch(postCart(cartItems))
  //dispatch(logout())
})

export default connect(mapState, mapDispatch)(Navbar)
