import React, {Component} from 'react'
import {Form, Container, Icon, Dropdown} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {addProduct} from '../store/products'
import {connect} from 'react-redux'

class AddProductForm extends Component {
  //if it's a product edit form, the product to edit is passed in through props
  state = {
    name: (this.props.product && this.props.product.name) || '',
    artist: (this.props.product && this.props.product.artist.name) || '',
    categories:
      (this.props.product && this.props.product.categories.map(c => c.name)) ||
      [],
    price: (this.props.product && this.props.product.price / 100) || 0,
    description: (this.props.product && this.props.product.description) || '',
    featured: (this.props.product && this.props.product.featured) || false,
    quantity: (this.props.product && this.props.product.quantity) || 0,
    size: (this.props.product && this.props.product.size) || '',
    id: this.props.product && this.props.product.id
  }

  handleNewProduct = () => {
    this.props.addProduct(this.state)
    this.props.history.push('/home')
  }

  handleEditProduct = () => {
    this.props.refreshProductPage(this.state)
  }

  handleChange = e => {
    const target = e.currentTarget
    this.setState({[target.name]: target.value})
  }

  handleSizeChange = (e, {value}) => {
    this.setState({size: value})
  }

  handleCategoryChange = (e, {value}) => {
    this.setState({
      categories: value
    })
  }

  handleAddition = (e, {value}) => {
    this.props.categories.push({
      name: value,
      text: value,
      key: value
    })
  }

  render() {
    const chosenCategories = this.state.categories
    const options = this.props.categories
    return (
      <Container>
        <Form
          onSubmit={
            this.state.id ? this.handleEditProduct : this.handleNewProduct
          }
        >
          <Form.Group>
            <Form.Field
              label="Product name"
              control="input"
              placeholder="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              label="Artist"
              control="input"
              placeholder="artist"
              name="artist"
              value={this.state.artist}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              label="Categories"
              control={Dropdown}
              placeholder="product categories"
              options={options.map(cat => ({
                text: cat.name,
                key: cat.id,
                value: cat.name
              }))}
              multiple
              selection
              onChange={this.handleCategoryChange}
              allowAdditions
              onAddItem={this.handleAddition}
              value={chosenCategories}
              search={true}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              rows={3}
              label="Product description"
              placeholder="Really sell it!"
              name="description"
              control="textarea"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              label="Selling Price"
              control="input"
              type="number"
              placeholder="price"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
            <Form.Field
              label="Quantity in stock"
              control="input"
              type="number"
              placeholder="quantity"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Dropdown}
              placeholder="size"
              options={['small', 'medium', 'large'].map(s => ({
                key: s,
                text: s,
                value: s
              }))}
              onChange={this.handleSizeChange}
              value={this.state.size}
              name="size"
            />
            <Form.Field
              label="featured"
              control="input"
              type="checkbox"
              onChange={() =>
                this.setState(prevState => ({
                  featured: !prevState.featured
                }))
              }
            />
            <Form.Button
              type="submit"
              disabled={
                !this.state.name ||
                !this.state.artist ||
                !this.state.description ||
                !this.state.size
              }
            >
              <Icon name={this.state.id ? 'edit' : 'plus'} />
            </Form.Button>
          </Form.Group>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories
})

const mapDispatchToProps = {addProduct}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddProductForm)
)
