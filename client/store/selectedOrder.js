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
export const fetchSelectedOrder = orderId => {
  return async dispatch => {
    try {
      let {data} = await axios.get(`/api/users/orders/${orderId}`)
      console.log('Got Order Data', data)
      dispatch(gotSelecetedOrderFromServer(data))
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
