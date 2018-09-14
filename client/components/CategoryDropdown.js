import React, {Component} from 'react'
import {Dropdown} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/category'
import {withRouter} from 'react-router-dom'

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
    this.props.history.push(`/products/category/${event.currentTarget.id}`)
  }

  render() {
    console.log('PROPS', this.props)
    return (
      <Dropdown text="Find by Category">
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
  fetchCategories: () => dispatch(fetchCategories())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryDropdown)
)
