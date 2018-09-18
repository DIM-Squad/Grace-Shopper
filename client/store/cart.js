/* eslint-disable complexity */
import axios from 'axios'

const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const EMPTY_CART_ON_CHECKOUT = 'EMPTY_CART_ON_CHECKOUT'
const SAVE_CART = 'SAVE_CART'
const MERGE_CARTS = 'MERGE_CARTS'

export const setCart = cart => ({type: SET_CART, cart})
export const mergeCarts = cart => ({type: MERGE_CARTS, cart})
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

let newCart

const cart = (state = [], action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart || []
    case MERGE_CARTS:
      //if items have been added to care while logged out, they are merged with user's cart on login
      //if duplicate item has been added to cart while logged out, the new number in cart overwrites the old number
      newCart = state
      action.cart.forEach(item => {
        if (newCart.find(i => i.id === item.id))
          newCart.find(i => i.id === item.id).quantity = item.quantity
        else newCart.push(item)
      })
      return newCart
    case ADD_TO_CART:
      newCart = state
      if (newCart.find(i => i.id === action.item.id))
        newCart.find(i => i.id === action.item.id).quantity++
      else newCart.push(action.item)
      return newCart
    case REMOVE_FROM_CART:
      return [...state].filter(item => item.id !== action.itemId)
    case UPDATE_QUANTITY:
      return [...state.filter(item => item.id !== action.item.id), action.item]
    case EMPTY_CART_ON_CHECKOUT:
      return []
    case SAVE_CART:
      return []
    default:
      return state
  }
}

export default cart
