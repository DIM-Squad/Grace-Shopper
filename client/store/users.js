import axios from 'axios'

const GOT_USERS = 'GOT_USERS'
const USERS_ERROR = 'USERS_ERROR'

const gotUsers = users => ({type: GOT_USERS, users})
const usersError = () => ({type: USERS_ERROR})

export const fetchUsers = (filterType, filterId) => {
  return async dispatch => {
    try {
      let result
      if (filterType) {
        result = await axios.get(`/api/users/${filterType}/${filterId}`)
      } else {
        result = await axios.get(`/api/users`)
      }
      dispatch(gotUsers(result.data))
    } catch (err) {
      dispatch(usersError())
    }
  }
}

const users = (state = [], action) => {
  switch (action.type) {
    case USERS_ERROR:
      return state
    case GOT_USERS:
      return action.users
    default:
      return state
  }
}

export default users
