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
import {withRouter} from 'react-router-dom'
// User defined imports
import {
  fetchSelectedProduct,
  postReview,
  deleteReview
} from '../store/selectedProduct'
import Review from './Review'
import AverageRating from './AverageRating'
import {formatPrice} from '../utils/formatPrice'
import {addToCartAction} from '../store/cart'

class ProductDetail extends Component {
  state = {
    rating: 3
  }

  componentDidMount = () => {
    this.props.fetchSelectedProduct(Number(this.props.match.params.id))
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
    this.setState(rating)
  }

  render() {
    const selectedProduct = this.props.selectedProduct
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
                      <Item.Header>
                        <strong>{selectedProduct.name}</strong>
                        <Divider hidden />
                      </Item.Header>
                      <AverageRating avgRating={selectedProduct.avgRating} />
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
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchSelectedProduct: id => dispatch(fetchSelectedProduct(id)),
  addToCartAction: item => dispatch(addToCartAction(item)),
  postReview: (user, review, title, description, rating) =>
    dispatch(postReview(user, review, title, description, rating)),
  deleteReview: (reviewId, productId) =>
    dispatch(deleteReview(reviewId, productId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
)
