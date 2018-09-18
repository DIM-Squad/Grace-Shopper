import React, {Component} from 'react'

import {Form, Icon} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {fetchProducts} from '../store/products'
import {fetchOrdersByUserName} from '../store/orders'
import {connect} from 'react-redux'

class SearchBar extends Component {
  state = {
    searchTerm: ''
  }

  handleSubmit = () => {
    // The stuff happening here is a delicate mess, thread carefully alright.
    let type = this.props.type
    if (type === 'products') {
      this.props.fetchProducts(this.state.searchTerm)
      this.props.history.push(`/${type}/search/${this.state.searchTerm}`)
    } else if (type === 'orders') {
      this.props.fetchOrdersByUserName(this.state.searchTerm)
    } else if (type === 'order') {
      type = `users/${type}s`
      this.props.history.push(`/${type}/search/${this.state.searchTerm}`)
    } else {
      this.props.history.push(`/${type}/search/${this.state.searchTerm}`)
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group style={styles.searchBar}>
          <Form.Field>
            <input
              label={this.props.label}
              placeholder={`search ${this.props.type}`}
              name="search"
              value={this.state.searchTerm}
              onChange={e => this.setState({searchTerm: e.currentTarget.value})}
            />
          </Form.Field>
          <Form.Button type="submit" disabled={!this.state.searchTerm}>
            <Icon name="search" />
          </Form.Button>
        </Form.Group>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProducts: term => dispatch(fetchProducts('search', term)),
  fetchOrdersByUserName: name => dispatch(fetchOrdersByUserName(name))
})

const styles = {
  searchBar: {
    marginLeft: 20,
    marginTop: 30
  }
}

export default withRouter(connect(null, mapDispatchToProps)(SearchBar))
