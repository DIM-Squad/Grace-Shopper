import React, {Component} from 'react'
import {Table, Container} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import CartItem from './CartItem'
import TakeMoney from './TakeMoney'

class Cart extends Component {
  render() {
    //console.log('PROPS', this.props)
    return (
      <Container>
        <Table padded>
          <Table.Body>
            {this.props.cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </Table.Body>
        </Table>
        <TakeMoney />
      </Container>
    )
  }
}
const mapStateToProps = state => ({
  cart: state.cart
})

export default withRouter(connect(mapStateToProps)(Cart))
