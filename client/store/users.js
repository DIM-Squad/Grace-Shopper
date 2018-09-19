import axios from 'axios'

const GOT_USERS = 'GOT_USERS'
const USERS_ERROR = 'USERS_ERROR'

const gotUsers = usersObject => ({type: GOT_USERS, usersObject})
const usersError = () => ({type: USERS_ERROR})

export const fetchUsers = (offset, limit, filterType, filterId) => {
  return async dispatch => {
    try {
      let result
      if (filterType) {
        result = await axios.get(
          `/api/users/offset/${offset}/limit/${limit}/${filterType}/${filterId}`
        )
      } else {
        result = await axios.get(`/api/users/offset/${offset}/limit/${limit}`)
      }

      dispatch(gotUsers(result.data))
    } catch (err) {
      dispatch(usersError())
    }
  }
}

const users = (state = {users: [], numOfUsers: 0}, action) => {
  switch (action.type) {
    case USERS_ERROR:
      return state
    case GOT_USERS:
      return {
        users: action.usersObject.users,
        numOfUsers: action.usersObject.numOfUsers
      }
    default:
      return state
  }
}

export default users
