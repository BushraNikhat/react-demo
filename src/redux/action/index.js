import axios from "axios"

export const fetchUser = () => {
  return async (dispatch) => {
    try {
      dispatch(LoadingUser())
      const resposne = await axios.get('https://stark-tor-97095.herokuapp.com/api/v1/users?page=1')
      dispatch(GetUser(resposne.data))
    } catch (error) {
      dispatch(ErrorFetchingUsers(error.message))
    }
  }
}

const GetUser = (users) => {
  return {
    type: "GET_USER",
    payload: users
  }
}
const LoadingUser = () => {
  return {
    type: "LOADING_USER"
  }
}
const ErrorFetchingUsers = (error) => {
  return {
    type: "ERROR_LOADING",
    payload: error
  }
}

// update user
export const updateUser = (userData) => {
  return async (dispatch) => {
    try {
      const resposne = await axios.patch(`https://stark-tor-97095.herokuapp.com/api/v1/users/${userData.id}`, { user: userData })
      dispatch(update(resposne.data))
    } catch (error) {
    }
  }
}

const update = (updatedUser) => {
  return {
    type: "UPDATE_USER",
    payload: updatedUser
  }
}


// Add new User
export const AddNewUSer = (userData) => {
  return async (dispatch) => {
    try {
      const resposne = await axios.post(`https://stark-tor-97095.herokuapp.com/api/v1/users`, { user: userData })
      dispatch({
        type: "ADD_NEW_USER",
        Payload: resposne
      })
    } catch (error) {
    }
  }
}