import React, {Component} from 'react'
//import {Dropdown, Button} from 'semantic-ui-react'
import {Form, Button, Icon} from 'semantic-ui-react'
//import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {fetchProducts} from '../store/products'
import {connect} from 'react-redux'

//TODO: the commented code here is for dynamic search, which I wasn't able to get working

class SearchBar extends Component {
  state = {
    searchTerm: ''
  }

  /*
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

  handleSubmit = () => {
    this.props.history.push(`products/search/${this.state.searchTerm}`)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <input
            placeholder="search"
            name="search"
            value={this.state.searchTerm}
            onChange={e => this.setState({searchTerm: e.currentTarget.value})}
          />
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

const mapDispatchToProps = dispatch => ({
  fetchProducts: term => dispatch(fetchProducts('search', term))
})

export default withRouter(connect(null, mapDispatchToProps)(SearchBar))
