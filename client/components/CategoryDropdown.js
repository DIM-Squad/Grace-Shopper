import React, {Component} from 'react'
import {Dropdown} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/category'
import {withRouter} from 'react-router-dom'
import {fetchProducts} from '../store/products'

class CategoryDropdown extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    //console.log('did mount ')
    this.props.fetchCategories()
  }

  handleClick(event) {
    //console.dir(event.currentTarget.id)
    const id = event.currentTarget.id
    this.props.fetchProducts(id)
    this.props.history.push(`/products/category/${id}`)
  }

  render() {
    //console.log('PROPS', this.props)
    return (
      <Dropdown text="Find by Category" style={styles.category}>
        <Dropdown.Menu>
          {this.props.categories.map(category => (
            <Dropdown.Item
              onClick={this.handleClick}
              key={category.id}
              id={category.id}
              //to={`/products/category/${category.id}`}
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
  fetchCategories: () => dispatch(fetchCategories()),
  fetchProducts: id => dispatch(fetchProducts('category', id))
})

const styles = {
  category: {
    marginLeft: 20,
    marginTop: 10
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryDropdown)
)
