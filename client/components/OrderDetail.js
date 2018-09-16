import {Container, Tab, List, Divider, Table, Header} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

// User defined imports
import {fetchSelectedOrder} from '../store/selectedOrder'
import {formatPrice} from '../utils/formatPrice'
import LineItem from './LineItem'

class OrderDetail extends Component {
  componentDidMount = () => {
    this.props.fetchSelectedOrder(Number(this.props.match.params.orderId))
  }

  render() {
    const selectedOrder = this.props.selectedOrder
    const panes = [
      {
        menuItem: 'Shipping Info',
        pane: (
          <Tab.Pane key="info">
            <List>
              <List.Item>
                <List.Icon name="mail" />
                <List.Content>
                  <a href={`mailto:${selectedOrder.email}`}>
                    {selectedOrder.email}
                  </a>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="marker" />
                <List.Content>
                  <address>
                    Address:{` ${selectedOrder.shippingAddress}, ${
                      selectedOrder.shippingState
                    } ${selectedOrder.shippingZip}, ${
                      selectedOrder.shippingCountry
                    }
                    `}
                  </address>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="shipping" />
                <List.Content>
                  <p>
                    Shipping Cost:&nbsp;{formatPrice(
                      selectedOrder.shippingCost
                    )}
                  </p>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="dollar" />
                <List.Content>
                  <p>
                    Order Total:&nbsp;{formatPrice(selectedOrder.totalCost)}
                  </p>
                </List.Content>
              </List.Item>
            </List>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Line Items',
        pane: (
          <Tab.Pane key="lineItems">
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
                {selectedOrder.line_items &&
                  selectedOrder.line_items.map(lineItem => (
                    <LineItem key={lineItem.productId} lineItem={lineItem} />
                  ))}
              </Table.Body>
            </Table>
          </Tab.Pane>
        )
      }
    ]
    return (
      <Container>
        <Divider hidden />
        <Header as="h1" textAlign="left">
          Order - #{selectedOrder.id}
        </Header>
        <Divider hidden />
        <Tab panes={panes} renderActiveOnly={false} />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  selectedOrder: state.selectedOrder
})

const mapDispatchToProps = dispatch => ({
  fetchSelectedOrder: orderId => dispatch(fetchSelectedOrder(orderId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
)
