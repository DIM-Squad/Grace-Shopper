import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import {Button} from 'semantic-ui-react'

export default class TakeMoney extends React.Component {
  onToken = async token => {
    try {
      const res = await axios.post(`/api/orders`, {
        user: this.props.user,
        cart: this.props.cart,
        token: JSON.stringify(token)
      })
      console.log('We are in business =>', res)
    } catch (err) {
      console.error(err)
    }
  }

  onPostMessage = obj => {
    console.log('Shut the fuck up!!', obj)
  }

  render() {
    return (
      // ...
      <StripeCheckout
        name="The DIM Squad LLC" // the pop-in header title
        description="Grace shopper Rocks" // the pop-in header subtitle
        image="https://react.semantic-ui.com/images/avatar/large/matthew.png" // the pop-in header image (default none)
        ComponentClass="div"
        panelLabel="Pay" // prepended to the amount in the bottom pay button
        amount={10000} // cents
        currency="USD"
        stripeKey="pk_test_E0MMENnIPp3UuKcEwdSvVuZ4"
        locale="en"
        email={this.props.user.email}
        // Note: Enabling either address option will give the user the ability to
        // fill out both. Addresses are sent as a second parameter in the token callback.
        shippingAddress={true}
        billingAddress={true}
        // Note: enabling both zipCode checks and billing or shipping address will
        // cause zipCheck to be pulled from billing address (set to shipping if none provided).
        zipCode={true}
        // alipay // accept Alipay (default false)
        // bitcoin // accept Bitcoins (default false)
        allowRememberMe // "Remember Me" option (default true)
        token={this.onToken} // submit callback
        opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
        closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
        // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
        // you are using multiple stripe keys
        // reconfigureOnUpdate={false}
        // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
        // useful if you're using React-Tap-Event-Plugin
        // triggerEvent="onTouchTap"
      >
        <Button color="teal">Proceed to Checkout</Button>
      </StripeCheckout>
    )
  }
}
