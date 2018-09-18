import axios from 'axios'

const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const EMPTY_CART_ON_CHECKOUT = 'EMPTY_CART_ON_CHECKOUT'
const SAVE_CART = 'SAVE_CART'

export const setCart = cart => ({type: SET_CART, cart})
export const addToCartAction = item => ({type: ADD_TO_CART, item})
export const removeFromCartAction = itemId => ({type: REMOVE_FROM_CART, itemId})
export const updateQuantityAction = item => ({type: UPDATE_QUANTITY, item})
export const emptyCartOnCheckout = () => ({type: EMPTY_CART_ON_CHECKOUT})

export const saveCartAction = cart => ({type: SAVE_CART, cart})

export const postCart = (cartItems, userId) => {
  return async dispatch => {
    const posted = await axios.post(`/api/cart/${userId}`, cartItems)
    const cart = posted.data
    dispatch(saveCartAction(cart))
  }
}

const cart = (state = [], action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart || []
    case ADD_TO_CART:
      return [...state, action.item]
    case REMOVE_FROM_CART:
      return [...state].filter(item => item.id !== action.itemId)
    case UPDATE_QUANTITY:
      return [
        ...[...state].filter(item => item.id !== action.item.id),
        action.item
      ]
    case EMPTY_CART_ON_CHECKOUT:
      return []
    case SAVE_CART:
      return []
    default:
      return state
  }
}

export default cart
