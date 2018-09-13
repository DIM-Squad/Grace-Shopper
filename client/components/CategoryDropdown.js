import React, {Component} from 'react'
import {Dropdown} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/category'
import Navlink from 'react-router-dom'

class CategoryDropdown extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <Dropdown text="Find by Category">
        <Dropdown.Menu>
          {this.props.categories.map(category => (
            <Dropdown.Item
              key={category.id}
              as={Navlink}
              to={`/products/category/${category.id}`}
              text={category.name}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

const mapStateToProps = state => ({categories: state.categories})
const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDropdown)
