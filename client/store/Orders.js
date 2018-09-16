import axios from 'axios'

const GOT_ORDERS = 'GOT_ORDERS'
const ORDER_ERROR = 'ORDER_ERROR'

const gotOrders = orders => ({type: GOT_ORDERS, orders})
const orderError = () => ({type: ORDER_ERROR})

export const fetchOrders = () => {
  return async dispatch => {}
}
