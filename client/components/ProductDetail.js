import {Item, Image, Grid, Divider} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
// User defined imports
import {fetchSelectedProduct} from '../store/selectedProduct'

class ProductDetail extends Component {
  componentDidMount = () => {
    this.props.fetchSelectedProduct(Number(this.props.match.params.id))
  }

  addToCart = () => {
    console.log('Should add to cart')
  }

  render() {
    const selectedProduct = this.props.selectedProduct
    console.log(selectedProduct)
    return (
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
                    <Item.Meta>
                      <span className="price">${selectedProduct.price}</span>
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
        <Grid.Row>
          <Grid stackable centered>
            <Grid container columns={3}>
              <Grid.Column>
                <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
              </Grid.Column>
              <Grid.Column>
                <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
              </Grid.Column>
              <Grid.Column>
                <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
              </Grid.Column>
              <Grid.Column>
                <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
              </Grid.Column>
              <Grid.Column>
                <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
              </Grid.Column>
              <Grid.Column>
                <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
              </Grid.Column>
            </Grid>
          </Grid>
        </Grid.Row>
      </Grid>
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
