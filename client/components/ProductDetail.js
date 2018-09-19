/* eslint-disable complexity */
import {
  Item,
  Image,
  Grid,
  Divider,
  Container,
  Button,
  Form,
  Rating
} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'
// User defined imports
import {
  fetchSelectedProduct,
  postReview,
  deleteReview,
  editProduct,
  deleteProduct
} from '../store/selectedProduct'
import Review from './Review'
import AverageRating from './AverageRating'
import {formatPrice} from '../utils/formatPrice'
import {addToCartAction} from '../store/cart'
import {AddProductForm} from './'

class ProductDetail extends Component {
  state = {
    rating: 3,
    editing: false
  }

  componentDidMount = () => {
    this.props.fetchSelectedProduct(Number(this.props.match.params.id))
  }

  refreshProductPage = editedProduct => {
    this.setState({editing: false})
    this.props.editProduct(editedProduct)
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

  handleRate = (e, {rating}) => {
    this.setState({rating})
  }

  beginEdit = () => {
    const {name, description, price} = this.props.selectedProduct
    this.setState({editing: true, productChange: {name, description, price}})
  }

  handleChange = e => {
    const target = e.currentTarget
    this.setState(prevState => ({
      productChange: {...prevState.productChange, [target.name]: target.value}
    }))
  }

  deleteProduct = () => {
    this.props.deleteProduct(this.props.selectedProduct.id)
    this.props.history.push('/home')
  }

  render() {
    const selectedProduct = this.props.selectedProduct
    const isAdmin = this.props.user.isAdmin
    return (
      <Container>
        <Grid container>
          <Grid.Row>
            <Grid stackable centered>
              <Grid container columns={2}>
                <Grid.Column>
                  <Item>
                    <Image size="large" src={selectedProduct.imageUrl} />
                  </Item>
                </Grid.Column>
                <Grid.Column>
                  <Item>
                    <Item.Content>
                      {isAdmin &&
                        !this.state.editing && (
                          <React.Fragment>
                            <Button
                              primary
                              type="submit"
                              content="edit info"
                              onClick={this.beginEdit}
                            />
                            <Button
                              negative
                              type="submit"
                              content="remove this product"
                              onClick={this.deleteProduct}
                            />
                          </React.Fragment>
                        )}
                      {this.state.editing ? (
                        <AddProductForm
                          product={selectedProduct}
                          refreshProductPage={this.refreshProductPage}
                          editProduct={this.props.editProduct}
                        />
                      ) : (
                        <React.Fragment>
                          <Item.Header as="h1" content={selectedProduct.name} />
                          <Item.Meta
                            content={
                              selectedProduct.artist &&
                              selectedProduct.artist.name
                            }
                          />
                          <Item.Meta
                            content={
                              selectedProduct.categories && (
                                <div>
                                  <span>In</span>
                                  <span>
                                    {selectedProduct.categories.map(c => (
                                      <NavLink
                                        to={`/categories/${c.id}`}
                                        key={c.id}
                                      >
                                        {'  ' + c.name}
                                      </NavLink>
                                    ))}
                                  </span>
                                </div>
                              )
                            }
                          />
                          <Divider hidden />
                          <AverageRating
                            avgRating={selectedProduct.avgRating}
                          />
                          <Divider hidden />
                          <Item.Meta>
                            <span className="price">
                              {formatPrice(selectedProduct.price)}
                            </span>
                            <Divider hidden />
                          </Item.Meta>
                          <Divider hidden />
                          <Item.Description>
                            {selectedProduct.description}
                            <Divider hidden />
                          </Item.Description>
                          <Button
                            color="teal"
                            onClick={() =>
                              this.addToCart({
                                id: selectedProduct.id,
                                name: selectedProduct.name,
                                price: selectedProduct.price,
                                imageUrl: selectedProduct.imageUrl
                              })
                            }
                          >
                            Add to Cart
                          </Button>
                        </React.Fragment>
                      )}
                    </Item.Content>
                  </Item>
                </Grid.Column>
              </Grid>
            </Grid>
          </Grid.Row>
        </Grid>
        <Divider />
        <h4>Reviews</h4>
        {this.props.user &&
          //admins should not leave reviews while on their admin accounts
          !isAdmin &&
          selectedProduct.reviews &&
          selectedProduct.reviews.findIndex(
            r => r.userId === this.props.user.id
          ) === -1 && (
            <Form
              onSubmit={e => {
                e.persist()
                const target = e.currentTarget
                this.props.postReview(
                  this.props.user.id,
                  this.props.selectedProduct.id,
                  target.title.value,
                  target.description.value,
                  this.state.rating
                )
              }}
            >
              <Form.Input
                placeholder="Summarize your experience..."
                name="title"
              />
              <Rating
                icon="star"
                defaultRating={3}
                maxRating={5}
                name="rating"
                onRate={this.handleRate}
                value={this.state.rating}
              />
              <Form.TextArea
                width={16}
                placeholder="Tell us your thoughts..."
                name="description"
              />
              <Form.Button type="submit">Submit Review</Form.Button>
            </Form>
          )}
        {selectedProduct.reviews &&
          selectedProduct.reviews.map(review => (
            <Review
              key={review.id}
              review={review}
              isSelfOrAdmin={
                this.props.user.isAdmin || this.props.user.id === review.userId
              }
              deleteReview={() =>
                this.props.deleteReview(review.id, selectedProduct.id)
              }
            />
          ))}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.selectedProduct,
  user: state.user,
  cart: state.cart
})

const mapDispatchToProps = {
  fetchSelectedProduct,
  addToCartAction,
  postReview,
  deleteReview,
  editProduct,
  deleteProduct
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
)
