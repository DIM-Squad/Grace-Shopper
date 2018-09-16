import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_SELECTED_ORDER_FROM_SERVER = 'GOT_SELECTED_ORDER_FROM_SERVER'
const SELECTED_ORDER_ERROR = 'SELECTED_ORDER_ERROR'

/**
 * INITIAL STATE
 */
const initialState = {
  selectedOrder: {}
}

/**
 * ACTION CREATORS
 */
export const gotSelecetedOrderFromServer = selectedOrder => ({
  type: GOT_SELECTED_ORDER_FROM_SERVER,
  selectedOrder
})
export const selectedOrderError = () => ({type: SELECTED_ORDER_ERROR})

/**
 * THUNK CREATORS
 */
export const fetchSelectedOrder = (userId, orderId) => {
  return async dispatch => {
    try {
      let result
      if (userId) {
        result = await axios.get(`/api/users/${userId}/orders/${orderId}`)
      } else {
        result = await axios.get(`/api/users/orders/${orderId}`)
      }
      console.log('Got Order Data', result.data)
      dispatch(gotSelecetedOrderFromServer(result.data))
    } catch (err) {
      dispatch(selectedOrderError(err))
    }
  }
}

const selectedOrder = (state = initialState.selectedOrder, action) => {
  switch (action.type) {
    case SELECTED_ORDER_ERROR:
      return state
    case GOT_SELECTED_ORDER_FROM_SERVER:
      return action.selectedOrder
    default:
      return state
  }
}

export default selectedOrder
