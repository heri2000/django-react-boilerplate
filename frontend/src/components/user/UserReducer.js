import { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from "./UserTypes";

const initialState = {
  users: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((item, index) => item.id !== action.payload)
      };
    case UPDATE_USER:
      const updatedUsers = state.users.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      return {
        ...state,
        users: updatedUsers
      };
    default:
      return state;
  }
};