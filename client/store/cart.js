const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
//const ADD_TO_QUANTITY = 'ADD_TO_QUANTITY'

export const addToCartAction = item => ({type: ADD_TO_CART, item})
export const removeFromCartAction = itemId => ({type: REMOVE_FROM_CART, itemId})
//export const addToQuantityAction = itemId => ({type: ADD_TO_QUANTITY, itemId})

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

// [...state].filter(itemId => item.id !== 1)
