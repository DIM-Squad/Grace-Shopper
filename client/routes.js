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
  OrderCollection,
  OrderDetail,
  Cart,
  AddProductForm,
  UserCollection
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />{' '}
        <Route exact path="/products/:id" component={ProductDetail} />
        <Route
          path="/products/:filterType?/:filterId?"
          component={ProductCollection}
        />
        <Route path="/home" component={UserHome} />
        <Route path="/cart" component={Cart} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/add/product" component={AddProductForm} />
            <Route
              exact
              path="/users/:userId?/orders/:orderId"
              component={OrderDetail}
            />
            <Route path="/users/:userId/orders/" component={OrderCollection} />
            <Route path="/users/orders/" component={OrderCollection} />
            <Route exact path="/users" component={UserCollection} />
            <Route
              path="/products/:filterType?/:filterId?"
              component={ProductCollection}
            />
            <Route
              path="/users/:filterType/:filterId"
              component={UserCollection}
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
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
