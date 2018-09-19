import React, {Component} from 'react'
import {Table, Container, Divider} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import CartItem from './CartItem'
import TakeMoney from './TakeMoney'

class Cart extends Component {
  render() {
    return (
      <Container>
        <Divider hidden />
        <Table padded>
          <Table.Body>
            {this.props.cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </Table.Body>
        </Table>
        <TakeMoney user={this.props.user} cart={this.props.cart} />
      </Container>
    )
  }
}
const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user
})

export default withRouter(connect(mapStateToProps)(Cart))
