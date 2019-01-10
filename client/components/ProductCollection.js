import {Card, Button, Image, Icon, Divider, Popup} from 'semantic-ui-react'
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchProducts} from '../store/products'
import {formatPrice} from '../utils/formatPrice'
import {addToCartAction} from '../store/cart'

class ProductCollection extends Component {
  state = {
    isOpen: false
  }

  handleOpen = productId => {
    this.setState({isOpen: productId})

    this.timeout = setTimeout(() => {
      this.setState({isOpen: false})
    }, 200)
  }

  handleClose = () => {
    this.setState({isOpen: false})
    clearTimeout(this.timeout)
  }

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
      imageUrl: `img/img${event.id.toString().padStart(4, '0')}.svg`
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
            this.props.products.map(
              product =>
                !product.deletedAt && (
                  <Card key={product.id}>
                    <Card.Content>
                      <Image
                        size="medium"
                        src={`/img/img${product.id
                          .toString()
                          .padStart(4, '0')}.svg`}
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
                      <Popup
                        trigger={
                          <Button
                            color="teal"
                            floated="left"
                            disabled={product.quantity === 0}
                            onClick={() => {
                              this.addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                imageUrl: `/img/img${product.id
                                  .toString()
                                  .padStart(4, '0')}.svg`
                              })
                            }}
                          >
                            {product.quantity !== 0 ? (
                              <Icon name="shopping cart" />
                            ) : (
                              'Out of stock'
                            )}
                          </Button>
                        }
                        content={
                          <div>
                            <span>
                              {this.props.cart.find(i => i.id === product.id) &&
                                this.props.cart.find(i => i.id === product.id)
                                  .quantity}
                            </span>
                            <span> in cart</span>
                          </div>
                        }
                        on="click"
                        hideOnScroll
                        open={this.state.isOpen === product.id}
                        onOpen={() => this.handleOpen(product.id)}
                        onClose={this.handleClose}
                      />
                    </Card.Content>
                  </Card>
                )
            )}
        </Card.Group>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({products: state.products, cart: state.cart})
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
