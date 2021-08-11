import {
  GET_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_BUTTON_AND_DATA_VISIBILITY,
  SET_EDIT_USER,
  SET_SAVING_USER
} from "./UserTypes";

const initialState = {
  buttonAndDataVisibility: "hidden",
  editUser: false,
  isSavingUser: false,
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
    case SET_BUTTON_AND_DATA_VISIBILITY:
      return {
        ...state,
        buttonAndDataVisibility: action.payload
      };
    case SET_EDIT_USER:
      return {
        ...state,
        editUser: action.payload
      }
    case SET_SAVING_USER:
      return {
        ...state,
        isSavingUser: action.payload
      }
    default:
      return state;
  }
};