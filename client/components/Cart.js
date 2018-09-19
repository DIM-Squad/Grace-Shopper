import React, {Component} from 'react'
import {Table, Container, Divider, Header, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {CartItem, CheckoutForm} from './'

class Cart extends Component {
  state = {
    checkingOut: false
  }

  readyForCheckout = () => {
    this.setState({checkingOut: true})
  }

  render() {
    return (
      <Container>
        <Header as="h1" content="Your cart" />
        <Divider horizontal />
        <Table padded>
          <Table.Body>
            {this.props.cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </Table.Body>
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
