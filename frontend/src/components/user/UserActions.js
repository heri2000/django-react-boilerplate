import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_USERS, ADD_USER, UPDATE_USER } from "./UserTypes";

export const getUsers = () => dispatch => {
  axios
    .get("/api/v1/users/")
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
    .post("/api/v1/users/", user)
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

export const updateUser = (id, user) => dispatch => {
  axios
    .patch(`/api/v1/users/${id}/`, user)
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
