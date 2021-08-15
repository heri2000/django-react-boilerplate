import {
  GET_USERS,
  ADD_USER,
  UPDATE_USER,
  UPDATE_USER_BULK,
  DELETE_USER,
  SET_BUTTON_AND_DATA_VISIBILITY,
  SET_EDIT_NEW_USER,
  SET_EDIT_EXISTING_USER,
  SET_EDIT_USER_BULK,
  SET_SAVING_USER
} from "./UserTypes";

const initialState = {
  buttonAndDataVisibility: "hidden",
  editNewUser: false,
  editExistingUser: false,
  bulkEditUser: false,
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
      const updatedUsers1 = state.users.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      return {
        ...state,
        users: updatedUsers1
      };
    case UPDATE_USER_BULK:
      const updatedUsers2 = state.users.map(item => {
        action.payload.forEach((newItem) => {
          if (item.id === newItem.id) {
            item = { ...item, ...newItem };
          }
        });
        return item;
      });
      return {
        ...state,
        users: updatedUsers2
      };
    case SET_BUTTON_AND_DATA_VISIBILITY:
      return {
        ...state,
        buttonAndDataVisibility: action.payload
      };
    case SET_EDIT_NEW_USER:
      return {
        ...state,
        editNewUser: action.payload
      }
    case SET_EDIT_EXISTING_USER:
      return {
        ...state,
        editExistingUser: action.payload
      }
    case SET_EDIT_USER_BULK:
      return {
        ...state,
        bulkEditUser: action.payload
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