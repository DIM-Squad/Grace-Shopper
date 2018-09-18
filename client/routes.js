import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  ProductCollection,
  ProductDetail,
  OrderDetail,
  Cart
} from './components'
import {me} from './store'
// import postCart from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    console.log('CART', this.props.cart)
    this.props.loadInitialData()
  }

  // componentWillUnmount() {
  //   this.props.postCart(this.props.cart)
  // }

  render() {
    const {isLoggedIn} = this.props
    // console.log('CART', this.props.cart)
    // console.log('LOGED IN', this.props.isLoggedIn)
    // if (isLoggedIn) {
    //   this.props.postCart(this.props.cart)
    // }

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/products/:id" component={ProductDetail} />
            <Route
              path="/users/:userId?/orders/:orderId"
              component={OrderDetail}
            />
            <Route
              path="/products/:filterType?/:filterId?"
              component={ProductCollection}
            />
            <Route path="/cart" component={Cart} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
    // postCart: cartItems => dispatch(postCart(cartItems))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
