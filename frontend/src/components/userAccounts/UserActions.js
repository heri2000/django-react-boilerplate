import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_USERS, ADD_USER, DELETE_USER, UPDATE_USER } from "./UserTypes";

export const getUsers = (filter) => dispatch => {
  axios
    .get("/api/v1/userlist/?f=" + filter)
    .then(response => {
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
  axios
    .post("/api/v1/userlist/", user)
    .then(response => {
      dispatch({
        type: ADD_USER,
        payload: response.data
      });
    })
    .catch(error => {
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
    })
    .catch(error => {
      toastOnError(error);
    });
};
