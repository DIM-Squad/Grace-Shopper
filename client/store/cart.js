import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const EMPTY_CART_ON_CHECKOUT = 'EMPTY_CART_ON_CHECKOUT'
const GOT_CART_FROM_SERVER = 'GOT_CART_FROM_SERVER'
const SAVE_CART = 'SAVE_CART'

export const addToCartAction = item => ({type: ADD_TO_CART, item})
export const removeFromCartAction = itemId => ({type: REMOVE_FROM_CART, itemId})
export const updateQuantityAction = item => ({type: UPDATE_QUANTITY, item})
export const emptyCartOnCheckout = () => ({type: EMPTY_CART_ON_CHECKOUT})
export const gotCartFromServer = cart => {
  //console.log('gotCartFromServer')
  return {
    type: GOT_CART_FROM_SERVER,
    cart
  }
}
export const saveCartAction = cart => ({type: SAVE_CART, cart})

export const fetchCart = userId => {
  //console.log('fetchCart', userId)
  return async dispatch => {
    const res = await axios.get(`/api/cart/${userId}`)
    const cart = res.data
    dispatch(gotCartFromServer(cart))
  }
}

export const postCart = cartItems => {
  return async dispatch => {
    const posted = await axios.post('/api/cart', cartItems)
    const cart = posted.data
    dispatch(saveCartAction(cart))
  }
}

const cart = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.item]
    case REMOVE_FROM_CART:
      return [...state].filter(item => item.id !== action.itemId)
    case UPDATE_QUANTITY:
      // const newStateArr = [...state].filter(item => item.id !== action.item.id)
      return [
        ...[...state].filter(item => item.id !== action.item.id),
        action.item
      ]
    case EMPTY_CART_ON_CHECKOUT:
      return state
    case GOT_CART_FROM_SERVER:
      return action.cart.cart
    case SAVE_CART:
      return state
    default:
      return state
  }
}

export default cart

// [...state].filter(itemId => item.id !== 1)
