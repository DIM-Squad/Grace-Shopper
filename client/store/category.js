import axios from 'axios'

const GOT_CATEGORIES = 'GOT_CATEGORIES'
const CATEGORY_ERROR = 'CATEGORY_ERROR'

const gotCategories = categories => ({type: GOT_CATEGORIES, categories})
const categoryError = () => ({type: CATEGORY_ERROR})

export const fetchCategories = () => {
  return async dispatch => {
    try {
      const categoriesData = await axios.get('/api/categories')
      const categories = categoriesData.data
      dispatch(gotCategories(categories))
    } catch (err) {
      dispatch(categoryError())
    }
  }
}

const categories = (state = [], action) => {
  switch (action.type) {
    case CATEGORY_ERROR:
      return state
    case GOT_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
export default categories
