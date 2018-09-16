const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const addToCartAction = item => ({type: ADD_TO_CART, item})
export const removeFromCart = itemId => ({type: REMOVE_FROM_CART, itemId})

const cart = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.item]
    case REMOVE_FROM_CART:
      return [...state].filter(item => item.id !== action.itemId)
    default:
      return state
  }
}

export default cart
