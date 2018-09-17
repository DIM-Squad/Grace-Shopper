import React, {Component} from 'react'
import {Table, Header, Button, Image} from 'semantic-ui-react'
import {removeFromCartAction, updateQuantityAction} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.item.id,
      name: this.props.item.name,
      price: this.props.item.price,
      imageUrl: this.props.item.imageUrl,
      quantity: this.props.item.quantity
    }
    this.removeFromCart = this.removeFromCart.bind(this)
    this.addToQuantity = this.addToQuantity.bind(this)
    this.changeQuantity = this.changeQuantity.bind(this)
  }

  removeFromCart(event) {
    this.props.removeFromCartAction(event.id)
  }
  addToQuantity(event) {
    this.setState({
      quantity: event.target.value
    })
  }
  changeQuantity() {
    this.props.updateQuantityAction(this.state)
  }
  render() {
    const {item} = this.props
    return (
      <Table.Row>
        <Table.Cell>
          <Header as="h3" image>
            <Image src={item.imageUrl} rounded size="medium" />
            <Header.Content>
              <Link to={`/products/${item.id}`}>{item.name}</Link>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell singleLine>${item.price}</Table.Cell>
        <Table.Cell>
          <form onSubmit={this.changeQuantity}>
            <input
              type="number"
              name="quantity"
              min="1"
              value={this.state.quantity}
              onChange={this.addToQuantity}
              style={styles.input}
            />
            <input type="submit" value="Update" />
          </form>
        </Table.Cell>
        <Table.Cell>
          <Button
            color="red"
            size="medium"
            onClick={() => this.removeFromCart({id: item.id})}
          >
            Remove Item
          </Button>
        </Table.Cell>
      </Table.Row>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  removeFromCartAction: itemId => dispatch(removeFromCartAction(itemId)),
  updateQuantityAction: item => dispatch(updateQuantityAction(item))
})

const styles = {
  input: {
    width: 60
  }
}

export default connect(null, mapDispatchToProps)(CartItem)
