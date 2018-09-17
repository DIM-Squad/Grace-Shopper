import axios from 'axios'

const GOT_ORDERS = 'GOT_ORDERS'
const GOT_FILTERED_ORDERS = 'GOT_FILTERED_ORDERS'
const ORDER_ERROR = 'ORDER_ERROR'

const initialState = {
  orders: []
}

export const gotOrders = orders => ({type: GOT_ORDERS, orders})

export const gotFilteredOrders = filterKey => ({
  type: GOT_FILTERED_ORDERS,
  filterKey
})

export const ordersError = () => ({type: ORDER_ERROR})

export const fetchOrders = userId => {
  return async dispatch => {
    try {
      let result
      if (userId) {
        result = await axios.get(`/api/users/${userId}/orders`)
      } else {
        result = await axios.get(`/api/users/orders`)
      }
      dispatch(gotOrders(result.data))
    } catch (err) {
      dispatch(ordersError)
    }
  }
}

const orders = (state = initialState.orders, action) => {
  switch (action.type) {
    case ORDER_ERROR:
      return state
    case GOT_ORDERS:
      return action.orders
    case GOT_FILTERED_ORDERS:
      return [...state].filter(order => order.status === action.filterKey)
    default:
      return state
  }
}

export default orders
