import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import {
  GET_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_BUTTON_AND_DATA_VISIBILITY,
  SET_EDIT_USER,
  SET_SAVING_USER
} from "./UserTypes";

export const getUsers = (filter) => dispatch => {
  axios
    .get("/api/v1/userlist/?f=" + filter)
    .then(response => {
      dispatch({
        type: SET_BUTTON_AND_DATA_VISIBILITY,
        payload: "visible"
      });
      dispatch({
        type: GET_USERS,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const addUser = user => dispatch => {
  dispatch({
    type: SET_SAVING_USER,
    payload: true
  });
  axios
    .post("/api/v1/userlist/", user)
    .then(response => {
      dispatch({
        type: ADD_USER,
        payload: response.data
      });
      dispatch({
        type: SET_SAVING_USER,
        payload: false
      });
      dispatch({
        type: SET_EDIT_USER,
        payload: false
      });
    })
    .catch(error => {
      dispatch({
        type: SET_SAVING_USER,
        payload: false
      });
      toastOnError(error);
    });
};

export const deleteUser = id => dispatch => {
  axios
    .delete(`/api/v1/userlist/${id}/`)
    .then(response => {
      dispatch({
        type: DELETE_USER,
        payload: id
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const updateUser = (id, user) => dispatch => {
  axios
    .patch(`/api/v1/userlist/${id}/`, user)
    .then(response => {
      dispatch({
        type: UPDATE_USER,
        payload: response.data
      });
      dispatch({
        type: SET_EDIT_USER,
        payload: false
      });
    })
    .catch(error => {
      dispatch({
        type: SET_SAVING_USER,
        payload: false
      });
      toastOnError(error);
    });
};


export const setButtonAndDataVisibility = (visibility) => dispatch => {
  dispatch({
    type: SET_BUTTON_AND_DATA_VISIBILITY,
    payload: visibility
  });
};

export const setEditUser = (editUser) => dispatch => {
  dispatch({
    type: SET_EDIT_USER,
    payload: editUser
  });
}

export const setSavingUser = (isSavingUser) => dispatch => {
  dispatch({
    type: SET_SAVING_USER,
    payload: isSavingUser
  });
}