import React, {Component} from 'react'
import {Table, Header, Button, Image} from 'semantic-ui-react'
import {removeFromCartAction} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    //console.log('PROPS111', props)
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
  changeQuantity(event) {
    this.props.item.quantity = event.target.value
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
        {/* <Table.Cell>
          <Header floated="right">
            <Button color="teal" size="small" onClick={this.addToQuantity}>
              +
            </Button>
          </Header>
        </Table.Cell> */}
        <Table.Cell>
          <form onSubmit={this.changeQuantity}>
            <input
              type="number"
              name="quantity"
              min="1"
              value={this.state.quantity}
              onChange={this.addToQuantity}
            />
            <input type="submit" value="Update" />
          </form>

          {/* <Segment>
            <Header as="h5" textAlign="center">
              {item.quantity}
            </Header>
          </Segment> */}
        </Table.Cell>
        {/* <Table.Cell>
          <Header>
            <Button color="teal" size="small" floated="right">
              -
            </Button>
          </Header>
        </Table.Cell> */}
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
  removeFromCartAction: itemId => dispatch(removeFromCartAction(itemId))
})

export default connect(null, mapDispatchToProps)(CartItem)
