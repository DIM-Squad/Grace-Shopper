import {Item, Button} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchProducts} from '../store/products'

class ProductCollection extends Component {
  componentDidMount = () => {
    console.log(this.props.products)
    this.props.fetchProducts(
      this.props.match.params && Number(this.props.match.params.categoryId)
    )
  }

  render() {
    return (
      <Item.Group divided>
        {this.props.products.map(product => (
          <Item key={product.id}>
            <Item.Image size="tiny" src={product.imageUrl} />
            <Item.Content>
              <Item.Header>{product.name}</Item.Header>
              <Item.Meta>{product.artist.name}</Item.Meta>
              <Item.Description>{product.description}</Item.Description>
              <Item.Extra>
                <Button
                  primary
                  floated="left"
                  disabled={product.quantity !== 0}
                >
                  {product.quantity === 0 ? 'Add to cart' : 'Out of stock'}
                </Button>
                <Button primary floated="right">
                  See more details
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    )
  }
}

const mapStateToProps = state => ({products: state.products})
const mapDispatchToProps = dispatch => ({
  fetchProducts: filter => dispatch(fetchProducts(0, filter))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductCollection)
)
