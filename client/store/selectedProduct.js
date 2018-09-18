import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_SELECTED_PRODUCT_FROM_SERVER = 'GOT_SELECTED_PRODUCT_FROM_SERVER'
const SELECTED_PRODUCT_ERROR = 'SELECTED_PRODUCT_ERROR'
const DELETED_PRODUCT = 'DELETED_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {
  selectedProduct: {}
}

/**
 * ACTION CREATORS
 */
const gotSelectedProductFromServer = selectedProduct => ({
  type: GOT_SELECTED_PRODUCT_FROM_SERVER,
  selectedProduct
})
const selectedProductError = () => ({type: SELECTED_PRODUCT_ERROR})
const deletedProduct = () => ({type: DELETED_PRODUCT})

/**
 * THUNK CREATORS
 */
export const fetchSelectedProduct = productId => {
  return async dispatch => {
    try {
      let {data} = await axios.get(`/api/products/${productId}`)
      dispatch(gotSelectedProductFromServer(data))
    } catch (err) {
      dispatch(selectedProductError(err))
    }
  }
}

export const deleteProduct = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(deletedProduct)
    } catch (err) {
      dispatch(selectedProductError())
    }
  }
}

export const postReview = (userId, productId, title, description, rating) => {
  return async dispatch => {
    try {
      await axios.post(`/api/reviews/${userId}`, {
        userId,
        productId,
        title,
        description,
        rating
      })
      dispatch(fetchSelectedProduct(productId))
    } catch (err) {
      dispatch(selectedProductError())
    }
  }
}

export const deleteReview = (reviewId, productId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`)
      dispatch(fetchSelectedProduct(productId))
    } catch (err) {
      dispatch(selectedProductError())
    }
  }
}

export const editProduct = product => {
  return async dispatch => {
    try {
      const result = await axios.put(`/api/products/${product.id}`, product)
      dispatch(gotSelectedProductFromServer(result.data))
    } catch (err) {
      dispatch(selectedProductError())
    }
  }
}

const selectedProduct = (state = initialState.selectedProduct, action) => {
  switch (action.type) {
    case SELECTED_PRODUCT_ERROR:
      return state
    case GOT_SELECTED_PRODUCT_FROM_SERVER:
      return action.selectedProduct
    case DELETED_PRODUCT:
      return {}
    default:
      return state
  }
}

export default selectedProduct
