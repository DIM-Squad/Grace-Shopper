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

  handleSubmit = () => {
    this.props.fetchProducts(this.state.searchTerm)
    this.props.history.push(`/products/search/${this.state.searchTerm}`)
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
        <Button type="submit" disabled={!this.state.searchTerm}>
          <Icon name="search" />
        </Button>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProducts: term => dispatch(fetchProducts('search', term))
})

export default withRouter(connect(null, mapDispatchToProps)(SearchBar))
