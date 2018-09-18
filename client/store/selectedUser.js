import axios from 'axios'

const GET_SELECTED_USER = 'GET_SELECTED_USER'
const GET_SELECTED_USER_ERROR = 'GET_SELECTED_USER_ERROR'

const getSelectedUser = user => ({type: GET_SELECTED_USER, user})
const getSelectedUserError = () => ({type: GET_SELECTED_USER_ERROR})

export const fetchSelectedUser = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`)
    dispatch(getSelectedUser(data))
  } catch (err) {
    dispatch(getSelectedUserError())
  }
}

const selectedUser = (state = {}, action) => {
  switch (action.type) {
    case GET_SELECTED_USER_ERROR:
      return state
    case GET_SELECTED_USER:
      return action.user
    default:
      return state
  }
}

export default selectedUser
