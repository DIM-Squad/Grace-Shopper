import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_SELECTED_PRODUCT_FROM_SERVER = 'GOT_SELECTED_PRODUCT_FROM_SERVER'
const SELECTED_PRODUCT_ERROR = 'SELECTED_PRODUCT_ERROR'

/**
 * INITIAL STATE
 */
const initialState = {
  selectedProduct: {}
}

/**
 * ACTION CREATORS
 */
export const gotSelecetedProductFromServer = selectedProduct => ({
  type: GOT_SELECTED_PRODUCT_FROM_SERVER,
  selectedProduct
})
export const selectedProductError = () => ({type: SELECTED_PRODUCT_ERROR})

/**
 * THUNK CREATORS
 */
export const fetchSelectedProduct = productId => {
  return async dispatch => {
    try {
      let {data} = await axios.get(`/api/products/${productId}`)
      console.log('Got Product Data', data)
      dispatch(gotSelecetedProductFromServer(data))
    } catch (err) {
      dispatch(selectedProductError(err))
    }
  }
}

const selectedProduct = (state = initialState.selectedProduct, action) => {
  switch (action.type) {
    case SELECTED_PRODUCT_ERROR:
      return state
    case GOT_SELECTED_PRODUCT_FROM_SERVER:
      return action.selectedProduct
    default:
      return state
  }
}

export default selectedProduct
