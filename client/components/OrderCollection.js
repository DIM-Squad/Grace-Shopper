import {
  Menu,
  Button,
  Image,
  Icon,
  Table,
  Divider,
  Container,
  Header
} from 'semantic-ui-react'
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'
import {fetchOrders, gotFilteredOrders} from '../store/orders'
import {formatPrice} from '../utils/formatPrice'
import OrderCollectionSubMenu from './OrderCollectionSubMenu'

class OrderCollection extends Component {
  componentDidMount = () => {
    let userId
    if (this.props.match.params.userId) {
      userId = Number(this.props.match.params.userId)
    }
    this.props.fetchOrders(userId)
  }

  getFilteredOrders = filterKey => gotFilteredOrders(filterKey)

  render() {
    const orders = this.props.orders
    const userId = Number(this.props.match.params.userId) || ''
    // console.log('This is the list of orders =>', orders)

    return (
      <Fragment>
        <Container>
          <Divider hidden />
          <Header as="h1" textAlign="left">
            Order List
          </Header>
          <Divider horizontal />
          <OrderCollectionSubMenu getFilteredOrders={this.getFilteredOrders} />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Reference</Table.HeaderCell>
                <Table.HeaderCell>Customer</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Total Cost</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {orders &&
                orders.map(order => (
                  <Table.Row key={order.id}>
                    <Table.Cell>{order.updatedAt}</Table.Cell>
                    <Table.Cell>
                      <NavLink to={`/users/orders/${order.id}`}>
                        {`${order.shippingZip}${order.shippingState}${
                          order.id
                        }`}
                      </NavLink>
                    </Table.Cell>
                    <Table.Cell>{order.userId}</Table.Cell>
                    <Table.Cell>
                      {order.products.reduce(
                        (acc, curr) => acc + curr.line_item.quantity,
                        0
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {formatPrice(
                        order.totalCost +
                          order.products.reduce(
                            (acc, curr) => acc + curr.line_item.itemPrice,
                            0
                          )
                      )}
                    </Table.Cell>
                  </Table.Row>
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
  fetchOrders: (filterType, filterId) =>
    dispatch(fetchOrders(filterType, filterId)),
  fetchFilteredOrders: filterKey => dispatch(gotFilteredOrders(filterKey))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderCollection)
)
