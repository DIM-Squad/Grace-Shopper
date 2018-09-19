import React, {Component} from 'react'
import {Table, Container, Divider, Header, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'
import {CartItem, CheckoutForm} from './'
import {formatPrice} from '../utils/formatPrice'

class Cart extends Component {
  state = {
    checkingOut: false
  }

  readyForCheckout = () => {
    this.setState({checkingOut: true})
  }

  calcShipping = () => {
    return this.props.cart[0] ? this.props.cart[0].price % 27000 + 5600 : 0
  }

  calcTotal = () => {
    return (
      this.props.cart.reduce((a, b) => a + b.price * Number(b.quantity), 0) +
      this.calcShipping()
    )
  }

  render() {
    return !this.props.cart[0] ? (
      <NavLink to="/products">
        <h1>Shop now!</h1>
      </NavLink>
    ) : (
      <Container>
        <Divider horizontal />
        <Header as="h1" content="Your cart" />
        <Divider horizontal />
        <Table padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Item subtotal</Table.HeaderCell>
              <Table.HeaderCell>Remove</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
            <Table.Row>
              <Table.Cell>Shipping</Table.Cell>
              <Table.Cell />
              <Table.Cell />
              <Table.Cell textAlign="right">
                {formatPrice(this.calcShipping())}
              </Table.Cell>
              <Table.Cell />
            </Table.Row>
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>Grand Total</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell textAlign="right">
                {formatPrice(this.calcTotal())}
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Footer>
        </Table>
        <Divider horizontal />
        {!this.state.checkingOut && (
          <Button primary type="submit" onClick={this.readyForCheckout}>
            Check out
          </Button>
        )}
        {this.state.checkingOut && <CheckoutForm />}
      </Container>
    )
  }
}
const mapStateToProps = state => ({
  cart: state.cart
})

export default withRouter(connect(mapStateToProps)(Cart))
