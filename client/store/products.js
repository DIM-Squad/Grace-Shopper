import axios from 'axios'

const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_NEXT_PRODUCTS = 'GOT_NEXT_PRODUCTS'
const PRODUCTS_ERROR = 'PRODUCTS_ERROR'

const gotProducts = products => ({type: GOT_PRODUCTS, products})
const gotNextProducts = nextProducts => ({
  type: GOT_NEXT_PRODUCTS,
  nextProducts
})
const productsError = () => ({type: PRODUCTS_ERROR})

const PER_PAGE = 20

export const fetchProducts = startIndex => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(gotProducts(data.slice(startIndex, startIndex + PER_PAGE)))
      dispatch(
        gotNextProducts(
          data.slice(startIndex + PER_PAGE, startIndex + PER_PAGE * 2)
        )
      )
    } catch (err) {
      dispatch(productsError())
    }
  }
}

export const showNextProducts = () => {
  dispatch(gotProducts())
}

const products = (state = {products: [], nextProducts: []}, action) => {
  switch (action.type) {
    case PRODUCTS_ERROR:
      return state
    case GOT_PRODUCTS:
      return {...state, products: action.products}
    case GOT_NEXT_PRODUCTS:
      return {...state, nextProducts: action.nextProducts}
    default:
      return state
  }
}

export default products
