import {Card, Button, Image, Icon, Divider} from 'semantic-ui-react'
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchProducts} from '../store/products'
import {formatPrice} from '../utils/formatPrice'
import {addToCartAction} from '../store/cart'

class ProductCollection extends Component {
  componentDidMount = () => {
    let filterType, filterId
    if (this.props.featured) {
      filterType = 'featured'
      filterId = 'true'
    } else {
      ;({filterType, filterId} = this.props.match.params)
    }
    this.props.fetchProducts(filterType, filterId)
  }

  addToCart = event => {
    this.props.addToCartAction({
      id: event.id,
      name: event.name,
      price: event.price,
      quantity: 1,
      imageUrl: event.imageUrl
    })
  }

  goToProduct = id => {
    this.props.history.push(`/products/${id}`)
  }

  render() {
    return (
      <Fragment>
        <Divider hidden />
        <Card.Group stackable centered>
          {this.props.products &&
            this.props.products.map(product => (
              <Card key={product.id}>
                <Card.Content>
                  <Image
                    size="medium"
                    src={product.imageUrl}
                    style={styles.image}
                  />
                  <Card.Header>{product.name}</Card.Header>
                  <Card.Meta>{product.artist.name}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Card.Description>
                    {formatPrice(product.price)}
                  </Card.Description>
                  <Button
                    color="teal"
                    floated="right"
                    onClick={() => this.goToProduct(product.id)}
                  >
                    More details
                  </Button>
                  <Button
                    color="teal"
                    floated="left"
                    disabled={product.quantity === 0}
                    onClick={() =>
                      this.addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl
                      })
                    }
                  >
                    {product.quantity !== 0 ? (
                      <Icon name="shopping cart" />
                    ) : (
                      'Out of stock'
                    )}
                  </Button>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({products: state.products})
const mapDispatchToProps = dispatch => ({
  fetchProducts: (filterType, filterId) =>
    dispatch(fetchProducts(filterType, filterId)),
  addToCartAction: item => dispatch(addToCartAction(item))
})

const styles = {
  image: {
    marginBottom: 20
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductCollection)
)
