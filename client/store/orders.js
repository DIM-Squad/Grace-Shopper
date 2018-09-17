import axios from 'axios'

const GOT_ORDERS = 'GOT_ORDERS'
const GOT_FILTERED_ORDERS = 'GOT_FILTERED_ORDERS'
const ORDER_ERROR = 'ORDER_ERROR'

const initialState = {
  orders: []
}

export const gotOrders = orders => ({type: GOT_ORDERS, orders})
export const gotFilteredOrders = orders => ({type: GOT_FILTERED_ORDERS, orders})
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
      dispatch(ordersError())
    }
  }
}

export const fetchFilteredOrders = (userId, filterKey) => {
  return async dispatch => {
    try {
      let result
      if (userId) {
        result = await axios.get(
          `/api/users/${userId}/orders/status/${filterKey}`
        )
      } else {
        result = await axios.get(`/api/users/orders/status/${filterKey}`)
      }
      dispatch(gotFilteredOrders(result.data))
    } catch (err) {
      dispatch(ordersError())
    }
  }
}

export const fetchOrdersByUserName = username => {
  return async dispatch => {
    try {
      const result = await axios.get(`/api/users/orders/search/${username}`)
      dispatch(gotOrders(result.data))
    } catch (err) {
      dispatch(ordersError())
    }
  }
}

const orders = (state = initialState.orders, action) => {
  switch (action.type) {
    case ORDER_ERROR:
      return state
    case GOT_FILTERED_ORDERS:
      return action.orders
    case GOT_ORDERS:
      return action.orders
    default:
      return state
  }
}

export default orders
