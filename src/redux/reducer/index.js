const initialState = []

export const UserReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case "GET_USER":
      return [...payload]
    case "LOADING_USER":
      return "loading"
    case "ERROR_LOADING":
      return payload
    default: return ""
  }
}
const initailUpdateValue = {}

export const UpdateReducer = (state = initailUpdateValue, action) => {
  const { type, payload } = action
  switch (type) {
    case "UPDATE_USER":
      return payload

    default: return {}
  }
}

const userData = {}
export const AddUserReducer = (state = userData, action) => {
  const { type, payload } = action
  switch (type) {
    case "ADD_NEW_USER":
      return payload
    default: return {}
  }

}