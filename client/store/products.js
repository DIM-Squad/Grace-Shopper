import axios from 'axios'

const GOT_PRODUCTS = 'GOT_PRODUCTS'
const PRODUCTS_ERROR = 'PRODUCTS_ERROR'
const ADDED_PRODUCT = 'ADDED_PRODUCT'

const gotProducts = products => ({type: GOT_PRODUCTS, products})
const productsError = () => ({type: PRODUCTS_ERROR})
const addedProduct = product => ({type: ADDED_PRODUCT, product})

export const fetchProducts = (filterType, filterId) => {
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

export const addProduct = product => {
  return async dispatch => {
    try {
      console.log(product)
      const result = await axios.post('/api/products', product)
      console.log(result.data)
      dispatch(addedProduct(result.data))
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
    case ADDED_PRODUCT:
      return state
    default:
      return state
  }
}

export default products
