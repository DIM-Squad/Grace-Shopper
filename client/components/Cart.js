import React, {Component} from 'react'
import {List, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Cart extends Component {
  render() {
    //console.log('PROPS', this.props)
    return (
      <List divided verticalAlign="middle">
        {this.props.cart.map(item => (
          <List.Item key={item.id}>
            <List.Content floated="right">
              <Button>Remove</Button>
            </List.Content>
            <List.Content>
              {item.name} {item.price}
            </List.Content>
            <Button>+</Button>
          </List.Item>
        ))}
      </List>
    )
  }
}
const mapStateToProps = state => ({
  cart: state.cart
})

export default withRouter(connect(mapStateToProps)(Cart))
