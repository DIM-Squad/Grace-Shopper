import React, {Component} from 'react'
//import {Dropdown, Button} from 'semantic-ui-react'
import {Form, Button, Icon} from 'semantic-ui-react'
//import axios from 'axios'
import {withRouter} from 'react-router-dom'

//TODO: the commented code here is for dynamic search, which I wasn't able to get working

class SearchBar extends Component {
  /*   state = {
    term: '',
    products: []
  }

  handleChange = async e => {
    const searchTerm = e.currentTarget.value
    if (searchTerm) {
      const result = await axios.get(`/api/products/search/${searchTerm}`)
      this.setState({
        term: searchTerm,
        products: result.data.map(p => (
          <Dropdown.Item
            key={p.id}
            text={p.name}
            onClick={this.props.history.push(`/products/${p.id}`)}
          />
        ))
      })
    } else this.setState({term: '', products: []})
  } */

  handleSubmit = e => {
    const products = e.currentTarget.value
    if (products.length === 1) {
      this.history.push(`products/${products[0].key}`)
    } else {
      this.history.push(`products/search/${this.state.term}`)
    }
  }

  render() {
    return (
      <Form
        onSubmit={
          //this.handleSubmit
          e => console.log(e.currentTarget)
          //this.props.history.push(`products/search/${e.currentTarget.value}`)
        }
      >
        <Form.Field>
          <input placeholder="search" name="search" />
        </Form.Field>
        <Button type="submit">
          <Icon name="search" />
        </Button>
      </Form>
    )
  }
  /* render() {
    return (
      <div>
        <Dropdown
          placeholder="search"
          search
          selection
          options={this.state.products}
          onSearchChange={this.handleChange}
        />
        <Button type="submit" onClick={this.handleClick}>
          Search
        </Button>
      </div>
    )
  } */
}

export default withRouter(SearchBar)
