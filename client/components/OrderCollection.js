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
import {withRouter} from 'react-router-dom'
import {fetchOrders, gotFilteredOrders} from '../store/orders'
import {formatPrice} from '../utils/formatPrice'

class OrderCollection extends Component {
  componentDidMount = () => {
    let userId
    if (this.props.match.params.userId) {
      userId = Number(this.props.match.params.userId)
    }
    this.props.fetchOrders(userId)
  }

  activeItem = 'all'

  handleMenuItemClick = (e, {name}) => {
    this.activeItem = name
    return gotFilteredOrders(name)
  }

  render() {
    const orders = this.props.orders
    // console.log('This is the list of orders =>', orders)

    return (
      <Fragment>
        <Container>
          <Divider hidden />
          <Header as="h1" textAlign="left">
            Order List
          </Header>
          <Divider horizontal />
          <Menu pointing secondary>
            <Menu.Item
              name="all"
              active={this.activeItem === 'all'}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name="confirmed"
              active={this.activeItem === 'confirmed'}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name="complete"
              active={this.activeItem === 'complete'}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name="cancelled"
              active={this.activeItem === 'cancelled'}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name="pending"
              active={this.activeItem === 'pending'}
              onClick={this.handleMenuItemClick}
            />
          </Menu>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Rating</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {/* {selectedOrder.products &&
                selectedOrder.products.map(product => (
                  <LineItem key={product.id} product={product} />
                ))} */}
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
