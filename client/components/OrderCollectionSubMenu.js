import {Menu} from 'semantic-ui-react'
import React, {Component} from 'react'

class OrderCollectionSubMenu extends Component {
  state = {activeItem: 'all'}

  handleMenuItemClick = (e, {name}) => {
    this.setState({activeItem: name})
    this.props.getFilteredOrders(name)
  }

  render() {
    const {activeItem} = this.state
    return (
      <Menu pointing secondary>
        <Menu.Item
          name="all"
          active={activeItem === 'all'}
          onClick={this.handleMenuItemClick}
        />
        <Menu.Item
          name="confirmed"
          active={activeItem === 'confirmed'}
          onClick={this.handleMenuItemClick}
        />
        <Menu.Item
          name="complete"
          active={activeItem === 'complete'}
          onClick={this.handleMenuItemClick}
        />
        <Menu.Item
          name="cancelled"
          active={activeItem === 'cancelled'}
          onClick={this.handleMenuItemClick}
        />
        <Menu.Item
          name="pending"
          active={activeItem === 'pending'}
          onClick={this.handleMenuItemClick}
        />
      </Menu>
    )
  }
}

export default OrderCollectionSubMenu
