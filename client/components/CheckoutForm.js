import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {confirmOrder} from '../store/cart'
import {withRouter} from 'react-router-dom'

class CheckoutForm extends Component {
  state = {
    email: this.props.user.email,
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: ''
  }

  handleChange = e => {
    const target = e.currentTarget
    this.setState({[target.name]: target.value})
  }

  placeOrder = () => {
    this.props.confirmOrder(this.props.user.id, this.props.cart, {
      ...this.state,
      shippingCost: this.props.shipping,
      totalCost: this.props.total
    })
    this.props.history.push('/products')
  }

  render() {
    return (
      <Form onSubmit={this.placeOrder}>
        <Form.Group>
          <Form.Field
            label="Email"
            control="input"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            label="Street address"
            control="input"
            placeholder="123 Lane Avenue"
            name="shippingAddress"
            value={this.state.shippingAddress}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            label="City"
            control="input"
            placeholder="Anytown"
            name="shippingCity"
            value={this.state.shippingCity}
            onChange={this.handleChange}
          />
          <Form.Field
            label="State"
            control="input"
            placeholder="AL"
            name="shippingState"
            value={this.state.shippingState}
            onChange={this.handleChange}
          />
          <Form.Field
            label="ZIP"
            control="input"
            placeholder="90210"
            name="shippingZip"
            value={this.state.shippingZip}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Button
          primary
          disabled={
            !this.props.cart[0] ||
            !this.state.email ||
            !this.state.shippingAddress ||
            !this.state.shippingCity ||
            !this.state.shippingState ||
            !this.state.shippingZip
          }
        >
          Place order
        </Form.Button>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart
})

const mapDispatchToProps = {confirmOrder}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
)
