import {Item, Image, Grid, Divider, Container, Rating} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
// User defined imports
import {fetchSelectedProduct} from '../store/selectedProduct'
import Review from './Review'

const AvgRating = props => {
  if (!props.avgRating) {
    return null
  }
  return (
    <Item.Meta>
      <Rating
        icon="star"
        defaultRating={props.avgRating}
        maxRating={5}
        disabled
      />
    </Item.Meta>
  )
}

class ProductDetail extends Component {
  componentDidMount = () => {
    this.props.fetchSelectedProduct(Number(this.props.match.params.id))
  }

  addToCart = () => {
    console.log('Should add to cart')
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
                      <AvgRating avgRating={selectedProduct.avgRating} />
                      <Divider hidden />
                      <Item.Meta>
                        <span className="price">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          }).format(selectedProduct.price / 100)}
                        </span>
                        <Divider hidden />
                      </Item.Meta>
                      <Divider hidden />
                      <Item.Description>
                        {selectedProduct.description}
                        <Divider hidden />
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Grid.Column>
              </Grid>
            </Grid>
          </Grid.Row>
        </Grid>
        <Divider />
        {selectedProduct.reviews &&
          selectedProduct.reviews.map(review => (
            <Review key={review.id} review={review} />
          ))}
      </Container>
    )
  }
}

const mapStateToProps = state => ({selectedProduct: state.selectedProduct})

const mapDispatchToProps = dispatch => ({
  fetchSelectedProduct: id => dispatch(fetchSelectedProduct(id))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
)
