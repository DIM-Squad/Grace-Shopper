import {Item, Button} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'

class ProductCollection extends Component {
  render() {
    return this.props.products.map(product => (
      <Item key={product.id}>
        <Item.Image size="tiny" src={product.imageUrl} />
        <Item.Content>
          <Item.Header>{product.name}</Item.Header>
          <Item.Meta>{product.artist.name}</Item.Meta>
          <Item.Description>{product.description}</Item.Description>
          <Item.Extra>
            <Button primary floated="left" disabled={product.quantity === 0}>
              {product.quantity === 0 ? 'Add to cart' : 'Out of stock'}
            </Button>
            <Button primary floated="right">
              See more details
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    ))
  }
}

const mapStateToProps = state => ({products: state.products})

export default connect(mapStateToProps)(ProductCollection)
