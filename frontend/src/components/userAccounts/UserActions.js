import axios from "axios";
import { toastOnError } from "../../utils/Utils";
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

export const getUsers = (filter) => dispatch => {
  axios
    .get("/api/v1/userlist/", {params: {f: filter}})
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
        type: SET_EDIT_NEW_USER,
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
    .delete(`/api/v1/users/${id}/`)
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
  dispatch({
    type: SET_SAVING_USER,
    payload: true
  });
  axios
    .patch(`/api/v1/userlist/${id}/`, user)
    .then(response => {
      dispatch({
        type: UPDATE_USER,
        payload: response.data
      });
      dispatch({
        type: SET_SAVING_USER,
        payload: false
      });
      dispatch({
        type: SET_EDIT_EXISTING_USER,
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


export const updateUserBulk = (data) => dispatch => {
  dispatch({
    type: SET_SAVING_USER,
    payload: true
  });
  axios
    .put(`/api/v1/userbulkedit/`, data)
    .then(response => {
      dispatch({
        type: UPDATE_USER_BULK,
        payload: response.data
      });
      dispatch({
        type: SET_SAVING_USER,
        payload: false
      });
      dispatch({
        type: SET_EDIT_USER_BULK,
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
}


export const setButtonAndDataVisibility = (visibility) => dispatch => {
  dispatch({
    type: SET_BUTTON_AND_DATA_VISIBILITY,
    payload: visibility
  });
};

export const setEditNewUser = (editNewUser) => dispatch => {
  dispatch({
    type: SET_EDIT_NEW_USER,
    payload: editNewUser
  });
}

export const setEditExistingUser = (editExistingUser) => dispatch => {
  dispatch({
    type: SET_EDIT_EXISTING_USER,
    payload: editExistingUser
  });
}

export const setBulkEditUser = (bulkEditUser) => dispatch => {
  dispatch({
    type: SET_EDIT_USER_BULK,
    payload: bulkEditUser
  });
}

export const setSavingUser = (isSavingUser) => dispatch => {
  dispatch({
    type: SET_SAVING_USER,
    payload: isSavingUser
  });
}