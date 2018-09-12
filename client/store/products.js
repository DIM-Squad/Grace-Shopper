import axios from 'axios'

const GOT_PRODUCTS = 'GOT_PRODUCTS'
const PRODUCTS_ERROR = 'PRODUCTS_ERROR'

const gotProducts = products => ({type: GOT_PRODUCTS, products})
const productsError = () => ({type: PRODUCTS_ERROR})

const PER_PAGE = 20

export const fetchProducts = (startIndex, filter) => {
  return async dispatch => {
    try {
      let {data} = await axios.get('/api/products')
      if (filter) {
        data = data.filter(
          p => p.categories.findIndex(c => c.id === filter) !== -1
        )
      }
      dispatch(gotProducts(data.slice(startIndex, startIndex + PER_PAGE)))
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
