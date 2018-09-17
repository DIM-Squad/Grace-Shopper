const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const EMPTY_CART_ON_CHECKOUT = 'EMPTY_CART_ON_CHECKOUT'

export const addToCartAction = item => ({type: ADD_TO_CART, item})
export const removeFromCartAction = itemId => ({type: REMOVE_FROM_CART, itemId})
export const updateQuantityAction = item => ({ type: UPDATE_QUANTITY, item })
export const emptyCartOnCheckout = () => ({type: EMPTY_CART_ON_CHECKOUT})

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
    default:
      return state
  }
}

export default cart

// [...state].filter(itemId => item.id !== 1)
