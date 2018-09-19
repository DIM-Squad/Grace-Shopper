/* eslint-disable complexity */
import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const EMPTY_CART = 'EMPTY_CART'
const SAVE_CART = 'SAVE_CART'
const MERGE_CARTS = 'MERGE_CARTS'

export const mergeCarts = cart => ({type: MERGE_CARTS, cart})
export const addToCartAction = item => ({type: ADD_TO_CART, item})
export const removeFromCartAction = itemId => ({type: REMOVE_FROM_CART, itemId})
export const updateQuantityAction = item => ({type: UPDATE_QUANTITY, item})
export const emptyCart = () => ({type: EMPTY_CART})

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
    case MERGE_CARTS:
      //if items have been added to care while logged out, they are merged with user's cart on login
      //if duplicate item has been added to cart while logged out, the new number in cart overwrites the old number
      const newCart1 = [...state]
      action.cart.forEach(item => {
        if (!newCart1.find(i => i.id === item.id)) newCart1.push(item)
      })
      return newCart1
    case ADD_TO_CART:
      const newCart2 = [...state]
      if (newCart2.find(i => i.id === action.item.id))
        newCart2.find(i => i.id === action.item.id).quantity++
      else newCart2.push(action.item)
      return newCart2
    case REMOVE_FROM_CART:
      return state.filter(item => item.id !== action.itemId)
    case UPDATE_QUANTITY:
      const newCart3 = [...state]
      newCart3.find(i => i.id === action.item.id).quantity =
        action.item.quantity
      return newCart3
    case EMPTY_CART:
      return []
    case SAVE_CART:
      return []
    default:
      return state
  }
}

export default cart
