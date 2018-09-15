import axios from 'axios'

const GOT_PRODUCTS = 'GOT_PRODUCTS'
const PRODUCTS_ERROR = 'PRODUCTS_ERROR'

const gotProducts = products => ({type: GOT_PRODUCTS, products})
const productsError = () => ({type: PRODUCTS_ERROR})

export const fetchProducts = (filterType, filterId) => {
  console.log(filterType, filterId)
  return async dispatch => {
    try {
      let result
      if (filterType) {
        result = await axios.get(`/api/products/${filterType}/${filterId}`)
      } else {
        result = await axios.get(`/api/products`)
      }
      dispatch(gotProducts(result.data))
    } catch (err) {
      dispatch(productsError())
    }
  }
}

const products = (state = [], action) => {
  switch (action.type) {
    case PRODUCTS_ERROR:
      return state
    case GOT_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default products
