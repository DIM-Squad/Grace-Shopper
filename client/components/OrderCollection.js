import {Table, Divider, Container, Header} from 'semantic-ui-react'
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {
  fetchOrders,
  fetchFilteredOrders,
  fetchOrdersByUserName
} from '../store/orders'
import OrderCollectionSubMenu from './OrderCollectionSubMenu'
import OrderRow from './OrderRow'
import SearchBar from './SearchBar'

class OrderCollection extends Component {
  componentDidMount = () => {
    if (this.props.match.params.username) {
      this.props.fetchOrdersByUserName(this.props.match.params.username)
    } else {
      this.getFilteredOrders('all')
    }
  }

  getFilteredOrders = filterKey => {
    if (filterKey === 'all') {
      this.props.fetchOrders(Number(this.props.match.params.userId))
    } else {
      this.props.fetchFilteredOrders(
        Number(this.props.match.params.userId),
        filterKey
      )
    }
  }

  render() {
    const orders = this.props.orders
    const userId = Number(this.props.match.params.userId) || ''
    let userRoute
    if (userId) userRoute = `/users/${userId}/orders`
    else userRoute = `/users/orders`

    return (
      <Fragment>
        <Container>
          <Divider hidden />
          <Header as="h1" floated="left">
            Order History:
          </Header>
          <Divider hidden />
          {this.props.isAdmin ? (
            <Fragment>
              <Header as="h1" floated="right">
                <SearchBar type="orders" />
              </Header>
              <Divider horizontal />
            </Fragment>
          ) : (
            <Divider horizontal />
          )}
          <OrderCollectionSubMenu getFilteredOrders={this.getFilteredOrders} />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Reference</Table.HeaderCell>
                <Table.HeaderCell>Customer</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Total Cost</Table.HeaderCell>
                {/* <Table.HeaderCell>Action</Table.HeaderCell> */}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {orders &&
                orders.map(order => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    userRoute={userRoute}
                  />
                ))}
            </Table.Body>
          </Table>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({orders: state.orders})

const mapDispatchToProps = dispatch => ({
  fetchOrders: userId => dispatch(fetchOrders(userId)),
  fetchFilteredOrders: (userId, filterKey) =>
    dispatch(fetchFilteredOrders(userId, filterKey)),
  fetchOrdersByUserName: username => dispatch(fetchOrdersByUserName(username))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderCollection)
)
