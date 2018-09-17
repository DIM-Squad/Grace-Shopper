import React, {Component} from 'react'
//import {Dropdown, Button} from 'semantic-ui-react'
import {Form, Container, Icon, Dropdown} from 'semantic-ui-react'
//import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {addProduct} from '../store/products'
import {connect} from 'react-redux'

class AddProductForm extends Component {
  state = {
    name: '',
    artist: '',
    categories: [],
    price: 0,
    description: '',
    featured: false,
    quantity: 0,
    size: '',
    search: ''
  }

  handleSubmit = () => {
    this.props.addProduct(this.state)
    this.props.history.push('/home')
  }

  handleChange = e => {
    const target = e.currentTarget
    console.log(target)
    this.setState({[target.name]: target.value})
  }

  handleSizeChoice = e => {
    this.setState({size: e.currentTarget.id})
  }

  handleCategoryChange = e => {
    console.log(e.target)
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
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
              options={this.props.categories.map(cat => ({
                id: cat.id,
                name: cat.name,
                text: cat.name,
                key: cat.id,
                value: cat.id
              }))}
              multiple
              selection
              onChange={this.handleCategoryChange}
              allowAdditions
              search={this.state.search}
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
            <Dropdown text={this.state.size || 'size'}>
              <Dropdown.Menu>
                {['small', 'medium', 'large'].map(size => (
                  <Dropdown.Item
                    onClick={this.handleSizeChoice}
                    key={size}
                    name={size}
                    text={size}
                    id={size}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown>
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
            <Form.Button type="submit">
              <Icon name="plus" />
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
